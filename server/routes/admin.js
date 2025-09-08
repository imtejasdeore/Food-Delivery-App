const express = require('express');
const { body, validationResult } = require('express-validator');
const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard stats
// @access  Admin
router.get('/dashboard', adminAuth, async (req, res) => {
  try {
    const [
      totalOrders,
      totalUsers,
      totalProducts,
      todayOrders,
      pendingOrders,
      totalRevenue
    ] = await Promise.all([
      Order.countDocuments(),
      User.countDocuments({ role: 'user' }),
      Product.countDocuments(),
      Order.countDocuments({
        createdAt: {
          $gte: new Date(new Date().setHours(0, 0, 0, 0))
        }
      }),
      Order.countDocuments({
        orderStatus: { $in: ['placed', 'confirmed', 'preparing'] }
      }),
      Order.aggregate([
        { $match: { orderStatus: 'delivered' } },
        { $group: { _id: null, total: { $sum: '$pricing.total' } } }
      ])
    ]);

    // Recent orders
    const recentOrders = await Order.find()
      .populate('user', 'name email')
      .populate('items.product', 'name')
      .sort({ createdAt: -1 })
      .limit(10);

    // Order status distribution
    const orderStatusStats = await Order.aggregate([
      {
        $group: {
          _id: '$orderStatus',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      stats: {
        totalOrders,
        totalUsers,
        totalProducts,
        todayOrders,
        pendingOrders,
        totalRevenue: totalRevenue[0]?.total || 0
      },
      recentOrders,
      orderStatusStats
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/admin/products
// @desc    Get all products for admin
// @access  Admin
router.get('/products', adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 20, category, search } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [products, total] = await Promise.all([
      Product.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Product.countDocuments(filter)
    ]);

    res.json({
      products,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/admin/products
// @desc    Create new product
// @access  Admin
router.post('/products', adminAuth, [
  body('name').notEmpty().withMessage('Product name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('category').isIn(['Pizza', 'Burgers', 'Fries', 'Beverages', 'Combos', 'Desserts']).withMessage('Invalid category'),
  body('basePrice').isFloat({ min: 0 }).withMessage('Base price must be a positive number'),
  body('image').notEmpty().withMessage('Product image is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const product = new Product(req.body);
    await product.save();

    res.status(201).json({
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/admin/products/:id
// @desc    Update product
// @access  Admin
router.put('/products/:id', adminAuth, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/admin/products/:id
// @desc    Delete product
// @access  Admin
router.delete('/products/:id', adminAuth, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/admin/orders
// @desc    Get all orders for admin
// @access  Admin
router.get('/orders', adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 20, status, startDate, endDate } = req.query;

    const filter = {};
    if (status) filter.orderStatus = status;
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [orders, total] = await Promise.all([
      Order.find(filter)
        .populate('user', 'name email phone')
        .populate('items.product', 'name image')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Order.countDocuments(filter)
    ]);

    res.json({
      orders,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/admin/orders/:id/status
// @desc    Update order status
// @access  Admin
router.put('/orders/:id/status', adminAuth, [
  body('status').isIn(['placed', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'cancelled']).withMessage('Invalid status'),
  body('note').optional().isString()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { status, note } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.orderStatus = status;
    
    if (status === 'delivered') {
      order.actualDeliveryTime = new Date();
    }

    // Add to status history
    order.statusHistory.push({
      status,
      timestamp: new Date(),
      note
    });

    await order.save();

    res.json({
      message: 'Order status updated successfully',
      order
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Admin
router.get('/users', adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query;

    const filter = { role: 'user' };
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [users, total] = await Promise.all([
      User.find(filter)
        .select('-password')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      User.countDocuments(filter)
    ]);

    res.json({
      users,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;