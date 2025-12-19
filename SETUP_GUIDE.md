# 🚀 Quick Setup Guide - Farmer Flow

## Backend Setup

### 1. Install New Dependencies

```bash
cd backend
npm install
```

This will install:
- `twilio@5.0.0` - For SMS and WhatsApp notifications

### 2. Configure Notification Services (Choose One)

#### Option A: Twilio (Recommended - SMS + WhatsApp)

1. **Sign up at https://www.twilio.com/try-twilio**
   - Get $15.50 free credit
   - No credit card required for trial

2. **Get your credentials:**
   - Account SID: Found in console dashboard
   - Auth Token: Found in console dashboard
   - Phone Number: Get a free trial number

3. **Enable WhatsApp Sandbox (for testing):**
   - Go to Messaging > Try WhatsApp
   - Send join code to WhatsApp number
   - Get sandbox number (e.g., whatsapp:+14155238886)

4. **Add to `.env` file:**
```bash
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
```

#### Option B: MSG91 (India - SMS Only)

1. **Sign up at https://msg91.com/**
2. **Get Auth Key** from dashboard
3. **Request Sender ID** (e.g., SOILGD)
4. **Add to `.env` file:**
```bash
MSG91_AUTH_KEY=your_auth_key_here
MSG91_SENDER_ID=SOILGD
```

#### Option C: Gupshup (India - WhatsApp Only)

1. **Sign up at https://www.gupshup.io/**
2. **Create WhatsApp Business App**
3. **Get API Key** from dashboard
4. **Add to `.env` file:**
```bash
GUPSHUP_API_KEY=your_api_key_here
GUPSHUP_APP_NAME=SoilGuard
```

### 3. Run the Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

**Note:** Server will run in dry-run mode if no notification API keys are configured. Notifications will be logged to console instead of being sent.

---

## Testing the APIs

### Test 1: Register as Farmer

```bash
curl -X POST http://localhost:10000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ramesh Kumar",
    "email": "ramesh@test.com",
    "password": "test123",
    "phone": "+919876543210",
    "userType": "farmer",
    "whatsappNumber": "+919876543210",
    "smsNumber": "+919876543210",
    "notificationPreferences": {
      "email": true,
      "sms": true,
      "whatsapp": true
    },
    "farmDetails": {
      "farmName": "Green Valley",
      "farmSize": 5,
      "farmSizeUnit": "acres",
      "location": {
        "village": "Rampur",
        "district": "Howrah",
        "state": "West Bengal",
        "pincode": "711302"
      },
      "cropTypes": ["rice", "wheat"],
      "soilType": "loam",
      "irrigationType": "drip",
      "farmingMethod": "organic"
    }
  }'
```

**Expected:** Welcome notification sent (if configured)

### Test 2: Submit Soil Test

```bash
# Replace <TOKEN> with token from registration response
curl -X POST http://localhost:10000/api/soil-tests \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{
    "packageType": "advanced",
    "packageName": "Advanced Soil Test",
    "price": 2999,
    "sampleDetails": {
      "sampleType": "field",
      "location": {
        "address": "Green Valley Farm",
        "city": "Howrah",
        "state": "West Bengal",
        "postalCode": "711302"
      },
      "fieldArea": 2,
      "cropType": "rice",
      "notes": "Field showing yellowing"
    }
  }'
```

**Expected:** Test submitted notification sent

### Test 3: Update Test Status

```bash
# Replace <TEST_ID> with ID from previous response
curl -X PUT http://localhost:10000/api/soil-tests/<TEST_ID>/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{
    "status": "sample_collected",
    "notes": "Sample collected successfully"
  }'
```

**Expected:** Sample collection notification sent

### Test 4: Add Lab Results

```bash
curl -X PUT http://localhost:10000/api/soil-tests/<TEST_ID>/results \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{
    "results": {
      "pH": 6.5,
      "nitrogen": 180,
      "phosphorus": 12,
      "potassium": 220,
      "organicCarbon": 0.4,
      "organicMatter": 0.7,
      "soilTexture": "loam"
    }
  }'
```

### Test 5: Generate Report

```bash
curl -X POST http://localhost:10000/api/soil-reports \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{
    "soilTestId": "<TEST_ID>"
  }'
```

**Expected:** Report ready notification sent with health grade

### Test 6: Place Order

