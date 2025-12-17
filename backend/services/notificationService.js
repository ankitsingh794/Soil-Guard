// Notification Service for SMS and WhatsApp
// Supports: Twilio (SMS + WhatsApp), Gupshup, MSG91

class NotificationService {
  constructor() {
    // Twilio configuration (most popular for SMS + WhatsApp)
    this.twilioAccountSid = process.env.TWILIO_ACCOUNT_SID || '';
    this.twilioAuthToken = process.env.TWILIO_AUTH_TOKEN || '';
    this.twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER || '';
    this.twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER || ''; // Format: whatsapp:+14155238886
    
    // Alternative: MSG91 (Popular in India)
    this.msg91AuthKey = process.env.MSG91_AUTH_KEY || '';
    this.msg91SenderId = process.env.MSG91_SENDER_ID || '';
    
    // Alternative: Gupshup
    this.gupshupApiKey = process.env.GUPSHUP_API_KEY || '';
    this.gupshupAppName = process.env.GUPSHUP_APP_NAME || '';
    
    this.isConfigured = this.checkConfiguration();
  }
  
  checkConfiguration() {
    // Check if at least one service is configured
    const hasTwilio = this.twilioAccountSid && this.twilioAuthToken;
    const hasMsg91 = this.msg91AuthKey;
    const hasGupshup = this.gupshupApiKey;
    
    if (!hasTwilio && !hasMsg91 && !hasGupshup) {
      console.warn('⚠️ No notification service configured. Please add API keys to .env file.');
      console.log(`
Required environment variables (choose one service):

Twilio (SMS + WhatsApp):
  TWILIO_ACCOUNT_SID=your_account_sid
  TWILIO_AUTH_TOKEN=your_auth_token
  TWILIO_PHONE_NUMBER=+1234567890
  TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886

MSG91 (SMS - India):
  MSG91_AUTH_KEY=your_auth_key
  MSG91_SENDER_ID=SOILGD

Gupshup (WhatsApp):
  GUPSHUP_API_KEY=your_api_key
  GUPSHUP_APP_NAME=SoilGuard
      `);
      return false;
    }
    
    console.log('✅ Notification service configured');
    return true;
  }
  
  // Send SMS using available service
  async sendSMS(phoneNumber, message) {
    if (!this.isConfigured) {
      console.log(`[DRY RUN] SMS to ${phoneNumber}: ${message}`);
      return { success: true, dryRun: true, message: 'Service not configured' };
    }
    
    try {
      // Try Twilio first
      if (this.twilioAccountSid && this.twilioAuthToken) {
        return await this.sendViaTwilio(phoneNumber, message, 'sms');
      }
      
      // Try MSG91
      if (this.msg91AuthKey) {
        return await this.sendViaMsg91(phoneNumber, message);
      }
      
      console.warn('No SMS service available');
      return { success: false, error: 'No SMS service configured' };
    } catch (error) {
      console.error('SMS sending error:', error);
      return { success: false, error: error.message };
    }
  }
  
  // Send WhatsApp message
  async sendWhatsApp(phoneNumber, message) {
    if (!this.isConfigured) {
      console.log(`[DRY RUN] WhatsApp to ${phoneNumber}: ${message}`);
      return { success: true, dryRun: true, message: 'Service not configured' };
    }
    
    try {
      // Try Twilio WhatsApp
      if (this.twilioAccountSid && this.twilioAuthToken && this.twilioWhatsAppNumber) {
        return await this.sendViaTwilio(phoneNumber, message, 'whatsapp');
      }
      
      // Try Gupshup
      if (this.gupshupApiKey) {
        return await this.sendViaGupshup(phoneNumber, message);
      }
      
      console.warn('No WhatsApp service available');
      return { success: false, error: 'No WhatsApp service configured' };
    } catch (error) {
      console.error('WhatsApp sending error:', error);
      return { success: false, error: error.message };
    }
  }
  
  // Twilio implementation (SMS + WhatsApp)
  async sendViaTwilio(phoneNumber, message, type = 'sms') {
    const twilio = require('twilio');
    const client = twilio(this.twilioAccountSid, this.twilioAuthToken);
    
    const messageData = {
      body: message,
      to: type === 'whatsapp' ? `whatsapp:${phoneNumber}` : phoneNumber,
      from: type === 'whatsapp' ? this.twilioWhatsAppNumber : this.twilioPhoneNumber
    };
    
    const result = await client.messages.create(messageData);
    return { success: true, messageId: result.sid, service: 'twilio' };
  }
  
