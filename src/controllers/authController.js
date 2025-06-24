const User = require('../models/User');
const logger = require('../utils/logger'); // Import logger

// Register a new user
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        message: 'Invalid input provided', 
        errors: ['Email already in use'] 
      });
    }
    
    // Create user
    const user = await User.create({
      name,
      email,
      password
    });
    
    sendTokenResponse(user, 201, res);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: 'Invalid input provided', errors: messages });
    }
    logger.error(`Error in register: ${error.message}`);
    res.status(500).json({ message: 'An internal server error occurred', error: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Invalid input provided', 
        errors: ['Please provide an email and password'] 
      });
    }
    
    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    sendTokenResponse(user, 200, res);
  } catch (error) {
    logger.error(`Error in login: ${error.message}`);
    res.status(500).json({ message: 'An internal server error occurred', error: error.message });
  }
};

// Get current logged in user
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json(user);
  } catch (error) {
    logger.error(`Error in getMe: ${error.message}`);
    res.status(500).json({ message: 'An internal server error occurred', error: error.message });
  }
};

// Log user out / clear cookie
exports.logout = async (req, res) => {
  
  res.status(200).json({ success: true, data: {} });
};

// Helper function to get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();
  
  
  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }
  
  res
    .status(statusCode)
    .json({
      success: true,
      token
    });
};