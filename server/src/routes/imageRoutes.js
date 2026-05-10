import express from 'express';
import Image from '../models/Image.js';
import axios from 'axios';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/gallery', protect, async (req, res) => {
  try {
    const images = await Image.find({ user: req.user._id }).sort({ timestamp: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/generate', protect, async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

    const seed = Math.floor(Math.random() * 1000000);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=1024&seed=${seed}&nologo=true`;

    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const base64 = Buffer.from(response.data, 'binary').toString('base64');
    const dataUrl = `data:image/png;base64,${base64}`;

    const newImage = new Image({ 
      user: req.user._id, 
      prompt: prompt, 
      url: dataUrl 
    });
    await newImage.save();

    res.json({ url: dataUrl });
  } catch (error) {
    console.error("Generation error:", error);
    res.status(500).json({ error: "Failed to generate image" });
  }
});

export default router;