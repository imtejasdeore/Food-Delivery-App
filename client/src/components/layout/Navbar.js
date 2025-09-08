import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bars3Icon, 
  XMarkIcon, 
  ShoppingCartIcon, 
  UserIcon,
  HomeIcon,
  BookOpenIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { getCartTotals } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const cartTotals = getCartTotals();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Menu', href: '/menu', icon: BookOpenIcon },
    { name: 'Contact', href: '/contact', icon: PhoneIcon },
  ];

  const userMenuItems = [
    { name: 'Profile', href: '/profile' },
    { name: 'Orders', href: '/orders' },
  ];

  if (user?.role === 'admin') {
    userMenuItems.push({ name: 'Admin Panel', href: '/admin' });
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 backdrop-blur-lg shadow-xl' 
        : 'bg-white'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-xl font-bold text-primary-600 hover:text-primary-700 transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">5B</span>
            </div>
            <span className="hidden sm:block">512Bites</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.href
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                <link.icon className="w-4 h-4" />
                <span>{link.name}</span>
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <ShoppingCartIcon className="w-6 h-6" />
              {cartTotals.itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
                >
                  {cartTotals.itemCount}
                </motion.span>
              )}
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <UserIcon className="w-5 h-5 text-gray-700" />
                  <span className="hidden sm:block text-sm font-medium text-gray-700">
                    {user?.name}
                  </span>
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-1">
                    {userMenuItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Link
                  to="/login"
                  className="btn btn-outline btn-sm"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary btn-sm"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              {isOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-100"
            >
              <div className="py-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      location.pathname === link.href
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                    }`}
                  >
                    <link.icon className="w-5 h-5" />
                    <span>{link.name}</span>
                  </Link>
                ))}

                {isAuthenticated ? (
                  <>
                    <div className="border-t border-gray-100 pt-2 mt-2">
                      {userMenuItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="border-t border-gray-100 pt-2 mt-2 space-y-2">
                    <Link
                      to="/login"
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-3 text-sm text-primary-600 font-medium hover:bg-primary-50 transition-colors"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;