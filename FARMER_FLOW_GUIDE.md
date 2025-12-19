# Farmer Flow Implementation Guide

## 🌱 Complete User Journey

This document outlines the comprehensive farmer-centric flow implemented in SoilGuard.

---

## 📋 Flow Overview

```
App Entry
    ↓
Authentication
    ↓
Farmer Registration (with farm details & notification preferences)
    ↓
Soil Test Submission
    ↓
    ├─→ Path A: Product Recommendations
    │     ↓
    │   Product Browsing
    │     ↓
    │   Add to Cart
    │     ↓
    │   Checkout & Payment
    │     ↓
    │   Order Management
    │     ↓
    │   Delivery Status Tracking
    │
    └─→ Path B: Soil Health Report
          ↓
        Lab Analysis
          ↓
        AI-Powered Recommendations
          ↓
        SMS/WhatsApp Notifications
```

---

## 🔐 1. Authentication & Registration

### Enhanced User Model
**Location:** `backend/models/User.js`

**New Fields Added:**
- `userType`: 'customer' | 'farmer'
- `whatsappNumber`: For WhatsApp notifications
- `smsNumber`: For SMS notifications
- `notificationPreferences`: Email, SMS, WhatsApp toggles
- `farmDetails`: Complete farm information

**Farm Details Structure:**
```javascript
farmDetails: {
  farmName: String,
  farmSize: Number,
  farmSizeUnit: 'acres' | 'hectares',
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
  cropTypes: [String],
  soilType: String,
  irrigationType: String,
  farmingMethod: String
}
```

### Registration API
**Endpoint:** `POST /api/auth/register`

**Request Body (Farmer Registration):**
```json
{
  "name": "Ramesh Kumar",
  "email": "ramesh@example.com",
  "password": "secure123",
  "phone": "+919876543210",
  "userType": "farmer",
  "whatsappNumber": "+919876543210",
  "smsNumber": "+919876543210",
  "notificationPreferences": {
    "email": true,
    "sms": true,
    "whatsapp": true,
    "orderUpdates": true,
    "soilReports": true,
    "recommendations": true
  },
  "farmDetails": {
    "farmName": "Green Valley Farm",
    "farmSize": 5,
    "farmSizeUnit": "acres",
    "location": {
      "village": "Rampur",
      "district": "Howrah",
      "state": "West Bengal",
      "pincode": "711302"
    },
    "cropTypes": ["rice", "wheat", "vegetables"],
    "soilType": "loam",
    "irrigationType": "drip",
    "farmingMethod": "organic"
  }
}
```

---

## 🧪 2. Soil Test Submission

### Soil Test Model
**Location:** `backend/models/SoilTest.js`

**Key Features:**
- Unique test ID generation (ST{timestamp}{sequence})
- Status tracking (submitted → sample_collected → in_lab → completed → report_ready)
- Sample location with coordinates
- Complete lab results storage
- Notification tracking

### Submit Soil Test
**Endpoint:** `POST /api/soil-tests`
**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "packageType": "advanced",
  "packageName": "Advanced Test",
  "price": 2999,
  "sampleDetails": {
    "sampleType": "field",
    "location": {
      "address": "Green Valley Farm, Rampur",
      "city": "Howrah",
      "state": "West Bengal",
      "postalCode": "711302",
      "coordinates": {
        "latitude": 22.5726,
        "longitude": 88.3639
      }
    },
    "fieldArea": 2,
    "cropType": "rice",
    "previousCrop": "wheat",
    "notes": "Field showing yellowing of plants"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Soil test submitted successfully",
  "soilTest": {
    "id": "65f7a2b3c4d5e6f7g8h9i0j1",
    "testId": "ST17028347620001",
    "packageType": "advanced",
    "status": "submitted",
    "createdAt": "2025-12-17T10:30:00Z"
  }
}
```

### Get All Soil Tests
**Endpoint:** `GET /api/soil-tests`
**Headers:** `Authorization: Bearer <token>`

### Get Specific Soil Test
**Endpoint:** `GET /api/soil-tests/:id`
**Headers:** `Authorization: Bearer <token>`

### Update Test Status (Admin/Lab)
**Endpoint:** `PUT /api/soil-tests/:id/status`
**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "status": "sample_collected",
  "notes": "Sample collected from field on 17-12-2025",
  "location": "Green Valley Farm"
}
```

**Automatic Notifications Sent:**
- `submitted` → Welcome SMS/WhatsApp with test ID
- `sample_collected` → Collection confirmation
- `in_lab` → Lab receipt confirmation
- `report_ready` → Report ready notification

---

## 📊 3. Soil Health Report Generation

### Soil Report Model
**Location:** `backend/models/SoilReport.js`

**Key Features:**
- AI-powered health scoring (0-100)
- Health grade (Excellent, Good, Fair, Poor, Critical)
- Detailed nutrient analysis
- Immediate, short-term, and long-term recommendations
- Product recommendations with priority
- Crop suggestions based on soil type

