const mongoose = require('mongoose');

const soilTestSchema = new mongoose.Schema({
  // User information
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  
  // Test details
  testId: {
    type: String,
    unique: true,
    required: true
  },
  packageType: {
    type: String,
    enum: ['basic', 'advanced', 'premium'],
    required: true
  },
  packageName: String,
  price: Number,
  
  // Sample information
  sampleDetails: {
    collectionDate: Date,
    sampleType: String,
    location: {
      address: String,
      city: String,
      state: String,
      postalCode: String,
      coordinates: {
        latitude: Number,
        longitude: Number
      }
    },
    fieldArea: Number, // in acres
    cropType: String,
    previousCrop: String,
    notes: String
  },
  
  // Test status
  status: {
    type: String,
    enum: ['submitted', 'sample_collected', 'in_lab', 'completed', 'report_ready'],
    default: 'submitted'
  },
  statusHistory: [{
    status: String,
    timestamp: { type: Date, default: Date.now },
    notes: String
  }],
  
  // Lab results
  results: {
    pH: Number,
    nitrogen: Number, // N in kg/ha
    phosphorus: Number, // P in kg/ha
    potassium: Number, // K in kg/ha
    organicCarbon: Number, // in %
    organicMatter: Number, // in %
    electricalConductivity: Number, // dS/m
    soilTexture: String, // clay, loam, sandy, etc.
    micronutrients: {
      zinc: Number,
      iron: Number,
      manganese: Number,
      copper: Number,
      boron: Number
    },
    additionalParameters: mongoose.Schema.Types.Mixed
  },
  
  // Report
  reportGenerated: { type: Boolean, default: false },
  reportId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SoilReport'
  },
  
  // Notification tracking
  notifications: {
    sampleCollectionSent: { type: Boolean, default: false },
    labReceiptSent: { type: Boolean, default: false },
    reportReadySent: { type: Boolean, default: false }
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Generate unique test ID
soilTestSchema.pre('save', async function(next) {
  if (!this.testId) {
    const count = await mongoose.model('SoilTest').countDocuments();
    this.testId = `ST${Date.now()}${(count + 1).toString().padStart(4, '0')}`;
  }
  this.updatedAt = Date.now();
  next();
});

// Update status with history
soilTestSchema.methods.updateStatus = function(newStatus, notes = '') {
  this.status = newStatus;
  this.statusHistory.push({
    status: newStatus,
    timestamp: new Date(),
    notes
  });
  return this.save();
};

module.exports = mongoose.model('SoilTest', soilTestSchema);
