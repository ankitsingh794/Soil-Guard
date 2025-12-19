const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const SoilTest = require('../models/SoilTest');
const SoilReport = require('../models/SoilReport');
const notificationService = require('../services/notificationService');

// @route   POST /api/soil-tests
// @desc    Submit a new soil test request
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const {
      packageType,
      packageName,
      price,
      sampleDetails
    } = req.body;

    // Create soil test
    const soilTest = await SoilTest.create({
      userId: req.user._id,
      packageType,
      packageName,
      price,
      sampleDetails,
      status: 'submitted'
    });

    // Add to status history
    soilTest.statusHistory.push({
      status: 'submitted',
      timestamp: new Date(),
      notes: 'Soil test request submitted successfully'
    });
    await soilTest.save();

    // Send notification
    try {
      await notificationService.sendNotification(
        req.user,
        'testSubmitted',
        soilTest.testId,
        req.user.name
      );
      soilTest.notifications.sampleCollectionSent = false; // Will be sent when sample is collected
      await soilTest.save();
    } catch (notifError) {
      console.error('Notification error:', notifError);
    }

    res.status(201).json({
      success: true,
      message: 'Soil test submitted successfully',
      soilTest: {
        id: soilTest._id,
        testId: soilTest.testId,
        packageType: soilTest.packageType,
        status: soilTest.status,
        createdAt: soilTest.createdAt
      }
    });
  } catch (error) {
    console.error('Soil test submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting soil test'
    });
  }
});

// @route   GET /api/soil-tests
// @desc    Get all soil tests for logged-in user
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const soilTests = await SoilTest.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .populate('reportId');

    res.json({
      success: true,
      count: soilTests.length,
      soilTests
    });
  } catch (error) {
    console.error('Error fetching soil tests:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching soil tests'
    });
  }
});

// @route   GET /api/soil-tests/:id
// @desc    Get a specific soil test by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const soilTest = await SoilTest.findOne({
      _id: req.params.id,
      userId: req.user._id
    }).populate('reportId');

    if (!soilTest) {
      return res.status(404).json({
        success: false,
        message: 'Soil test not found'
      });
    }

    res.json({
      success: true,
      soilTest
    });
  } catch (error) {
    console.error('Error fetching soil test:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching soil test'
    });
  }
});

// @route   PUT /api/soil-tests/:id/status
// @desc    Update soil test status (Admin only - for demo, any logged-in user can update)
// @access  Private
router.put('/:id/status', protect, async (req, res) => {
  try {
    const { status, notes, location } = req.body;

    const soilTest = await SoilTest.findById(req.params.id);

    if (!soilTest) {
      return res.status(404).json({
        success: false,
        message: 'Soil test not found'
      });
    }

    // Update status
    await soilTest.updateStatus(status, notes);

    // Send notifications based on status
    const user = await require('../models/User').findById(soilTest.userId);
    
    try {
      if (status === 'sample_collected' && !soilTest.notifications.sampleCollectionSent) {
        await notificationService.sendNotification(user, 'sampleCollected', soilTest.testId);
        soilTest.notifications.sampleCollectionSent = true;
        await soilTest.save();
      } else if (status === 'in_lab' && !soilTest.notifications.labReceiptSent) {
        soilTest.notifications.labReceiptSent = true;
        await soilTest.save();
      }
    } catch (notifError) {
      console.error('Status notification error:', notifError);
    }

    res.json({
      success: true,
      message: 'Status updated successfully',
      soilTest
    });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating status'
    });
  }
});

// @route   PUT /api/soil-tests/:id/results
// @desc    Add lab results to soil test (Admin only - for demo purposes)
// @access  Private
router.put('/:id/results', protect, async (req, res) => {
  try {
    const { results } = req.body;

    const soilTest = await SoilTest.findById(req.params.id);

    if (!soilTest) {
      return res.status(404).json({
        success: false,
        message: 'Soil test not found'
      });
    }

    // Update results
    soilTest.results = results;
    soilTest.status = 'completed';
    await soilTest.updateStatus('completed', 'Lab analysis completed');

    res.json({
      success: true,
      message: 'Results updated successfully',
      soilTest
    });
  } catch (error) {
    console.error('Error updating results:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating results'
    });
  }
});

module.exports = router;