### Generate Report
**Endpoint:** `POST /api/soil-reports`
**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "soilTestId": "65f7a2b3c4d5e6f7g8h9i0j1"
}
```

**Response Example:**
```json
{
  "success": true,
  "message": "Soil report generated successfully",
  "soilReport": {
    "reportNumber": "SR17028350120001",
    "overallHealthScore": 72,
    "healthGrade": "Good",
    "analysis": {
      "pH": {
        "value": 6.5,
        "status": "optimal",
        "recommendation": "Maintain current pH through balanced fertilization"
      },
      "nutrients": {
        "nitrogen": {
          "value": 180,
          "status": "low",
          "recommendation": "Apply nitrogen-rich fertilizers or organic compost"
        }
      }
    },
    "recommendations": {
      "immediate": ["Nitrogen deficiency detected. Apply nitrogen-rich fertilizers."],
      "shortTerm": ["Apply phosphatic fertilizers for better root development"],
      "longTerm": ["Implement crop rotation for sustained soil health"],
      "cropSuggestions": ["Rice, wheat, vegetables, maize, pulses"],
      "fertilizers": ["Urea (46% N) - 100-150 kg per acre OR Organic Compost - 5 tons per acre"],
      "amendments": ["Farm Yard Manure (FYM) - 10 tons per acre annually"]
    },
    "recommendedProducts": [
      {
        "productName": "Organic Compost",
        "reason": "Rich in nitrogen and improves soil structure",
        "priority": 1,
        "quantity": "5 bags (250kg total) per acre",
        "estimatedCost": 2245,
        "applicationMethod": "Broadcast and incorporate into top 6 inches",
        "expectedResults": "Increases nitrogen by 30-40kg/ha, improves organic matter"
      }
    ]
  }
}
```

### Get All Reports
**Endpoint:** `GET /api/soil-reports`
**Headers:** `Authorization: Bearer <token>`

### Get Specific Report
**Endpoint:** `GET /api/soil-reports/:id`
**Headers:** `Authorization: Bearer <token>`

---

## 📦 4. Order Management System

### Order Model
**Location:** `backend/models/Order.js`

**Key Features:**
- Unique order number generation (ORD{timestamp}{sequence})
- Complete order lifecycle tracking
- Multiple payment methods (COD, UPI, Card, Net Banking)
- Automatic notification at each status change
- Link to soil report recommendations

### Create Order
**Endpoint:** `POST /api/orders`
**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "items": [
    {
      "productId": "prod_001",
      "productName": "Organic Compost",
      "productImage": "https://example.com/compost.jpg",
      "category": "Compost",
      "quantity": 5,
      "unitPrice": 449,
      "recommendedBySoilReport": true,
      "soilReportId": "65f7a2b3c4d5e6f7g8h9i0j1"
    }
  ],
  "shippingAddress": {
    "name": "Ramesh Kumar",
    "phone": "+919876543210",
    "addressLine1": "Green Valley Farm, Rampur",
    "city": "Howrah",
    "state": "West Bengal",
    "postalCode": "711302",
    "landmark": "Near Primary School"
  },
  "paymentMethod": "cod",
  "customerNotes": "Please deliver before 5 PM"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order placed successfully",
  "order": {
    "id": "65f7a2b3c4d5e6f7g8h9i0j1",
    "orderNumber": "ORD17028360120001",
    "total": 2827,
    "status": "placed",
    "estimatedDeliveryDate": null
  }
}
```

### Order Status Flow
```
placed → confirmed → processing → packed → shipped → out_for_delivery → delivered
```

### Get All Orders
**Endpoint:** `GET /api/orders`
**Headers:** `Authorization: Bearer <token>`

### Get Specific Order
**Endpoint:** `GET /api/orders/:id`
**Headers:** `Authorization: Bearer <token>`

### Update Order Status
**Endpoint:** `PUT /api/orders/:id/status`
**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "status": "shipped",
  "location": "Kolkata Distribution Center",
  "notes": "Package dispatched via Blue Dart",
  "trackingNumber": "BD123456789IN",
  "estimatedDeliveryDate": "2025-12-20"
}
```

### Cancel Order
**Endpoint:** `POST /api/orders/:id/cancel`
**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "reason": "Ordered by mistake"
}
```

---

## 📱 5. SMS/WhatsApp Notification System

### Notification Service
**Location:** `backend/services/notificationService.js`

**Supported Services:**
1. **Twilio** (Global - SMS + WhatsApp)
2. **MSG91** (India - SMS)
3. **Gupshup** (India - WhatsApp)

### Environment Variables Required

Add to `.env` file:

```bash
# Twilio (Option 1)
TWILIO_ACCOUNT_SID=your_account_sid_here
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886

# MSG91 (Option 2 - India SMS)
MSG91_AUTH_KEY=your_auth_key_here
MSG91_SENDER_ID=SOILGD

# Gupshup (Option 3 - India WhatsApp)
GUPSHUP_API_KEY=your_api_key_here
GUPSHUP_APP_NAME=SoilGuard
```

### Notification Templates

