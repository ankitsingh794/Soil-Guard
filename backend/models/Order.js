const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  // User information
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  
  // Order identification
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  
  // Order items
  items: [{
    productId: String,
    productName: String,
    productImage: String,
    category: String,
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    unitPrice: {
      type: Number,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    },
    recommendedBySoilReport: {
      type: Boolean,
      default: false
    },
    soilReportId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SoilReport'
    }
  }],
  
  // Pricing
  subtotal: {
    type: Number,
    required: true
  },
  shippingCost: {
    type: Number,
    default: 0
  },
  tax: {
    type: Number,
    default: 0
  },
  discount: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    required: true
  },
  
  // Shipping information
  shippingAddress: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: String,
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, default: 'India' },
    landmark: String
  },
  
  // Payment information
  paymentMethod: {
    type: String,
    enum: ['cod', 'online', 'upi', 'card', 'netbanking'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentDetails: {
    transactionId: String,
    paymentGateway: String,
    paidAt: Date,
    refundedAt: Date,
    refundAmount: Number
  },
  
  // Order status
  orderStatus: {
    type: String,
    enum: ['placed', 'confirmed', 'processing', 'packed', 'shipped', 'out_for_delivery', 'delivered', 'cancelled', 'returned'],
    default: 'placed'
  },
  statusHistory: [{
    status: String,
    timestamp: { type: Date, default: Date.now },
    location: String,
    notes: String,
    updatedBy: String
  }],
  
  // Delivery information
  deliveryPartner: String,
  trackingNumber: String,
  estimatedDeliveryDate: Date,
  actualDeliveryDate: Date,
  deliveryNotes: String,
  
  // Notification tracking
  notifications: {
    orderPlaced: { type: Boolean, default: false },
    orderConfirmed: { type: Boolean, default: false },
    orderShipped: { type: Boolean, default: false },
    outForDelivery: { type: Boolean, default: false },
    delivered: { type: Boolean, default: false }
  },
  
  // Additional information
  customerNotes: String,
  internalNotes: String,
  cancellationReason: String,
  returnReason: String,
  
  // Timestamps
  placedAt: {
    type: Date,
    default: Date.now
  },
  confirmedAt: Date,
  shippedAt: Date,
  deliveredAt: Date,
  cancelledAt: Date,
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Generate unique order number
orderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `ORD${Date.now()}${(count + 1).toString().padStart(4, '0')}`;
  }
  this.updatedAt = Date.now();
  next();
});

// Update order status with history
orderSchema.methods.updateStatus = function(newStatus, location = '', notes = '', updatedBy = 'system') {
  this.orderStatus = newStatus;
  this.statusHistory.push({
    status: newStatus,
    timestamp: new Date(),
    location,
    notes,
    updatedBy
  });
  
  // Update specific timestamp fields
  const now = new Date();
  switch(newStatus) {
    case 'confirmed':
      this.confirmedAt = now;
      break;
    case 'shipped':
      this.shippedAt = now;
      break;
    case 'delivered':
      this.deliveredAt = now;
      this.actualDeliveryDate = now;
      break;
    case 'cancelled':
      this.cancelledAt = now;
      break;
  }
  
  return this.save();
};

// Calculate total
orderSchema.methods.calculateTotal = function() {
  this.subtotal = this.items.reduce((sum, item) => sum + item.totalPrice, 0);
  this.total = this.subtotal + this.shippingCost + this.tax - this.discount;
  return this.total;
};

module.exports = mongoose.model('Order', orderSchema);
