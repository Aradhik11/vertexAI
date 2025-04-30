import express from 'express';
import User from '../models/User.js';
import Credit from '../models/Credit.js';
import { isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get user credits and history
router.get('/', async (req, res, next) => {
  try {
    const credits = await Credit.find({ user: req.user.id })
      .sort({ timestamp: -1 })
      .limit(50);
    
    const user = await User.findById(req.user.id).select('credits');
    
    res.json({
      total: user.credits,
      history: credits,
    });
  } catch (error) {
    next(error);
  }
});

// Add credits (login, profile, interaction)
router.post('/', async (req, res, next) => {
  try {
    const { amount, type, description } = req.body;
    
    // Validate credit type
    if (!['login', 'profile', 'interaction'].includes(type)) {
      return res.status(400).json({ message: 'Invalid credit type' });
    }
    
    // Create credit record
    const credit = new Credit({
      user: req.user.id,
      amount,
      type,
      description,
    });
    
    await credit.save();
    
    // Update user's total credits
    const user = await User.findById(req.user.id);
    user.credits += amount;
    await user.save();
    
    res.status(201).json({ credit, total: user.credits });
  } catch (error) {
    next(error);
  }
});

// Admin: Add credits to any user
router.post('/admin', isAdmin, async (req, res, next) => {
  try {
    const { userId, amount, description } = req.body;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Create credit record
    const credit = new Credit({
      user: userId,
      amount,
      type: 'admin',
      description,
    });
    
    await credit.save();
    
    // Update user's total credits
    user.credits += amount;
    await user.save();
    
    res.status(201).json({ credit, total: user.credits });
  } catch (error) {
    next(error);
  }
});

export default router;