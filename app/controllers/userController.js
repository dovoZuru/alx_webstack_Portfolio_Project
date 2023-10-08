const User = require('../models/User');

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Retrieve the user's profile from the database
    const userProfile = await User.findById(userId);

    if (!userProfile) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(userProfile);
  } catch (error) {
    console.error('Error while getting user profile:', error);
    res.status(500).json({ message: 'An error occurred while fetching user profile' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    // Retrieve all the users from the database
    const users = await User.find()
    res.status(200).json(users);
  } catch (error) {
    console.error('Error while getting users:', error);
    res.status(500).json({ message: 'An error occurred while fetching all user' });
  }
};
