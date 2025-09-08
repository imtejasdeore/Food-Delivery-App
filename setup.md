# Quick Setup Guide

## 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install
cd ..

# Install client dependencies
cd client
npm install
cd ..
```

## 2. Environment Setup

Create `server/.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/food-delivery-app
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

## 3. Start MongoDB

Make sure MongoDB is running on your system.

## 4. Seed Database

```bash
cd server
npm run seed
```

## 5. Start Application

```bash
# From root directory
npm run dev
```

This will start both frontend (http://localhost:3000) and backend (http://localhost:5000).

## Login Credentials

- **Admin**: admin@fooddelivery.com / admin123
- **User**: john@example.com / password123

## Troubleshooting

If you get dependency errors, try:
```bash
cd client
npm install --legacy-peer-deps
```

The application should now be working without the compilation errors!