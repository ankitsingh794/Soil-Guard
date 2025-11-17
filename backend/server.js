require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');

// Initialize express
const app = express();

// Check required environment variables
console.log('Checking environment variables...');
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET', 'OPENROUTER_API_KEY'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('ERROR: Missing required environment variables:');
  missingEnvVars.forEach(varName => {
    console.error(`  - ${varName}`);
  });
  console.log('\nPlease set these in your Render dashboard under Environment tab');
  console.log('See backend/.env.example for reference');
  process.exit(1);
}

console.log('✓ All required environment variables are set');

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'SoilGuard API is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'SoilGuard Backend API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      chat: '/api/chat',
      health: '/api/health'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════╗
║   SoilGuard Backend API Server       ║
║   Port: ${PORT}                         ║
║   Environment: ${process.env.NODE_ENV || 'development'}            ║
╚═══════════════════════════════════════╝
  `);
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
