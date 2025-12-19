'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Layout from '@/components/layout/Layout';
import { 
  User, Mail, Lock, Eye, EyeOff, Phone, MapPin, 
  Sprout, Droplets, ChevronRight, ChevronLeft, CheckCircle, Wheat
} from 'lucide-react';
import { auth } from '@/lib/api';

export default function FarmerRegistrationPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    // Personal Info
    name: '',
    email: '',
    password: '',
    phone: '',
    
    // Farm Details
    farmName: '',
    farmSize: '',
    farmSizeUnit: 'acres',
    village: '',
    district: '',
    state: '',
    pincode: '',
    cropTypes: [] as string[],
    soilType: '',
    irrigationType: '',
    farmingMethod: '',
    
    // Notification Preferences
    whatsappNumber: '',
    smsNumber: '',
    notifEmail: true,
    notifSms: true,
    notifWhatsapp: true,
    orderUpdates: true,
    soilReports: true,
    recommendations: true,
  });

  const totalSteps = 3;

  const cropOptions = [
    'Rice', 'Wheat', 'Maize', 'Cotton', 'Sugarcane', 
    'Vegetables', 'Fruits', 'Pulses', 'Oilseeds', 'Tea', 
    'Coffee', 'Spices', 'Other'
  ];

  const soilTypes = [
    'Alluvial', 'Black (Regur)', 'Red', 'Laterite', 
    'Desert', 'Mountain', 'Loamy', 'Clay', 'Sandy'
  ];

  const irrigationTypes = [
    'Drip', 'Sprinkler', 'Flood', 'Rain-fed', 
    'Canal', 'Tube well', 'Mixed'
  ];

  const farmingMethods = [
    'Organic', 'Conventional', 'Mixed', 'Integrated'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked,
    });
  };

  const handleCropToggle = (crop: string) => {
    setFormData(prev => ({
      ...prev,
      cropTypes: prev.cropTypes.includes(crop)
        ? prev.cropTypes.filter(c => c !== crop)
        : [...prev.cropTypes, crop]
    }));
  };

  const validateStep = () => {
    if (step === 1) {
      if (!formData.name.trim()) {
        setError('Name is required');
        return false;
      }
      if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        setError('Valid email is required');
        return false;
      }
      if (!formData.password || formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return false;
      }
      if (!formData.phone.trim()) {
        setError('Phone number is required');
        return false;
      }
    } else if (step === 2) {
      if (!formData.farmName.trim()) {
        setError('Farm name is required');
        return false;
      }
      if (!formData.farmSize || parseFloat(formData.farmSize) <= 0) {
        setError('Valid farm size is required');
        return false;
      }
      if (!formData.village.trim() || !formData.district.trim() || !formData.state.trim()) {
        setError('Complete location details are required');
        return false;
      }
      if (formData.cropTypes.length === 0) {
        setError('Please select at least one crop type');
        return false;
      }
    }
    setError('');
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setError('');
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep()) return;

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const registrationData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        userType: 'farmer',
        whatsappNumber: formData.whatsappNumber || formData.phone,
        smsNumber: formData.smsNumber || formData.phone,
        notificationPreferences: {
          email: formData.notifEmail,
          sms: formData.notifSms,
          whatsapp: formData.notifWhatsapp,
          orderUpdates: formData.orderUpdates,
          soilReports: formData.soilReports,
          recommendations: formData.recommendations,
        },
        farmDetails: {
          farmName: formData.farmName,
          farmSize: parseFloat(formData.farmSize),
          farmSizeUnit: formData.farmSizeUnit,
          location: {
            village: formData.village,
            district: formData.district,
            state: formData.state,
            pincode: formData.pincode,
          },
          cropTypes: formData.cropTypes,
          soilType: formData.soilType,
          irrigationType: formData.irrigationType,
          farmingMethod: formData.farmingMethod,
        }
      };

      const response = await auth.register(registrationData);
      
      setSuccess('Registration successful! Redirecting to your dashboard...');
      
      // Store token and user data
      localStorage.setItem('soilguard_token', response.token);
      localStorage.setItem('soilguard_user', JSON.stringify(response.user));
      
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-botanical-50 via-white to-green-50 py-12">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-botanical-500 rounded-full mb-4">
                <Wheat className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-soil-800 mb-2">
                Farmer Registration
              </h1>
              <p className="text-soil-600">
                Join SoilGuard and unlock the power of soil science for your farm
              </p>
            </div>

            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between max-w-md mx-auto">
                {[1, 2, 3].map((num) => (
                  <React.Fragment key={num}>
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                          step >= num
                            ? 'bg-botanical-500 text-white shadow-lg'
                            : 'bg-sand-200 text-soil-400'
                        }`}
                      >
                        {step > num ? <CheckCircle className="w-6 h-6" /> : num}
                      </div>
                      <span className="text-xs mt-2 font-medium text-soil-600">
                        {num === 1 && 'Personal'}
                        {num === 2 && 'Farm Details'}
                        {num === 3 && 'Notifications'}
                      </span>
                    </div>
                    {num < totalSteps && (
                      <div
                        className={`flex-1 h-1 mx-2 rounded transition-all ${
                          step > num ? 'bg-botanical-500' : 'bg-sand-200'
                        }`}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-sand-200">
              {/* Error/Success Messages */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-start gap-2">
                  <span className="text-red-500 text-lg">⚠</span>
                  <span>{error}</span>
                </div>
              )}
              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{success}</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Information */}
                {step === 1 && (
                  <div className="space-y-5">
                    <h2 className="text-2xl font-bold text-soil-800 mb-6 flex items-center gap-2">
                      <User className="w-6 h-6 text-botanical-500" />
                      Personal Information
                    </h2>

                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-medium text-soil-700 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-soil-400 w-5 h-5" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-sand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-botanical-500 focus:border-transparent"
                          placeholder="Ramesh Kumar"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-soil-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-soil-400 w-5 h-5" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-sand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-botanical-500 focus:border-transparent"
                          placeholder="ramesh@example.com"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-soil-700 mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-soil-400 w-5 h-5" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-sand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-botanical-500 focus:border-transparent"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <p className="text-xs text-soil-500 mt-1">
                        This number will be used for SMS and WhatsApp notifications
                      </p>
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-sm font-medium text-soil-700 mb-2">
                        Password *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-soil-400 w-5 h-5" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          minLength={6}
                          className="w-full pl-10 pr-12 py-3 border border-sand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-botanical-500 focus:border-transparent"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-soil-400 hover:text-soil-600"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      <p className="text-xs text-soil-500 mt-1">
                        Must be at least 6 characters
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 2: Farm Details */}
                {step === 2 && (
                  <div className="space-y-5">
                    <h2 className="text-2xl font-bold text-soil-800 mb-6 flex items-center gap-2">
                      <Sprout className="w-6 h-6 text-botanical-500" />
                      Farm Details
                    </h2>

                    {/* Farm Name */}
                    <div>
                      <label className="block text-sm font-medium text-soil-700 mb-2">
                        Farm Name *
                      </label>
                      <input
                        type="text"
                        name="farmName"
                        value={formData.farmName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-sand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-botanical-500 focus:border-transparent"
                        placeholder="Green Valley Farm"
                      />
                    </div>

                    {/* Farm Size */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-soil-700 mb-2">
                          Farm Size *
                        </label>
                        <input
                          type="number"
                          name="farmSize"
                          value={formData.farmSize}
                          onChange={handleChange}
                          required
                          min="0"
                          step="0.1"
                          className="w-full px-4 py-3 border border-sand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-botanical-500 focus:border-transparent"
                          placeholder="5"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-soil-700 mb-2">
                          Unit
                        </label>
                        <select
                          name="farmSizeUnit"
                          value={formData.farmSizeUnit}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-sand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-botanical-500 focus:border-transparent"
                        >
                          <option value="acres">Acres</option>
                          <option value="hectares">Hectares</option>
                          <option value="bigha">Bigha</option>
                        </select>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-soil-700 mb-2">
                          Village/Town *
                        </label>
                        <input
                          type="text"
                          name="village"
                          value={formData.village}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-sand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-botanical-500 focus:border-transparent"
                          placeholder="Rampur"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-soil-700 mb-2">
                          District *
                        </label>
                        <input
                          type="text"
                          name="district"
                          value={formData.district}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-sand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-botanical-500 focus:border-transparent"
                          placeholder="Howrah"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-soil-700 mb-2">
                          State *
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-sand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-botanical-500 focus:border-transparent"
                          placeholder="West Bengal"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-soil-700 mb-2">
                          Pincode
                        </label>
                        <input
                          type="text"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-sand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-botanical-500 focus:border-transparent"
                          placeholder="711302"
                        />
                      </div>
                    </div>

                    {/* Crop Types */}
                    <div>
                      <label className="block text-sm font-medium text-soil-700 mb-3">
                        Crop Types * (Select all that apply)
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {cropOptions.map((crop) => (
                          <button
                            key={crop}
                            type="button"
                            onClick={() => handleCropToggle(crop)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                              formData.cropTypes.includes(crop)
                                ? 'bg-botanical-500 text-white shadow-md'
                                : 'bg-sand-100 text-soil-600 hover:bg-sand-200'
                            }`}
                          >
                            {crop}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Soil Type */}
                    <div>
                      <label className="block text-sm font-medium text-soil-700 mb-2">
                        Soil Type (if known)
                      </label>
                      <select
                        name="soilType"
                        value={formData.soilType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-sand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-botanical-500 focus:border-transparent"
                      >
                        <option value="">Select soil type</option>
                        {soilTypes.map((type) => (
                          <option key={type} value={type.toLowerCase()}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Irrigation Type */}
                    <div>
                      <label className="block text-sm font-medium text-soil-700 mb-2">
                        Irrigation Type
                      </label>
                      <select
                        name="irrigationType"
                        value={formData.irrigationType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-sand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-botanical-500 focus:border-transparent"
                      >
                        <option value="">Select irrigation type</option>
                        {irrigationTypes.map((type) => (
                          <option key={type} value={type.toLowerCase().replace(' ', '_')}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Farming Method */}
                    <div>
                      <label className="block text-sm font-medium text-soil-700 mb-2">
                        Farming Method
                      </label>
                      <select
                        name="farmingMethod"
                        value={formData.farmingMethod}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-sand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-botanical-500 focus:border-transparent"
                      >
                        <option value="">Select farming method</option>
                        {farmingMethods.map((method) => (
                          <option key={method} value={method.toLowerCase()}>
                            {method}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* Step 3: Notification Preferences */}
                {step === 3 && (
                  <div className="space-y-5">
                    <h2 className="text-2xl font-bold text-soil-800 mb-6 flex items-center gap-2">
                      <Phone className="w-6 h-6 text-botanical-500" />
                      Notification Preferences
                    </h2>

                    <p className="text-soil-600 mb-4">
                      Stay updated about your soil tests, reports, and orders. We'll send notifications via your preferred channels.
                    </p>

                    {/* Optional WhatsApp Number */}
                    <div>
                      <label className="block text-sm font-medium text-soil-700 mb-2">
                        WhatsApp Number (optional)
                      </label>
                      <input
                        type="tel"
                        name="whatsappNumber"
                        value={formData.whatsappNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-sand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-botanical-500 focus:border-transparent"
                        placeholder={formData.phone || "+91 98765 43210"}
                      />
                      <p className="text-xs text-soil-500 mt-1">
                        Leave blank to use your phone number
                      </p>
                    </div>

                    {/* Optional SMS Number */}
                    <div>
                      <label className="block text-sm font-medium text-soil-700 mb-2">
                        SMS Number (optional)
                      </label>
                      <input
                        type="tel"
                        name="smsNumber"
                        value={formData.smsNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-sand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-botanical-500 focus:border-transparent"
                        placeholder={formData.phone || "+91 98765 43210"}
                      />
                      <p className="text-xs text-soil-500 mt-1">
                        Leave blank to use your phone number
                      </p>
                    </div>

                    {/* Notification Channels */}
                    <div className="bg-botanical-50 border border-botanical-200 rounded-lg p-4">
                      <h3 className="font-semibold text-soil-800 mb-3">Notification Channels</h3>
                      <div className="space-y-2">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            name="notifEmail"
                            checked={formData.notifEmail}
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 text-botanical-500 border-sand-300 rounded focus:ring-botanical-500"
                          />
                          <span className="text-soil-700">Email notifications</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            name="notifSms"
                            checked={formData.notifSms}
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 text-botanical-500 border-sand-300 rounded focus:ring-botanical-500"
                          />
                          <span className="text-soil-700">SMS notifications</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            name="notifWhatsapp"
                            checked={formData.notifWhatsapp}
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 text-botanical-500 border-sand-300 rounded focus:ring-botanical-500"
                          />
                          <span className="text-soil-700">WhatsApp notifications</span>
                        </label>
                      </div>
                    </div>

                    {/* Notification Types */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h3 className="font-semibold text-soil-800 mb-3">What would you like to receive?</h3>
                      <div className="space-y-2">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            name="soilReports"
                            checked={formData.soilReports}
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 text-botanical-500 border-sand-300 rounded focus:ring-botanical-500"
                          />
                          <span className="text-soil-700">Soil test results & reports</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            name="orderUpdates"
                            checked={formData.orderUpdates}
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 text-botanical-500 border-sand-300 rounded focus:ring-botanical-500"
                          />
                          <span className="text-soil-700">Order status updates</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            name="recommendations"
                            checked={formData.recommendations}
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 text-botanical-500 border-sand-300 rounded focus:ring-botanical-500"
                          />
                          <span className="text-soil-700">Product recommendations & farming tips</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-4 mt-8">
                  {step > 1 && (
                    <Button
                      type="button"
                      onClick={handleBack}
                      variant="outline"
                      size="lg"
                      className="flex-1"
                    >
                      <ChevronLeft className="w-5 h-5 mr-2" />
                      Back
                    </Button>
                  )}
                  
                  {step < totalSteps ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      variant="primary"
                      size="lg"
                      className="flex-1"
                    >
                      Next
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="flex-1"
                      disabled={loading}
                    >
                      {loading ? 'Creating Account...' : 'Complete Registration'}
                    </Button>
                  )}
                </div>
              </form>

              {/* Footer */}
              <div className="mt-6 pt-6 border-t border-sand-200 text-center">
                <p className="text-sm text-soil-600">
                  Already have an account?{' '}
                  <Link href="/login" className="text-botanical-600 hover:text-botanical-700 font-medium">
                    Login here
                  </Link>
                </p>
              </div>
            </div>

            {/* Info Card */}
            <div className="mt-6 bg-botanical-50 border border-botanical-200 rounded-lg p-6">
              <h3 className="font-semibold text-soil-800 mb-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-botanical-500" />
                What you'll get with SoilGuard:
              </h3>
              <ul className="space-y-2 text-sm text-soil-700">
                <li className="flex items-start gap-2">
                  <span className="text-botanical-500 mt-1">✓</span>
                  <span>Advanced soil testing with detailed nutrient analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-botanical-500 mt-1">✓</span>
                  <span>AI-powered soil health reports with actionable recommendations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-botanical-500 mt-1">✓</span>
                  <span>Personalized product recommendations for your farm</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-botanical-500 mt-1">✓</span>
                  <span>Real-time order tracking and delivery updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-botanical-500 mt-1">✓</span>
                  <span>Expert support and farming tips</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
