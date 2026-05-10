import express from 'express';
import axios from 'axios';
import Chat from '../models/Chat.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/history', protect, async (req, res) => {
  try {
    const history = await Chat.find({ user: req.user._id }).sort({ createdAt: 1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/send', protect, async (req, res) => {
  try {
    const { message } = req.body;
    
    const systemMessage = {
      role: "system",
      content: "You are Nexus AI. Strictly follow these rules: 1. Act as a professional AI assistant. 2. Do NOT introduce yourself unless asked. 3. If asked 'who built you' or about your creator, respond exactly with: 'I was developed and built by Shad Khan, a Software Engineer and B.Tech student in Computer Science and Engineering.' 4. Keep the tone professional and concise."
    };

    const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
      model: "llama-3.3-70b-versatile",
      messages: [systemMessage, { role: "user", content: message }],
    }, {
      headers: { 
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const reply = response.data.choices[0].message.content;
    
    await Chat.create({ user: req.user._id, role: 'user', content: message });
    await Chat.create({ user: req.user._id, role: 'assistant', content: reply });

    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'AI service error' });
  }
});

export default router;