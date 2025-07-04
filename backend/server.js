import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import authRoutes from './routes/auth.js';
import apiRoutes from './routes/index.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB (non-blocking)
connectDB();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://zp1v56uxy8rdx5ypatb0ockcb9tr6a-oci3.w-credentialless-staticblitz.com'] 
    : ['http://localhost:3000'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Printo Backend API is running!',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      api: '/api'
    },
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    uptime: process.uptime(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 API URL: http://localhost:${PORT}`);
  console.log(`📊 Database: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
  
  if (mongoose.connection.readyState !== 1) {
    console.log('');
    console.log('🔧 To connect to MongoDB:');
    console.log('1. Create a MongoDB Atlas account at https://www.mongodb.com/atlas');
    console.log('2. Create a new cluster');
    console.log('3. Get your connection string');
    console.log('4. Add it to your .env file as MONGODB_URI');
    console.log('5. Make sure to whitelist your IP address');
  }
});