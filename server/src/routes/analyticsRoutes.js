import express from 'express';
import Chat from '../models/Chat.js';
import Image from '../models/Image.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/stats', protect, async (req, res) => {
  try {
    const totalMessages = await Chat.countDocuments({ user: req.user._id, role: 'user' });
    const totalImages = await Image.countDocuments({ user: req.user._id });
    
    res.json({
      totalMessages,
      totalImages,
      chartData: [
        { name: 'Messages', value: totalMessages },
        { name: 'Images', value: totalImages }
      ]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;