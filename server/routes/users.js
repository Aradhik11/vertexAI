import express from 'express';
import User from '../models/User.js';
import { isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get current user
router.get('/me', async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Update user profile
router.put('/me', async (req, res, next) => {
  try {
    const { username, bio, twitter, reddit, website } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update fields
    if (username) user.username = username;
    if (bio) user.bio = bio;
    if (twitter) user.twitter = twitter;
    if (reddit) user.reddit = reddit;
    if (website) user.website = website;
    
    // Check if profile is now complete
    const isProfileComplete = Boolean(
      user.username && user.bio && (user.twitter || user.reddit) && user.website
    );
    
    if (isProfileComplete && !user.profileCompleted) {
      user.profileCompleted = true;
    }
    
    await user.save();
    
    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profileCompleted: user.profileCompleted,
        bio: user.bio,
        twitter: user.twitter,
        reddit: user.reddit,
        website: user.website,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Admin: Get all users
router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    next(error);
  }
});

export default router;