const { generateAccessToken, generateRefreshToken } = require('../utils/tokenUtils');
const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Check if the user already exists based on the email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    // Create a new user instance
    const newUser = new User({
      username,
      email,
      password,
      role
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error while signing up:', error);
    res.status(500).json({ message: 'An error occurred during registration' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Compare passwords
    bcrypt.compare(password, user.password, (err, result) => {
      if (err || !result) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
    });
    // Generate tokens using JWT
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken();

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    console.error('Error while logging in:', error);
    res.status(500).json({ message: 'An error occurred during login' });
  }
};
