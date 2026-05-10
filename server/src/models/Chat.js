import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  user: { type: String, default: 'shad khan' },
  role: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});


export default mongoose.model('Chat', chatSchema);