```bash
curl -X POST http://localhost:10000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{
    "items": [
      {
        "productId": "prod_001",
        "productName": "Organic Compost",
        "category": "Compost",
        "quantity": 5,
        "unitPrice": 449
      }
    ],
    "shippingAddress": {
      "name": "Ramesh Kumar",
      "phone": "+919876543210",
      "addressLine1": "Green Valley Farm",
      "city": "Howrah",
      "state": "West Bengal",
      "postalCode": "711302"
    },
    "paymentMethod": "cod",
    "customerNotes": "Please call before delivery"
  }'
```

**Expected:** Order placed notification sent

### Test 7: Update Order Status

```bash
curl -X PUT http://localhost:10000/api/orders/<ORDER_ID>/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{
    "status": "shipped",
    "trackingNumber": "TRK123456",
    "estimatedDeliveryDate": "2025-12-20",
    "notes": "Package dispatched"
  }'
```

**Expected:** Order shipped notification sent

---

## Notification Examples

When properly configured, users will receive:

### On Registration:
```
Welcome to SoilGuard, Ramesh Kumar! 🌱 
Your farmer account is active. Submit your 
first soil test to get personalized recommendations.
Visit: https://soil-guard-livid.vercel.app
```

### On Test Submission:
```
Hi Ramesh Kumar, Your soil test ST17028347620001 
has been submitted successfully. Our team will 
collect samples within 2-3 days.
Track: https://soil-guard-livid.vercel.app/soil-tests/ST17028347620001
```

### On Report Ready:
```
🎉 Your soil report SR17028350120001 is ready! 
Health Grade: Good
View detailed analysis & product recommendations:
https://soil-guard-livid.vercel.app/reports/SR17028350120001
```

### On Order Placed:
```
Order ORD17028360120001 placed successfully! 
Total: ₹2,827
Track your order: https://soil-guard-livid.vercel.app/orders/ORD17028360120001
```

### On Order Shipped:
```
Order ORD17028360120001 shipped! 
Tracking: TRK123456
Expected in 2-3 days
Track: https://soil-guard-livid.vercel.app/orders/ORD17028360120001
```

---

## Troubleshooting

### Notifications not sending?

1. **Check console logs** - If no API keys configured, notifications are logged only
2. **Verify API keys** - Ensure correct format in `.env`
3. **Check Twilio balance** - Trial accounts have $15.50 credit
4. **Verify phone numbers** - Must be in E.164 format (+919876543210)
5. **WhatsApp sandbox** - Join sandbox before testing WhatsApp messages

### Database not connecting?

```bash
# Check MongoDB Atlas connection
curl http://localhost:10000/api/health

# Should return:
# {"success":true,"message":"SoilGuard API is running",...}
```

### Port already in use?

Change port in `.env`:
```bash
PORT=5001
```

---

## Production Deployment

### Render (Backend)

1. **Push to GitHub** (already done)
2. **Add Environment Variables in Render Dashboard:**
   - All existing variables
   - Add notification API keys (Twilio/MSG91/Gupshup)
3. **Deploy** - Render will auto-deploy from GitHub

### Important for Production:

```bash
# Set Node environment
NODE_ENV=production

# Use production notification numbers (not sandbox)
TWILIO_WHATSAPP_NUMBER=whatsapp:+919876543210

# Consider upgrading Twilio account for:
# - More messages
# - Production WhatsApp API
# - Better rates
```

---

## Cost Estimates

### Twilio (Pay as you go after free credit):
- SMS: $0.0075/message in India
- WhatsApp: $0.005/message in India
- Free incoming messages

### MSG91:
- SMS: ₹0.15 - ₹0.25 per message
- Bulk discounts available

### Gupshup:
- WhatsApp: ₹0.25 - ₹0.35 per message
- Conversation-based pricing

**Estimate for 100 farmers/month:**
- 1 registration = 1 message
- 2 soil tests = 10 messages (5 status updates each)
- 3 orders = 15 messages (5 status updates each)
- Total: ~2,600 messages/month = ~$20-30 USD

---

## Next Steps

1. ✅ Backend is ready and deployed
2. ⏳ Add notification API keys when ready
3. 🔜 Build frontend farmer registration page
4. 🔜 Build dashboard for tracking
5. 🔜 Build soil test submission form
6. 🔜 Build report viewer
7. 🔜 Build order tracking page

---

## Support

Questions? Check:
- `FARMER_FLOW_GUIDE.md` - Complete API documentation
- `TECH_STACK.txt` - Technology details
- Twilio docs: https://www.twilio.com/docs
- MSG91 docs: https://docs.msg91.com/
- Gupshup docs: https://docs.gupshup.io/

Backend is production-ready! 🚀
