import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HomeIcon } from '@heroicons/react/24/outline';

const NotFoundPage = () => {
  return (
    <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-md mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary-600 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for. 
            Perhaps you've mistyped the URL? Be sure to check your spelling.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="btn btn-primary btn-lg inline-flex items-center space-x-2"
          >
            <HomeIcon className="w-5 h-5" />
            <span>Go Home</span>
          </Link>
          
          <div className="text-sm text-gray-500">
            <Link to="/menu" className="text-primary-600 hover:text-primary-700 mx-2">
              Browse Menu
            </Link>
            |
            <Link to="/contact" className="text-primary-600 hover:text-primary-700 mx-2">
              Contact Us
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;