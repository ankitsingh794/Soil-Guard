const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Order = require('../models/Order');
const notificationService = require('../services/notificationService');

// @route   POST /api/orders
// @desc    Create a new order
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const {
      items,
      shippingAddress,
      paymentMethod,
      customerNotes
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Order must contain at least one item'
      });
    }

    // Calculate pricing
    const subtotal = items.reduce((sum, item) => {
      item.totalPrice = item.quantity * item.unitPrice;
      return sum + item.totalPrice;
    }, 0);

    // Simple shipping calculation (free shipping over ₹999)
    const shippingCost = subtotal >= 999 ? 0 : 50;
    
    // Tax calculation (18% GST for India)
    const tax = Math.round(subtotal * 0.18);
    
    const total = subtotal + shippingCost + tax;

    // Create order
    const order = await Order.create({
      userId: req.user._id,
      items,
      subtotal,
      shippingCost,
      tax,
      total,
      shippingAddress,
      paymentMethod,
      customerNotes,
      orderStatus: 'placed',
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'pending'
    });

    // Add to status history
    order.statusHistory.push({
      status: 'placed',
      timestamp: new Date(),
      notes: 'Order placed successfully'
    });
    order.placedAt = new Date();
    await order.save();

    // Send notification
    try {
      await notificationService.sendNotification(
        req.user,
        'orderPlaced',
        order.orderNumber,
        total
      );
      order.notifications.orderPlaced = true;
      await order.save();
    } catch (notifError) {
      console.error('Order notification error:', notifError);
    }

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order: {
        id: order._id,
        orderNumber: order.orderNumber,
        total: order.total,
        status: order.orderStatus,
        estimatedDeliveryDate: order.estimatedDeliveryDate
      }
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating order'
    });
  }
});

// @route   GET /api/orders
// @desc    Get all orders for logged-in user
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching orders'
    });
  }
});

// @route   GET /api/orders/:id
// @desc    Get a specific order by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching order'
    });
  }
});

// @route   PUT /api/orders/:id/status
// @desc    Update order status (Admin/System)
// @access  Private
router.put('/:id/status', protect, async (req, res) => {
  try {
    const { status, location, notes, trackingNumber, estimatedDeliveryDate } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Update order status
    await order.updateStatus(status, location, notes, req.user.role === 'admin' ? 'admin' : 'system');

    // Update tracking info if provided
    if (trackingNumber) order.trackingNumber = trackingNumber;
    if (estimatedDeliveryDate) order.estimatedDeliveryDate = estimatedDeliveryDate;
    await order.save();

    // Send notifications based on status
    const user = await require('../models/User').findById(order.userId);
    
    try {
      let notificationSent = false;
      
      if (status === 'confirmed' && !order.notifications.orderConfirmed) {
        const deliveryDate = estimatedDeliveryDate ? new Date(estimatedDeliveryDate).toLocaleDateString() : '3-5 days';
        await notificationService.sendNotification(user, 'orderConfirmed', order.orderNumber, deliveryDate);
        order.notifications.orderConfirmed = true;
        notificationSent = true;
      } else if (status === 'shipped' && !order.notifications.orderShipped) {
        await notificationService.sendNotification(user, 'orderShipped', order.orderNumber, trackingNumber || 'Tracking ID will be updated soon');
        order.notifications.orderShipped = true;
        notificationSent = true;
      } else if (status === 'out_for_delivery' && !order.notifications.outForDelivery) {
        await notificationService.sendNotification(user, 'outForDelivery', order.orderNumber);
        order.notifications.outForDelivery = true;
        notificationSent = true;
      } else if (status === 'delivered' && !order.notifications.delivered) {
        await notificationService.sendNotification(user, 'delivered', order.orderNumber);
        order.notifications.delivered = true;
        notificationSent = true;
      }

      if (notificationSent) {
        await order.save();
      }
    } catch (notifError) {
      console.error('Status notification error:', notifError);
    }

    res.json({
      success: true,
      message: 'Order status updated successfully',
      order
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating order status'
    });
  }
});

// @route   PUT /api/orders/:id/payment
// @desc    Update payment status
// @access  Private
router.put('/:id/payment', protect, async (req, res) => {
  try {
    const { paymentStatus, transactionId, paymentGateway } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    order.paymentStatus = paymentStatus;
    order.paymentDetails.transactionId = transactionId;
    order.paymentDetails.paymentGateway = paymentGateway;
    
    if (paymentStatus === 'completed') {
      order.paymentDetails.paidAt = new Date();
    }

    await order.save();

    res.json({
      success: true,
      message: 'Payment status updated successfully',
      order
    });
  } catch (error) {
    console.error('Error updating payment:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating payment status'
    });
  }
});

// @route   POST /api/orders/:id/cancel
// @desc    Cancel an order
// @access  Private
router.post('/:id/cancel', protect, async (req, res) => {
  try {
    const { reason } = req.body;

    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if order can be cancelled
    if (['shipped', 'out_for_delivery', 'delivered'].includes(order.orderStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Order cannot be cancelled at this stage'
      });
    }

    order.cancellationReason = reason;
    await order.updateStatus('cancelled', '', `Cancelled by customer: ${reason}`);

    res.json({
      success: true,
      message: 'Order cancelled successfully',
      order
    });
  } catch (error) {
    console.error('Error cancelling order:', error);
    res.status(500).json({
      success: false,
      message: 'Error cancelling order'
    });
  }
});

module.exports = router;
