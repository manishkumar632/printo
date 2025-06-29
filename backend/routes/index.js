import express from 'express';

const router = express.Router();

// API routes will be added here
router.get('/', (req, res) => {
  res.json({ message: 'API Routes' });
});

export default router;