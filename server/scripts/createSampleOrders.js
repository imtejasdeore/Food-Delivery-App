const mongoose = require('mongoose');
const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');
require('dotenv').config();

async function createSampleOrders() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/food-delivery-app', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Get a sample user and products
    const user = await User.findOne({ email: 'john@example.com' });
    if (!user) {
      console.log('User not found. Please run createUsers.js first.');
      process.exit(1);
    }

    const products = await Product.find().limit(3);
    if (products.length === 0) {
      console.log('No products found. Please run seedData.js first.');
      process.exit(1);
    }

    // Clear existing orders for this user
    await Order.deleteMany({ user: user._id });
    console.log('Cleared existing orders for user');

    // Create sample orders
    const sampleOrders = [
      {
        user: user._id,
        items: [
          {
            product: products[0]._id,
            productName: products[0].name,
            quantity: 1,
            basePrice: products[0].basePrice,
            customizations: [],
            itemTotal: products[0].basePrice
          },
          {
            product: products[1]._id,
            productName: products[1].name,
            quantity: 2,
            basePrice: products[1].basePrice,
            customizations: [],
            itemTotal: products[1].basePrice * 2
          }
        ],
        deliveryAddress: {
          street: '123 Main Street',
          city: 'Mumbai',
          state: 'Maharashtra',
          zipCode: '400001',
          contactNumber: '9876543211'
        },
        pricing: {
          subtotal: products[0].basePrice + (products[1].basePrice * 2),
          deliveryFee: 50,
          tax: (products[0].basePrice + (products[1].basePrice * 2)) * 0.05,
          total: products[0].basePrice + (products[1].basePrice * 2) + 50 + ((products[0].basePrice + (products[1].basePrice * 2)) * 0.05)
        },
        paymentMethod: 'card',
        paymentStatus: 'paid',
        orderStatus: 'delivered',
        estimatedDeliveryTime: new Date(Date.now() + 45 * 60 * 1000),
        actualDeliveryTime: new Date(Date.now() - 30 * 60 * 1000),
        specialInstructions: 'Please ring the doorbell'
      },
      {
        user: user._id,
        items: [
          {
            product: products[2]._id,
            productName: products[2].name,
            quantity: 1,
            basePrice: products[2].basePrice,
            customizations: [],
            itemTotal: products[2].basePrice
          }
        ],
        deliveryAddress: {
          street: '456 Park Avenue',
          city: 'Mumbai',
          state: 'Maharashtra',
          zipCode: '400002',
          contactNumber: '9876543211'
        },
        pricing: {
          subtotal: products[2].basePrice,
          deliveryFee: 0, // Free delivery
          tax: products[2].basePrice * 0.05,
          total: products[2].basePrice + (products[2].basePrice * 0.05)
        },
        paymentMethod: 'upi',
        paymentStatus: 'paid',
        orderStatus: 'out_for_delivery',
        estimatedDeliveryTime: new Date(Date.now() + 20 * 60 * 1000),
        specialInstructions: 'Call before delivery'
      },
      {
        user: user._id,
        items: [
          {
            product: products[0]._id,
            productName: products[0].name,
            quantity: 2,
            basePrice: products[0].basePrice,
            customizations: [],
            itemTotal: products[0].basePrice * 2
          }
        ],
        deliveryAddress: {
          street: '789 Garden Road',
          city: 'Mumbai',
          state: 'Maharashtra',
          zipCode: '400003',
          contactNumber: '9876543211'
        },
        pricing: {
          subtotal: products[0].basePrice * 2,
          deliveryFee: 50,
          tax: (products[0].basePrice * 2) * 0.05,
          total: (products[0].basePrice * 2) + 50 + ((products[0].basePrice * 2) * 0.05)
        },
        paymentMethod: 'cash',
        paymentStatus: 'pending',
        orderStatus: 'preparing',
        estimatedDeliveryTime: new Date(Date.now() + 35 * 60 * 1000),
        specialInstructions: 'Extra spicy please'
      }
    ];

    // Create orders
    for (const orderData of sampleOrders) {
      const order = new Order(orderData);
      await order.save();
      console.log(`Created order: ${order.orderNumber}`);
    }

    console.log('\nSample orders created successfully!');
    console.log('You can now test the orders page with real data.');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating sample orders:', error);
    process.exit(1);
  }
}

// Run the function
createSampleOrders();