# 🍕 Food Delivery App

A complete full-stack food delivery application with advanced customization features, built with React.js, Node.js, Express, and MongoDB.

## ✨ Features

### 🎯 Core Features
- **User Authentication** - JWT-based login/register system
- **Product Catalog** - Browse food items by categories
- **Advanced Customization** - Detailed product customization (size, toppings, spice level, etc.)
- **Smart Cart** - Add, edit, remove items with full customization display
- **Order Management** - Place orders, track status, view history
- **Admin Panel** - Manage products, orders, and users
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop

### 🛒 Cart Features
- **Re-customization** - Edit item customizations directly from cart
- **Detailed Summary** - Clear display of all customizations and prices
- **Quantity Management** - Easy quantity adjustment
- **Special Instructions** - Add notes for each item
- **Price Calculation** - Real-time price updates with customizations

### 🍔 Product Customization
- **Multiple Option Types** - Single select, multi-select options
- **Dynamic Pricing** - Prices update based on selections
- **Required/Optional** - Flexible customization rules
- **Categories Supported**:
  - **Pizza**: Size, Crust, Toppings, Sauces, Spice Level
  - **Burgers**: Patty, Cheese, Add-ons, Spice Level
  - **Fries**: Size, Seasoning
  - **Beverages**: Size, Ice preference
  - **Combos**: Burger type, Drink, Fries size

### 👨‍💼 Admin Features
- **Dashboard** - Overview of orders, users, revenue
- **Product Management** - Add, edit, delete products and customizations
- **Order Management** - Update order status, view details
- **User Management** - View and manage user accounts

## 🚀 Tech Stack

### Frontend
- **React.js 18** - Modern React with hooks
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Heroicons** - Beautiful icons
- **React Hot Toast** - Toast notifications
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Express Validator** - Input validation
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd food-delivery-app
```

### 2. Install Dependencies

#### Install root dependencies
```bash
npm install
```

#### Install server dependencies
```bash
npm run install-server
```

#### Install client dependencies
```bash
npm run install-client
```

### 3. Environment Setup

#### Server Environment
Create `server/.env` file:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/food-delivery-app

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here

# Server Configuration
PORT=5000
NODE_ENV=development

# Client URL (for CORS)
CLIENT_URL=http://localhost:3000
```

### 4. Database Setup

#### Start MongoDB
Make sure MongoDB is running on your system.

#### Seed Sample Data
```bash
cd server
npm run seed
```

This will create:
- Sample products with customization options
- Admin user: `admin@fooddelivery.com` / `admin123`
- Test user: `john@example.com` / `password123`

### 5. Start the Application

#### Development Mode (Recommended)
```bash
# From root directory - starts both server and client
npm run dev
```

#### Or start separately:

**Start Server:**
```bash
npm run server
```

**Start Client:**
```bash
npm run client
```

### 6. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 🔐 Default Login Credentials

### Admin Account
- **Email**: admin@fooddelivery.com
- **Password**: admin123
- **Access**: Full admin panel access

### Test User Account
- **Email**: john@example.com
- **Password**: password123
- **Access**: Regular user features

## 📱 Usage Guide

### For Customers

1. **Browse Menu**
   - Visit the homepage
   - Browse by categories or view all items
   - Use search and filters

2. **Customize Products**
   - Click on any product
   - Select customization options
   - Add special instructions
   - Add to cart

3. **Manage Cart**
   - View all items with full customization details
   - Edit customizations by clicking "Edit"
   - Adjust quantities
   - Remove items

4. **Place Order**
   - Proceed to checkout
   - Add delivery address
   - Select payment method
   - Confirm order

5. **Track Orders**
   - View order history
   - Track current orders
   - Rate completed orders

### For Admins

1. **Access Admin Panel**
   - Login with admin credentials
   - Navigate to `/admin`

2. **Manage Products**
   - Add new products
   - Set up customization options
   - Update prices and availability

3. **Process Orders**
   - View incoming orders
   - Update order status
   - Manage delivery

## 🏗️ Project Structure

```
food-delivery-app/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
├── server/                 # Node.js backend
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── scripts/            # Utility scripts
│   ├── index.js            # Server entry point
│   └── package.json
├── package.json            # Root package.json
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/address` - Add address

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/categories` - Get categories
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get single product
- `POST /api/products/:id/calculate-price` - Calculate price with customizations

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/cancel` - Cancel order
- `POST /api/orders/:id/rating` - Rate order

### Admin
- `GET /api/admin/dashboard` - Dashboard stats
- `GET /api/admin/products` - Manage products
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- `GET /api/admin/orders` - Manage orders
- `PUT /api/admin/orders/:id/status` - Update order status

## 🎨 Customization

### Adding New Product Categories
1. Update the enum in `server/models/Product.js`
2. Add category icon in `client/src/pages/HomePage.js`
3. Update seed data in `server/scripts/seedData.js`

### Adding New Customization Options
1. Add to product's `customizationOptions` array
2. Specify `type` (single/multiple), `required`, and `options`
3. Each option can have a `name`, `price`, and `isDefault`

### Styling Customization
- Modify `client/tailwind.config.js` for theme changes
- Update `client/src/index.css` for custom styles
- Colors, fonts, and animations can be customized

## 🚀 Deployment

### Frontend (Netlify/Vercel)
```bash
cd client
npm run build
# Deploy the 'build' folder
```

### Backend (Heroku/Railway)
```bash
cd server
# Set environment variables
# Deploy with your preferred platform
```

### Database (MongoDB Atlas)
- Create MongoDB Atlas cluster
- Update `MONGODB_URI` in environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:

1. Check the console for error messages
2. Ensure MongoDB is running
3. Verify environment variables
4. Check if all dependencies are installed

For additional help, please create an issue in the repository.

## 🔮 Future Enhancements

- [ ] Real-time order tracking
- [ ] Push notifications
- [ ] Payment gateway integration (Razorpay/Stripe)
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Mobile app (React Native)
- [ ] Delivery partner app
- [ ] Analytics dashboard
- [ ] Loyalty program
- [ ] Social media integration

---

**Happy Coding! 🚀**