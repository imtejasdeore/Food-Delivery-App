const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

const users = [
  {
    name: 'Admin User',
    email: 'admin@512bites.com',
    password: 'admin123',
    phone: '9876543210',
    role: 'admin',
    addresses: [
      {
        type: 'work',
        street: '123 Admin Street',
        city: 'Admin City',
        state: 'Admin State',
        zipCode: '123456',
        isDefault: true
      }
    ]
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    phone: '9876543211',
    role: 'user',
    addresses: [
      {
        type: 'home',
        street: '456 User Street',
        city: 'User City',
        state: 'User State',
        zipCode: '654321',
        isDefault: true
      }
    ]
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    phone: '9876543212',
    role: 'user',
    addresses: [
      {
        type: 'home',
        street: '789 Customer Avenue',
        city: 'Customer City',
        state: 'Customer State',
        zipCode: '987654',
        isDefault: true
      }
    ]
  }
];

async function createUsers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/food-delivery-app', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing users (optional - comment out if you want to keep existing users)
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Create users
    for (const userData of users) {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);
      
      const user = new User(userData);
      await user.save();
      console.log(`Created user: ${user.name} (${user.email})`);
    }

    console.log('\nDemo users created successfully!');
    console.log('\nLogin credentials:');
    console.log('Admin: admin@512bites.com / admin123');
    console.log('User 1: john@example.com / password123');
    console.log('User 2: jane@example.com / password123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating users:', error);
    process.exit(1);
  }
}

// Run the function
createUsers();