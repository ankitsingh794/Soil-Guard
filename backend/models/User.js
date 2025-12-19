const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't include password in queries by default
  },
  phone: {
    type: String,
    trim: true
  },
  // Notification channels
  whatsappNumber: {
    type: String,
    trim: true
  },
  smsNumber: {
    type: String,
    trim: true
  },
  notificationPreferences: {
    email: { type: Boolean, default: true },
    sms: { type: Boolean, default: false },
    whatsapp: { type: Boolean, default: false },
    orderUpdates: { type: Boolean, default: true },
    soilReports: { type: Boolean, default: true },
    recommendations: { type: Boolean, default: true }
  },
  address: {
    line1: String,
    line2: String,
    city: String,
    state: String,
    postalCode: String
  },
  // User type and role
  userType: {
    type: String,
    enum: ['customer', 'farmer'],
    default: 'customer'
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  // Farmer-specific details
  farmDetails: {
    farmName: String,
    farmSize: Number, // in acres
    farmSizeUnit: { type: String, enum: ['acres', 'hectares'], default: 'acres' },
    location: {
      village: String,
      district: String,
      state: String,
      pincode: String,
      coordinates: {
        latitude: Number,
        longitude: Number
      }
    },
    cropTypes: [String], // e.g., ['wheat', 'rice', 'vegetables']
    soilType: String, // e.g., 'clay', 'loam', 'sandy'
    irrigationType: String, // e.g., 'drip', 'sprinkler', 'flood'
    farmingMethod: String // e.g., 'organic', 'conventional', 'mixed'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON response
userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('User', userSchema);
