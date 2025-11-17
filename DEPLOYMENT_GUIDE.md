# SoilGuard Backend Deployment Guide (Render)

## 🚀 Quick Setup

### Step 1: Create MongoDB Database (Free)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a free cluster (M0 Sandbox - FREE)
3. Create a database user with password
4. Whitelist IP address: `0.0.0.0/0` (Allow from anywhere)
5. Get your connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/soilguard?retryWrites=true&w=majority
   ```

### Step 2: Get OpenRouter API Key (Free)
1. Go to [OpenRouter](https://openrouter.ai/)
2. Sign up for free account
3. Go to API Keys section
4. Generate new API key
5. Copy the key (starts with `sk-or-...`)

### Step 3: Generate JWT Secret
Run this command to generate a secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```
Or use any random 64+ character string.

### Step 4: Configure Render Environment Variables

Go to your Render service dashboard → **Environment** tab and add these variables:

| Variable Name | Value | Example |
|--------------|-------|---------|
| `MONGODB_URI` | Your MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/soilguard` |
| `JWT_SECRET` | Random 64+ character string | `a7f9c8d2e1b3f4a5...` (generate with command above) |
| `OPENROUTER_API_KEY` | Your OpenRouter API key | `sk-or-v1-xxxxxxxxxxxxx` |
| `OPENROUTER_BASE_URL` | OpenRouter base URL | `https://openrouter.ai/api/v1` |
| `FRONTEND_URL` | Your Vercel frontend URL | `https://soil-guard-livid.vercel.app` |
| `NODE_ENV` | Environment | `production` |
| `PORT` | Port (Render auto-sets this) | `10000` (auto-configured) |

### Step 5: Update Build & Start Commands

In Render dashboard:
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Auto-Deploy**: Enabled (deploys on git push)

### Step 6: Deploy!

After setting environment variables:
1. Click **Manual Deploy** → **Deploy latest commit**
2. Wait for build to complete (1-2 minutes)
3. Check logs for success messages:
   ```
   ✓ All required environment variables are set
   ✓ MongoDB Connected: cluster0-xxxxx.mongodb.net
   Server running on http://localhost:10000
   ```

## 🔍 Test Your Backend

Once deployed, test these endpoints:

### Health Check
```bash
curl https://your-backend.onrender.com/api/health
```
Expected response:
```json
{
  "success": true,
  "message": "SoilGuard API is running",
  "timestamp": "2025-11-17T..."
}
```

### Register User
```bash
curl -X POST https://your-backend.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

### Chat Test
```bash
curl -X POST https://your-backend.onrender.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What soil is best for tomatoes?","sessionId":"test-session"}'
```

## 🔗 Connect Frontend to Backend

After backend is deployed, update your frontend:

1. Create `.env.local` in frontend root:
   ```env
   NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
   ```

2. Update API calls in frontend to use this URL:
   ```javascript
   const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
   
   // Example API call
   const response = await fetch(`${API_URL}/api/auth/login`, {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ email, password })
   });
   ```

3. Commit and push to deploy frontend changes

## 📊 Monitor Your Deployment

### Render Dashboard
- **Logs**: Real-time logs at bottom of service page
- **Events**: Deployment history
- **Metrics**: CPU, Memory, Bandwidth usage

### Common Issues & Solutions

#### ❌ MongoDB Connection Failed
- Check MONGODB_URI is correct
- Verify database user has correct password
- Ensure IP whitelist includes `0.0.0.0/0`
- Check MongoDB cluster is active

#### ❌ JWT_SECRET Missing
- Add JWT_SECRET in Render environment variables
- Must be at least 32 characters long
- Use the crypto command to generate

#### ❌ OpenRouter API Error
- Verify OPENROUTER_API_KEY is correct
- Check you have API credits (free tier available)
- Ensure key starts with `sk-or-v1-`

#### ❌ CORS Errors
- Add your frontend URL to FRONTEND_URL environment variable
- Include protocol (https://)
- No trailing slash

## 💰 Cost Estimate

- **Render Web Service**: FREE (with limitations)
  - 750 hours/month free
  - Sleeps after 15 min inactivity
  - Wakes on request (slow first load)
  
- **MongoDB Atlas M0**: FREE forever
  - 512MB storage
  - Shared RAM
  - Perfect for development

- **OpenRouter API**: FREE tier available
  - Pay-as-you-go for premium models
  - Free models available (like Llama)

**Total Monthly Cost**: ₹0 (FREE) 🎉

## 🚀 Upgrade Options

### Render Paid Plans (Optional)
- **Starter ($7/mo)**: Always on, no sleep
- **Standard ($25/mo)**: More resources, faster

### Production Recommendations
1. Upgrade Render to Starter plan (always-on)
2. Add MongoDB connection pooling
3. Enable Render auto-scaling
4. Set up monitoring (Sentry, LogRocket)
5. Add Redis for session caching

## 🔒 Security Checklist

- [x] JWT_SECRET is random and secure
- [x] MongoDB credentials not in code
- [x] CORS restricted to frontend URL
- [x] Environment variables never committed
- [x] MongoDB IP whitelist configured
- [x] HTTPS enabled (automatic on Render)

## 📝 Next Steps

1. Set all environment variables in Render
2. Deploy backend
3. Test all API endpoints
4. Update frontend with backend URL
5. Deploy frontend to Vercel
6. Test full authentication flow
7. Test chat functionality

Need help? Check the logs in Render dashboard or see backend/README.md for API documentation.
