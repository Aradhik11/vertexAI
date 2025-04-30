import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Get feed items (mock data for now)
router.get('/', async (req, res) => {
  // Mock data structure matching the frontend
  const mockFeed = {
    twitter: [
      {
        id: 't1',
        source: 'twitter',
        content: 'Just launched our newest product! Check it out at our website #innovation #tech',
        author: '@techcompany',
        timestamp: Date.now() - 3600000,
        url: 'https://twitter.com/techcompany/status/123456789',
        imageUrl: 'https://images.pexels.com/photos/13861/IMG_3496bfree.jpg',
        likes: 125,
        comments: 18
      }
    ],
    reddit: [
      {
        id: 'r1',
        source: 'reddit',
        title: 'I built a web app that helps creators track their content performance',
        content: 'After months of work, I finally launched my project that aggregates all your content metrics across platforms into one dashboard.',
        author: 'u/webdevpro',
        timestamp: Date.now() - 10800000,
        url: 'https://reddit.com/r/webdev/comments/abc123',
        imageUrl: 'https://images.pexels.com/photos/935756/pexels-photo-935756.jpeg',
        likes: 342,
        comments: 47
      }
    ]
  };
  
  res.json(mockFeed);
});

// Save feed item
router.post('/save', async (req, res, next) => {
  try {
    const { itemId } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user.savedItems) {
      user.savedItems = [];
    }
    
    if (!user.savedItems.includes(itemId)) {
      user.savedItems.push(itemId);
      await user.save();
    }
    
    res.json({ message: 'Item saved successfully' });
  } catch (error) {
    next(error);
  }
});

// Report feed item
router.post('/report', async (req, res, next) => {
  try {
    const { itemId, reason } = req.body;
    
    // In a real app, save this to a reports collection
    // For now, just acknowledge the report
    res.json({ message: 'Item reported successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;