  // MSG91 implementation (SMS - Popular in India)
  async sendViaMsg91(phoneNumber, message) {
    const axios = require('axios');
    
    const response = await axios.get('https://api.msg91.com/api/sendhttp.php', {
      params: {
        authkey: this.msg91AuthKey,
        mobiles: phoneNumber.replace('+91', ''), // Remove country code
        message: message,
        sender: this.msg91SenderId,
        route: '4', // Transactional route
        country: '91'
      }
    });
    
    return { success: true, response: response.data, service: 'msg91' };
  }
  
  // Gupshup implementation (WhatsApp - Popular in India)
  async sendViaGupshup(phoneNumber, message) {
    const axios = require('axios');
    
    const response = await axios.post('https://api.gupshup.io/sm/api/v1/msg', {
      channel: 'whatsapp',
      source: this.gupshupAppName,
      destination: phoneNumber,
      message: {
        type: 'text',
        text: message
      }
    }, {
      headers: {
        'apikey': this.gupshupApiKey,
        'Content-Type': 'application/json'
      }
    });
    
    return { success: true, response: response.data, service: 'gupshup' };
  }
  
  // Template messages for different scenarios
  templates = {
    // Farmer registration
    welcomeFarmer: (farmerName) => 
      `Welcome to SoilGuard, ${farmerName}! 🌱 Your farmer account is active. Submit your first soil test to get personalized recommendations. Visit: ${process.env.FRONTEND_URL || 'https://soil-guard-livid.vercel.app'}`,
    
    // Soil test submitted
    testSubmitted: (testId, farmerName) => 
      `Hi ${farmerName}, Your soil test ${testId} has been submitted successfully. Our team will collect samples within 2-3 days. Track: ${process.env.FRONTEND_URL}/soil-tests/${testId}`,
    
    // Sample collected
    sampleCollected: (testId) => 
      `Soil sample collected for test ${testId}. Sample sent to lab for analysis. Results in 3-5 days.`,
    
    // Report ready
    reportReady: (testId, reportNumber, healthGrade) => 
      `🎉 Your soil report ${reportNumber} is ready! Health Grade: ${healthGrade}. View detailed analysis & product recommendations: ${process.env.FRONTEND_URL}/reports/${reportNumber}`,
    
    // Product recommendation
    productRecommended: (productName, reason) => 
      `Based on your soil report, we recommend ${productName}. ${reason}. Shop now: ${process.env.FRONTEND_URL}/products`,
    
    // Order placed
    orderPlaced: (orderNumber, total) => 
      `Order ${orderNumber} placed successfully! Total: ₹${total}. Track your order: ${process.env.FRONTEND_URL}/orders/${orderNumber}`,
    
    // Order confirmed
    orderConfirmed: (orderNumber, estimatedDelivery) => 
      `Order ${orderNumber} confirmed! Estimated delivery: ${estimatedDelivery}. Track: ${process.env.FRONTEND_URL}/orders/${orderNumber}`,
    
    // Order shipped
    orderShipped: (orderNumber, trackingNumber) => 
      `Order ${orderNumber} shipped! Tracking: ${trackingNumber}. Expected in 2-3 days. Track: ${process.env.FRONTEND_URL}/orders/${orderNumber}`,
    
    // Out for delivery
    outForDelivery: (orderNumber) => 
      `Your order ${orderNumber} is out for delivery! Delivery expected today. Keep ₹ ready if COD.`,
    
    // Delivered
    delivered: (orderNumber) => 
      `Order ${orderNumber} delivered successfully! 🎉 Rate your experience: ${process.env.FRONTEND_URL}/orders/${orderNumber}/review`
  };
  
  // Helper to send notification based on user preferences
  async sendNotification(user, messageType, ...args) {
    if (!user.notificationPreferences) {
      return { success: false, error: 'User notification preferences not set' };
    }
    
    const message = this.templates[messageType](...args);
    const results = [];
    
    // Send SMS if enabled
    if (user.notificationPreferences.sms && user.smsNumber) {
      const smsResult = await this.sendSMS(user.smsNumber, message);
      results.push({ channel: 'sms', ...smsResult });
    }
    
    // Send WhatsApp if enabled
    if (user.notificationPreferences.whatsapp && user.whatsappNumber) {
      const whatsappResult = await this.sendWhatsApp(user.whatsappNumber, message);
      results.push({ channel: 'whatsapp', ...whatsappResult });
    }
    
    // Email can be added here if needed
    if (user.notificationPreferences.email && user.email) {
      // TODO: Implement email sending
      results.push({ channel: 'email', success: true, note: 'Email not implemented yet' });
    }
    
    return {
      success: results.some(r => r.success),
      results,
      message
    };
  }
}

// Export singleton instance
module.exports = new NotificationService();
