import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Context Providers
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PublicRoute from './components/auth/PublicRoute';
import AdminRoute from './components/auth/AdminRoute';

// Pages
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailPage from './pages/OrderDetailPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import RefundPolicyPage from './pages/RefundPolicyPage';
import AboutUsPage from './pages/AboutUsPage';
import HelpCenterPage from './pages/HelpCenterPage';
import CareersPage from './pages/CareersPage';
import AccessibilityPage from './pages/AccessibilityPage';
import BlogPage from './pages/BlogPage';
import FeedbackPage from './pages/FeedbackPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';

// Error Pages
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            
            <main className="flex-1">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy" element={<PrivacyPolicyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/refund" element={<RefundPolicyPage />} />
                <Route path="/about" element={<AboutUsPage />} />
                <Route path="/help" element={<HelpCenterPage />} />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/accessibility" element={<AccessibilityPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/feedback" element={<FeedbackPage />} />
                <Route path="/login" element={
                  <PublicRoute>
                    <LoginPage />
                  </PublicRoute>
                } />
                <Route path="/register" element={
                  <PublicRoute>
                    <RegisterPage />
                  </PublicRoute>
                } />
                
                {/* Protected Routes */}
                <Route path="/cart" element={
                  <ProtectedRoute>
                    <CartPage />
                  </ProtectedRoute>
                } />
                <Route path="/checkout" element={
                  <ProtectedRoute>
                    <CheckoutPage />
                  </ProtectedRoute>
                } />
                <Route path="/orders" element={
                  <ProtectedRoute>
                    <OrdersPage />
                  </ProtectedRoute>
                } />
                <Route path="/orders/:id" element={
                  <ProtectedRoute>
                    <OrderDetailPage />
                  </ProtectedRoute>
                } />
                <Route path="/order-success" element={
                  <ProtectedRoute>
                    <OrderSuccessPage />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } />
                
                {/* Admin Routes */}
                <Route path="/admin" element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                } />
                <Route path="/admin/products" element={
                  <AdminRoute>
                    <AdminProducts />
                  </AdminRoute>
                } />
                <Route path="/admin/orders" element={
                  <AdminRoute>
                    <AdminOrders />
                  </AdminRoute>
                } />
                <Route path="/admin/users" element={
                  <AdminRoute>
                    <AdminUsers />
                  </AdminRoute>
                } />
                
                {/* 404 Route */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            
            <Footer />
            
            {/* Toast Notifications */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#10B981',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 5000,
                  iconTheme: {
                    primary: '#EF4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;