const mongoose = require('mongoose');

const soilReportSchema = new mongoose.Schema({
  // Links
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  soilTestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SoilTest',
    required: true
  },
  
  // Report identification
  reportNumber: {
    type: String,
    unique: true,
    required: true
  },
  generatedDate: {
    type: Date,
    default: Date.now
  },
  
  // Soil analysis summary
  overallHealthScore: {
    type: Number, // 0-100
    min: 0,
    max: 100
  },
  healthGrade: {
    type: String,
    enum: ['Excellent', 'Good', 'Fair', 'Poor', 'Critical']
  },
  
  // Detailed analysis
  analysis: {
    soilType: String,
    texture: String,
    pH: {
      value: Number,
      status: String, // 'optimal', 'low', 'high'
      recommendation: String
    },
    nutrients: {
      nitrogen: {
        value: Number,
        status: String,
        recommendation: String
      },
      phosphorus: {
        value: Number,
        status: String,
        recommendation: String
      },
      potassium: {
        value: Number,
        status: String,
        recommendation: String
      }
    },
    organicMatter: {
      value: Number,
      status: String,
      recommendation: String
    },
    micronutrients: mongoose.Schema.Types.Mixed
  },
  
  // AI-powered recommendations
  recommendations: {
    immediate: [String], // Urgent actions
    shortTerm: [String], // Within 1-3 months
    longTerm: [String], // Season/year planning
    cropSuggestions: [String], // Suitable crops based on soil
    fertilizers: [String], // Recommended fertilizer types and amounts
    amendments: [String] // Soil improvement suggestions
  },
  
  // Product recommendations
  recommendedProducts: [{
    productId: String,
    productName: String,
    reason: String,
    priority: Number, // 1-5, 1 being highest
    quantity: String,
    estimatedCost: Number,
    applicationMethod: String,
    expectedResults: String
  }],
  
  // Warnings and alerts
  warnings: [{
    severity: String, // 'critical', 'warning', 'info'
    message: String,
    actionRequired: String
  }],
  
  // Usage tracking
  viewed: { type: Boolean, default: false },
  viewedAt: Date,
  downloaded: { type: Boolean, default: false },
  downloadedAt: Date,
  
  // Notification status
  notificationSent: {
    email: { type: Boolean, default: false },
    sms: { type: Boolean, default: false },
    whatsapp: { type: Boolean, default: false }
  },
  notificationSentAt: Date,
  
  // Report metadata
  generatedBy: String, // 'AI' or 'Manual'
  validUntil: Date, // Soil reports typically valid for 6-12 months
  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Generate unique report number
soilReportSchema.pre('save', async function(next) {
  if (!this.reportNumber) {
    const count = await mongoose.model('SoilReport').countDocuments();
    this.reportNumber = `SR${Date.now()}${(count + 1).toString().padStart(4, '0')}`;
  }
  
  // Set validity (1 year from generation)
  if (!this.validUntil) {
    this.validUntil = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
  }
  
  next();
});

module.exports = mongoose.model('SoilReport', soilReportSchema);
