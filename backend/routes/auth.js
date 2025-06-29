import express from 'express';
import { supabase } from '../config/supabase.js';
import UserSupabase from '../models/UserSupabase.js';
import { generateTokens, authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Middleware to check if database is connected
const checkDB = (req, res, next) => {
  if (!supabase) {
    return res.status(503).json({ 
      message: 'Database not available. Please connect to Supabase first.' 
    });
  }
  next();
};

// Register
router.post('/register', checkDB, async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Validate input
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    // Check if user already exists
    const existingUser = await UserSupabase.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create new user
    const user = await UserSupabase.create({
      firstName,
      lastName,
      email,
      password
    });

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens({
      userId: user.id,
      email: user.email
    });

    // Save refresh token
    await UserSupabase.updateRefreshToken(user.id, refreshToken);

    // Remove sensitive data from response
    const { refreshToken: _, ...userResponse } = user;

    res.status(201).json({
      message: 'User registered successfully',
      user: userResponse,
      accessToken,
      refreshToken
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: error.message || 'Server error during registration' });
  }
});

// Login
router.post('/login', checkDB, async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    const user = await UserSupabase.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isPasswordValid = await UserSupabase.comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens({
      userId: user.id,
      email: user.email
    });

    // Save refresh token
    await UserSupabase.updateRefreshToken(user.id, refreshToken);

    // Remove sensitive data from response
    const { password: _, refreshToken: __, ...userResponse } = user;

    res.json({
      message: 'Login successful',
      user: userResponse,
      accessToken,
      refreshToken
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message || 'Server error during login' });
  }
});

// Refresh token
router.post('/refresh', checkDB, async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token required' });
    }

    // Find user with this refresh token
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('refresh_token', refreshToken)
      .single();

    if (error || !data) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    const user = UserSupabase.formatUser(data);

    // Generate new tokens
    const { accessToken, refreshToken: newRefreshToken } = generateTokens({
      userId: user.id,
      email: user.email
    });

    // Update refresh token
    await UserSupabase.updateRefreshToken(user.id, newRefreshToken);

    res.json({
      accessToken,
      refreshToken: newRefreshToken
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(500).json({ message: 'Server error during token refresh' });
  }
});

// Logout
router.post('/logout', authenticateToken, async (req, res) => {
  try {
    if (supabase) {
      await UserSupabase.updateRefreshToken(req.user.userId, null);
    }

    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Server error during logout' });
  }
});

// Get current user
router.get('/me', authenticateToken, checkDB, async (req, res) => {
  try {
    const user = await UserSupabase.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove sensitive data from response
    const { password: _, refreshToken: __, ...userResponse } = user;

    res.json({ user: userResponse });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;