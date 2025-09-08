const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// @route   GET /api/products
// @desc    Get all products with filtering and pagination
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      category,
      search,
      isVegetarian,
      isVegan,
      minPrice,
      maxPrice,
      page = 1,
      limit = 12,
      sortBy = 'name',
      sortOrder = 'asc'
    } = req.query;

    // Build filter object
    const filter = { isAvailable: true };

    if (category) {
      filter.category = category;
    }

    if (search) {
      filter.$text = { $search: search };
    }

    if (isVegetarian === 'true') {
      filter.isVegetarian = true;
    }

    if (isVegan === 'true') {
      filter.isVegan = true;
    }

    if (minPrice || maxPrice) {
      filter.basePrice = {};
      if (minPrice) filter.basePrice.$gte = parseFloat(minPrice);
      if (maxPrice) filter.basePrice.$lte = parseFloat(maxPrice);
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [products, total] = await Promise.all([
      Product.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      Product.countDocuments(filter)
    ]);

    res.json({
      products,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total,
        hasNext: skip + products.length < total,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/products/categories
// @desc    Get all product categories with counts
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const categories = await Product.aggregate([
      { $match: { isAvailable: true } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          avgPrice: { $avg: '$basePrice' },
          minPrice: { $min: '$basePrice' },
          maxPrice: { $max: '$basePrice' }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/products/featured
// @desc    Get featured products
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const featuredProducts = await Product.find({
      isAvailable: true,
      $or: [
        { 'rating.average': { $gte: 4.0 } },
        { tags: 'popular' },
        { discount: { $gt: 0 } }
      ]
    })
    .sort({ 'rating.average': -1, discount: -1 })
    .limit(8);

    res.json(featuredProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/products/:id
// @desc    Get single product by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (!product.isAvailable) {
      return res.status(404).json({ message: 'Product is currently unavailable' });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/products/:id/calculate-price
// @desc    Calculate price with customizations
// @access  Public
router.post('/:id/calculate-price', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const { customizations, quantity = 1 } = req.body;

    let totalPrice = product.basePrice;
    let customizationDetails = [];

    // Calculate customization costs
    if (customizations && customizations.length > 0) {
      for (const customization of customizations) {
        const option = product.customizationOptions.find(
          opt => opt.name === customization.optionName
        );

        if (option) {
          let optionPrice = 0;
          const selectedValues = [];

          for (const selectedValue of customization.selectedValues) {
            const valueOption = option.options.find(
              val => val.name === selectedValue
            );

            if (valueOption) {
              optionPrice += valueOption.price;
              selectedValues.push({
                name: valueOption.name,
                price: valueOption.price
              });
            }
          }

          customizationDetails.push({
            optionName: option.name,
            selectedValues,
            totalPrice: optionPrice
          });

          totalPrice += optionPrice;
        }
      }
    }

    // Apply discount if any
    if (product.discount > 0) {
      totalPrice = totalPrice * (1 - product.discount / 100);
    }

    const finalTotal = totalPrice * quantity;

    res.json({
      basePrice: product.basePrice,
      customizationPrice: totalPrice - product.basePrice,
      discountedPrice: totalPrice,
      quantity,
      total: finalTotal,
      customizationDetails,
      discount: product.discount
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;