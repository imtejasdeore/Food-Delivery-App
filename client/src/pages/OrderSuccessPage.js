import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const OrderSuccessPage = () => {
  const location = useLocation();
  const { order } = location.state || {};

  if (!order) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            No order details found.
          </h1>
          <p className="text-gray-600 mb-8">
            Please go back to the home page and try again.
          </p>
          <Link to="/" className="btn btn-primary">
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="container-mobile section-padding-sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="card p-6 sm:p-8 text-center"
        >
          <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600 mb-8">
            Thank you for your order. You can track the status of your order in the "My Orders" section.
          </p>
          <div className="text-left mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-medium">#{order._id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-medium">₹{order.totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium">{order.paymentDetails.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Address:</span>
                <span className="font-medium text-right">{`${order.shippingAddress.street}, ${order.shippingAddress.city}`}</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center space-x-4">
            <Link to="/orders" className="btn btn-primary">
              Track Order
            </Link>
            <Link to="/menu" className="btn btn-outline">
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;