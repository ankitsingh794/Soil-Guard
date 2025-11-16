# SoilGuard Backend API

Backend server for SoilGuard e-commerce platform with authentication and AI chat functionality.

## Features

- **User Authentication**
  - Register new users
  - Login with JWT tokens
  - Protected routes
  - Profile management

- **AI Chat Integration**
  - OpenRouter API integration
  - Session-based chat history
  - Context-aware responses
  - Fallback responses

## Tech Stack

- **Node.js** & **Express.js** - Server framework
- **MongoDB** & **Mongoose** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **OpenRouter API** - AI chat functionality

## Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Variables

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit `.env` and add your values:

```env
PORT=5000
NODE_ENV=development

# MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/soilguard

# JWT secret (use a strong random string)
JWT_SECRET=your_super_secret_jwt_key_here

# OpenRouter API key (get from https://openrouter.ai/)
OPENROUTER_API_KEY=your_openrouter_api_key_here
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### 3. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# For Windows (if installed as service)
net start MongoDB

# For macOS/Linux
mongod
```

Or use MongoDB Atlas (cloud):
- Create account at https://www.mongodb.com/cloud/atlas
- Create cluster and get connection string
- Replace MONGODB_URI in .env

### 4. Get OpenRouter API Key

1. Visit https://openrouter.ai/
2. Sign up for an account
3. Go to API Keys section
4. Create a new API key
5. Add it to your `.env` file

### 5. Run the Server

Development mode (with auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server will run on http://localhost:5000

## API Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+91 9876543210"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /api/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Updated",
  "phone": "+91 9876543210",
  "address": {
    "line1": "123 Street",
    "city": "Bangalore",
    "state": "Karnataka",
    "postalCode": "560001"
  }
}
```

### Chat

#### Send Message
```http
POST /api/chat
Content-Type: application/json

{
  "message": "I need soil for my garden",
  "sessionId": "unique-session-id-123",
  "context": {
    "application": "garden"
  }
}
```

#### Get Chat History
```http
GET /api/chat/history/:sessionId
```

### Health Check
```http
GET /api/health
```

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": [ ]
}
```

## Models

### User Model
- name (String, required)
- email (String, required, unique)
- password (String, required, hashed)
- phone (String)
- address (Object)
- role (String: 'user' | 'admin')
- createdAt (Date)
- lastLogin (Date)

### ChatMessage Model
- userId (ObjectId, optional)
- sessionId (String, required)
- messages (Array of message objects)
- context (Map)
- createdAt (Date, auto-expires after 30 days)

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Protected routes with middleware
- Input validation
- CORS configuration
- Environment variables for secrets

## Development Tips

1. Use Postman or Thunder Client to test API endpoints
2. Check MongoDB Compass to view database
3. Enable logging in development mode
4. Use nodemon for auto-restart during development

## Deployment

For production deployment:

1. Set `NODE_ENV=production` in .env
2. Use a strong JWT_SECRET
3. Use MongoDB Atlas for database
4. Set proper CORS origins
5. Use environment variables on hosting platform
6. Consider using PM2 for process management

## Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running
- Check connection string in .env
- Verify network access if using MongoDB Atlas

**OpenRouter API Error:**
- Verify API key is correct
- Check API rate limits
- Ensure you have credits in your OpenRouter account

**JWT Token Error:**
- Ensure JWT_SECRET is set in .env
- Check token expiration
- Verify token format in Authorization header

## License

MIT
