import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  user: { type: String, default: 'shad khan' },
  prompt: { type: String, required: true },
  url: { type: String, required: true }, 
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Image', imageSchema);