**Available Templates:**
- `welcomeFarmer` - Sent on farmer registration
- `testSubmitted` - Sent when soil test is submitted
- `sampleCollected` - Sent when sample is collected
- `reportReady` - Sent when soil report is generated
- `productRecommended` - Sent with product recommendations
- `orderPlaced` - Sent when order is placed
- `orderConfirmed` - Sent when order is confirmed
- `orderShipped` - Sent when order is shipped
- `outForDelivery` - Sent when out for delivery
- `delivered` - Sent when order is delivered

### Usage Example

```javascript
const notificationService = require('./services/notificationService');

// Send notification based on user preferences
await notificationService.sendNotification(
  user,                    // User object with preferences
  'reportReady',           // Template name
  testId,                  // Template parameters
  reportNumber,
  healthGrade
);
```

---

## 🛠️ Installation & Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

New dependencies added:
- `twilio@^5.0.0` - For SMS and WhatsApp

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and add your API keys:

```bash
cp .env.example .env
```

### 3. Sign Up for Notification Services

**Twilio (Recommended):**
1. Sign up at https://www.twilio.com/try-twilio
2. Get $15 free credit
3. Copy Account SID and Auth Token
4. Get a phone number for SMS
5. Enable WhatsApp sandbox for testing

**MSG91 (India SMS):**
1. Sign up at https://msg91.com/
2. Verify your account
3. Get Auth Key from dashboard
4. Request sender ID approval

**Gupshup (India WhatsApp):**
1. Sign up at https://www.gupshup.io/
2. Create WhatsApp app
3. Get API key

### 4. Run the Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

---

## 🧪 Testing the Flow

### Test Flow Sequence:

1. **Register as Farmer**
   ```bash
   POST /api/auth/register
   # Include userType: "farmer" and farmDetails
   ```

2. **Submit Soil Test**
   ```bash
   POST /api/soil-tests
   # Receive test ID and notification
   ```

3. **Update Test Status** (Simulate lab process)
   ```bash
   PUT /api/soil-tests/:id/status
   # Status: sample_collected → in_lab → completed
   ```

4. **Add Lab Results**
   ```bash
   PUT /api/soil-tests/:id/results
   # Add pH, NPK, organic matter data
   ```

5. **Generate Report**
   ```bash
   POST /api/soil-reports
   # AI analyzes results and creates report
   ```

6. **View Recommendations**
   ```bash
   GET /api/soil-reports/:id
   # See recommended products
   ```

7. **Place Order**
   ```bash
   POST /api/orders
   # Order recommended products
   ```

8. **Track Order**
   ```bash
   GET /api/orders/:id
   # Monitor delivery status
   ```

---

## 📊 Database Collections

### New Collections Created:

1. **soiltests**
   - Stores all soil test submissions
   - Links to users and reports
   - Tracks status history

2. **soilreports**
   - Stores generated reports
   - Contains AI analysis
   - Links to product recommendations

3. **orders**
   - Stores all orders
   - Tracks payment and delivery status
   - Links to soil reports if recommended

### Existing Collections Updated:

1. **users**
   - Added farmer-specific fields
   - Added notification preferences

---

## 🚀 API Summary

| Method | Endpoint | Purpose | Auth Required |
|--------|----------|---------|---------------|
| POST | `/api/auth/register` | Register farmer/customer | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |
| POST | `/api/soil-tests` | Submit soil test | Yes |
| GET | `/api/soil-tests` | Get all tests | Yes |
| GET | `/api/soil-tests/:id` | Get specific test | Yes |
| PUT | `/api/soil-tests/:id/status` | Update test status | Yes |
| PUT | `/api/soil-tests/:id/results` | Add lab results | Yes |
| POST | `/api/soil-reports` | Generate report | Yes |
| GET | `/api/soil-reports` | Get all reports | Yes |
| GET | `/api/soil-reports/:id` | Get specific report | Yes |
| POST | `/api/orders` | Create order | Yes |
| GET | `/api/orders` | Get all orders | Yes |
| GET | `/api/orders/:id` | Get specific order | Yes |
| PUT | `/api/orders/:id/status` | Update order status | Yes |
| POST | `/api/orders/:id/cancel` | Cancel order | Yes |

---

## 🎯 Next Steps

### Frontend Implementation Needed:

1. **Farmer Registration Page** (`/register/farmer`)
   - Multi-step form
   - Farm details collection
   - Notification preferences

2. **Soil Test Submission Form** (`/soil-test/submit`)
   - Package selection
   - Sample details
   - Location picker

3. **Dashboard** (`/dashboard`)
   - Soil tests overview
   - Reports list
   - Orders tracking
   - Recommendations

4. **Report Viewer** (`/reports/:id`)
   - Health score visualization
   - Detailed analysis
   - Product recommendations
   - Download PDF option

5. **Order Tracking** (`/orders/:id`)
   - Real-time status
   - Delivery timeline
   - Contact support

---

## 📞 Support

For API issues or questions:
- Email: support@soilguard.com
- Documentation: https://soil-guard-livid.vercel.app/help

---

## 📝 License

This implementation is part of the SoilGuard project.

**Last Updated:** December 17, 2025
