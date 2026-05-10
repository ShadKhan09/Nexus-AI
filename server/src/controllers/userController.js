import User from '../models/User.js';

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private (Requires token)
export const getUserProfile = async (req, res) => {
  // Because our 'protect' middleware ran first, req.user already contains the user data!
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      apiUsage: user.apiUsage,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};