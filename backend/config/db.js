const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Check if MONGODB_URI is defined
    if (!process.env.MONGODB_URI) {
      console.error('ERROR: MONGODB_URI is not defined in environment variables');
      console.log('Please set MONGODB_URI in your Render dashboard:');
      console.log('1. Go to your service on Render');
      console.log('2. Navigate to Environment tab');
      console.log('3. Add: MONGODB_URI = your_mongodb_connection_string');
      console.log('\nExample: mongodb+srv://username:password@cluster.mongodb.net/soilguard?retryWrites=true&w=majority');
      process.exit(1);
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`✗ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
