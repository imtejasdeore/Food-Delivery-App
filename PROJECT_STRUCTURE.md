# 🏗️ Food Delivery App - Complete Project Structure

```
food-delivery-app/
├── 📄 package.json                    # Root package.json with scripts
├── 📄 README.md                       # Complete setup and usage guide
├── 📄 setup.md                        # Quick setup instructions
├── 📄 PROJECT_STRUCTURE.md            # This file
│
├── 📁 client/                         # React Frontend Application
│   ├── 📄 package.json                # Frontend dependencies
│   ├── 📄 tailwind.config.js          # Tailwind CSS configuration
│   ├── 📄 postcss.config.js           # PostCSS configuration
│   │
│   ├── 📁 public/
│   │   ├── 📄 index.html               # Main HTML template
│   │   ├── 📄 favicon.ico              # App favicon
│   │   ├── 📄 manifest.json            # PWA manifest
│   │   └── 📁 images/                  # Static images (to be added)
│   │
│   └── 📁 src/
│       ├── 📄 index.js                 # React app entry point
│       ├── 📄 App.js                   # Main app component with routing
│       ├── 📄 index.css                # Global styles with Tailwind
│       │
│       ├── 📁 components/              # Reusable Components
│       │   ├── 📁 auth/                # Authentication Components
│       │   │   ├── 📄 ProtectedRoute.js    # Route protection for logged-in users
│       │   │   └── 📄 AdminRoute.js        # Route protection for admin users
│       │   │
│       │   ├── 📁 layout/              # Layout Components
│       │   │   ├── 📄 Navbar.js            # Navigation bar with cart counter
│       │   │   └── 📄 Footer.js            # Footer with contact info
│       │   │
│       │   └── 📁 product/             # Product-related Components
│       │       └── 📄 ProductCustomizationModal.js  # Advanced customization modal
│       │
│       ├── 📁 contexts/                # React Context Providers
│       │   ├── 📄 AuthContext.js           # Authentication state management
│       │   └── 📄 CartContext.js           # Cart state with customization support
│       │
│       └── 📁 pages/                   # Page Components
│           ├── 📄 HomePage.js              # Landing page with hero & featured items
│           ├── 📄 MenuPage.js              # Product catalog with filters
│           ├── 📄 ProductDetailPage.js     # Individual product view
│           ├── 📄 CartPage.js              # Shopping cart with edit customizations
│           ├── 📄 CheckoutPage.js          # Order checkout process
│           ├── 📄 OrdersPage.js            # User order history
│           ├── 📄 OrderDetailPage.js       # Individual order details
│           ├── 📄 ProfilePage.js           # User profile management
│           ├── 📄 ContactPage.js           # Contact form and information
│           ├── 📄 NotFoundPage.js          # 404 error page
│           │
│           ├── 📁 auth/                # Authentication Pages
│           │   ├── 📄 LoginPage.js         # User login with demo accounts
│           │   └── 📄 RegisterPage.js      # User registration
│           │
│           └── 📁 admin/               # Admin Panel Pages
│               ├── 📄 AdminDashboard.js    # Admin overview dashboard
│               ├── 📄 AdminProducts.js     # Product management
│               ├── 📄 AdminOrders.js       # Order management
│               └── 📄 AdminUsers.js        # User management
│
└── 📁 server/                         # Node.js Backend Application
    ├── 📄 package.json                # Backend dependencies
    ├── 📄 index.js                    # Express server entry point
    ├── 📄 .env.example                # Environment variables template
    │
    ├── 📁 models/                     # MongoDB Data Models
    │   ├── 📄 User.js                     # User schema with authentication
    │   ├── 📄 Product.js                  # Product schema with customization options
    │   └── 📄 Order.js                    # Order schema with detailed customizations
    │
    ├── 📁 routes/                     # API Route Handlers
    │   ├── 📄 auth.js                     # Authentication endpoints
    │   ├── 📄 products.js                 # Product CRUD and search
    │   ├── 📄 orders.js                   # Order management
    │   └── 📄 admin.js                    # Admin panel APIs
    │
    ├── 📁 middleware/                 # Custom Middleware
    │   └── 📄 auth.js                     # JWT authentication middleware
    │
    └── 📁 scripts/                   # Utility Scripts
        └── 📄 seedData.js                 # Database seeding with sample data
```

## 📋 Key Features by File:

### 🎯 **Frontend Core Files:**

**`client/src/App.js`**
- Main routing configuration
- Protected routes for authentication
- Admin route protection
- Layout structure

**`client/src/contexts/CartContext.js`**
- Advanced cart management
- Customization editing support
- Real-time price calculation
- Local storage persistence

**`client/src/pages/CartPage.js`**
- **Advanced cart features:**
  - Edit customizations directly from cart
  - Detailed customization summary display
  - Quantity management
  - Special instructions editing
  - Real-time total calculation

**`client/src/components/product/ProductCustomizationModal.js`**
- **Dynamic customization system:**
  - Single/multiple selection options
  - Real-time price updates
  - Validation for required options
  - Special instructions support

### 🎯 **Backend Core Files:**

**`server/models/Product.js`**
- **Customization schema:**
  - Flexible option types (single/multiple)
  - Pricing for each option
  - Required/optional settings
  - Category-specific options

**`server/models/Order.js`**
- **Detailed order tracking:**
  - Complete customization storage
  - Order status management
  - Pricing breakdown
  - Historical data preservation

**`server/scripts/seedData.js`**
- **Sample data includes:**
  - Pizza with size, crust, toppings, sauces, spice levels
  - Burgers with patty, cheese, add-ons options
  - Beverages with size and ice preferences
  - Admin and user accounts

## 🚀 **API Endpoints:**

### Authentication (`/api/auth/`)
- `POST /register` - User registration
- `POST /login` - User login
- `GET /me` - Get current user
- `PUT /profile` - Update profile
- `POST /address` - Add delivery address

### Products (`/api/products/`)
- `GET /` - Get products with filters
- `GET /categories` - Get product categories
- `GET /featured` - Get featured products
- `GET /:id` - Get single product
- `POST /:id/calculate-price` - Calculate price with customizations

### Orders (`/api/orders/`)
- `POST /` - Create new order
- `GET /` - Get user orders
- `GET /:id` - Get single order
- `PUT /:id/cancel` - Cancel order
- `POST /:id/rating` - Rate order

### Admin (`/api/admin/`)
- `GET /dashboard` - Dashboard statistics
- `GET /products` - Manage products
- `POST /products` - Create product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product
- `GET /orders` - Manage orders
- `PUT /orders/:id/status` - Update order status

## 🎨 **Styling & UI:**

- **Tailwind CSS** for responsive design
- **Framer Motion** for smooth animations
- **Heroicons** for consistent iconography
- **Custom CSS utilities** for advanced styling
- **Mobile-first responsive design**

## 🔧 **Technologies Used:**

### Frontend:
- React 18 with Hooks
- React Router for navigation
- Tailwind CSS for styling
- Framer Motion for animations
- Axios for API calls
- React Hot Toast for notifications

### Backend:
- Node.js with Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- Express Validator for input validation
- CORS and security middleware

This structure provides a complete, scalable food delivery application with advanced customization features and a professional codebase organization.