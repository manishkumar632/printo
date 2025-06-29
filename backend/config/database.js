import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri) {
      console.log('⚠️  No MongoDB URI provided in environment variables.');
      console.log('📝 Please add MONGODB_URI to your .env file with your MongoDB Atlas connection string.');
      console.log('🔗 Example: MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/printo?retryWrites=true&w=majority');
      return;
    }

    const conn = await mongoose.connect(mongoUri, {
      // Modern connection options
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    console.log('💡 Make sure your MongoDB URI is correct and your IP is whitelisted in MongoDB Atlas');
    console.log('⚠️  Continuing without database connection...');
    // Don't exit the process, just continue without DB
    // process.exit(1);
  }
};

export default connectDB;