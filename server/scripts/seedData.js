const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '../.env' });

const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123',
    phone: '1234567890',
    role: 'admin',
  },
  {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    phone: '0987654321',
  },
];

const products = [
    {
        name: 'Margherita Pizza',
        description: 'Classic delight with 100% real mozzarella cheese',
        category: 'Pizza',
        basePrice: 250,
        image: '/images/pizzas/margherita.jpg',
        isVegetarian: true,
    },
    {
        name: 'Pepperoni Pizza',
        description: 'A classic American taste! Relish the delectable flavor of Chicken Pepperoni, topped with extra cheese',
        category: 'Pizza',
        basePrice: 350,
        image: '/images/pizzas/pepperoni.jpg',
    },
    {
        name: 'Veggie Supreme Pizza',
        description: 'A supreme combination of black olives, onion, capsicum, grilled mushroom, corn, tomato, and jalapeno',
        category: 'Pizza',
        basePrice: 320,
        image: '/images/pizzas/veggie_supreme.jpg',
        isVegetarian: true,
    },
    {
        name: 'Chicken Burger',
        description: 'A legendary chicken burger with a juicy chicken patty, fresh lettuce, and our secret sauce.',
        category: 'Burgers',
        basePrice: 180,
        image: '/images/burgers/chicken_burger.jpg',
    },
    {
        name: 'Veggie Burger',
        description: 'A delicious veggie patty, fresh lettuce, tomatoes, and onions in a soft bun.',
        category: 'Burgers',
        basePrice: 150,
        image: '/images/burgers/veggie_burger.jpg',
        isVegetarian: true,
    },
    {
        name: 'Classic Fries',
        description: 'Crispy, golden-brown fries salted to perfection.',
        category: 'Fries',
        basePrice: 90,
        image: '/images/sides/classic_fries.jpg',
        isVegetarian: true,
    },
    {
        name: 'Coca-Cola',
        description: 'A refreshing can of Coca-Cola.',
        category: 'Beverages',
        basePrice: 60,
        image: '/images/beverages/coca_cola.jpg',
    },
    {
        name: 'Chocolate Brownie',
        description: 'A rich and fudgy chocolate brownie.',
        category: 'Desserts',
        basePrice: 120,
        image: '/images/desserts/chocolate_brownie.jpg',
        isVegetarian: true,
    },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/food-delivery-app', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});

    console.log('Cleared existing data.');

    // Hash passwords and create users
    const createdUsers = await User.insertMany(users);

    console.log('Users seeded.');

    // Create products
    await Product.insertMany(products);
    console.log('Products seeded.');

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
};

seedDatabase();