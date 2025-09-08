import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ClockIcon,
  CheckCircleIcon,
  TruckIcon,
  MapPinIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

const OrderCard = ({ order, index }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'text-blue-600 bg-blue-100';
      case 'Preparing':
        return 'text-yellow-600 bg-yellow-100';
      case 'Out for Delivery':
        return 'text-orange-600 bg-orange-100';
      case 'Delivered':
        return 'text-green-600 bg-green-100';
      case 'Cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Confirmed':
        return CheckCircleIcon;
      case 'Preparing':
        return ClockIcon;
      case 'Out for Delivery':
        return TruckIcon;
      case 'Delivered':
        return CheckCircleIcon;
      default:
        return ClockIcon;
    }
  };

  const StatusIcon = getStatusIcon(order.status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card overflow-hidden"
    >
      <div className="p-4 sm:p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center justify-center w-12 h-12 rounded-full ${getStatusColor(order.status)}`}>
              <StatusIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Order #{order._id}</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                <div className="flex items-center space-x-1">
                  <CalendarIcon className="w-4 h-4" />
                  <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CurrencyDollarIcon className="w-4 h-4" />
                  <span>₹{order.totalAmount}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
              {order.status}
            </span>
            <Link
              to={`/orders/${order._id}`}
              className="btn btn-outline btn-sm"
            >
              <EyeIcon className="w-4 h-4 mr-1" />
              View Details
            </Link>
          </div>
        </div>
      </div>
      <div className="p-4 sm:p-6">
        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Order Items</h4>
            <div className="space-y-2">
              {order.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">
                    {item.quantity}x {item.product.name}
                  </span>
                  <span className="font-medium">₹{item.price}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Delivery Address</h4>
            <div className="flex items-start space-x-3">
              <MapPinIcon className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-gray-600 text-sm">{`${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderCard;