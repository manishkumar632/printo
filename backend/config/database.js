import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // For development, we'll use a simple in-memory fallback if MongoDB isn't available
    let mongoUri = process.env.MONGODB_URI;
    
    // If MongoDB connection fails, we'll continue without it for now
    if (!mongoUri) {
      console.log('⚠️  No MongoDB URI provided. Running without database.');
      return;
    }

    const conn = await mongoose.connect(mongoUri, {
      // Remove deprecated options
    });
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    console.log('⚠️  Continuing without database connection...');
    // Don't exit the process, just continue without DB
    // process.exit(1);
  }
};

export default connectDB;