const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Generate JWT token
const generateToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

// @route   POST /api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', [
  body('name')
    .trim()
    .isLength({ min: 3, max: 25 })
    .withMessage('Name must be between 3 and 25 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name must contain only alphabetic characters'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('phone')
    .matches(/^[6-9]\d{9}$/)
    .withMessage('Please enter a valid 10-digit Indian mobile number')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, phone } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      phone
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').exists().withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(400).json({ message: 'Account is deactivated' });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        addresses: user.addresses
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 3, max: 25 })
    .withMessage('Name must be between 3 and 25 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name must contain only alphabetic characters'),
  body('phone')
    .optional()
    .matches(/^[6-9]\d{9}$/)
    .withMessage('Please enter a valid 10-digit Indian mobile number')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, phone } = req.body;
    const updateFields = {};

    if (name) updateFields.name = name;
    if (phone) updateFields.phone = phone;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updateFields },
      { new: true }
    );

    res.json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/auth/address
// @desc    Add user address
// @access  Private
router.post('/address', auth, [
  body('street').notEmpty().withMessage('Street is required'),
  body('city').notEmpty().withMessage('City is required'),
  body('state').notEmpty().withMessage('State is required'),
  body('zipCode').notEmpty().withMessage('Zip code is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { type, street, city, state, zipCode, isDefault } = req.body;

    const user = await User.findById(req.user._id);

    // If this is set as default, unset other defaults
    if (isDefault) {
      user.addresses.forEach(addr => addr.isDefault = false);
    }

    user.addresses.push({
      type: type || 'home',
      street,
      city,
      state,
      zipCode,
      isDefault: isDefault || user.addresses.length === 0
    });

    await user.save();

    res.json({
      message: 'Address added successfully',
      addresses: user.addresses
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;