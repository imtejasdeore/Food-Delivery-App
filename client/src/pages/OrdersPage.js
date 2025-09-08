import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ClockIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import axios from '../utils/axios';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import OrderCard from '../components/orders/OrderCard';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get('/api/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        toast.error('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated]);

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    if (filter === 'active') return ['Pending', 'Confirmed', 'Preparing', 'Out for Delivery'].includes(order.status);
    if (filter === 'delivered') return order.status === 'Delivered';
    return true;
  });

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50">
        <div className="container-mobile section-padding-sm">
          <div className="text-center">
            <ArrowPathIcon className="w-8 h-8 text-primary-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading your orders...</p>
          </div>
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
        >
          <h1 className="text-responsive-lg font-bold text-gray-900 mb-8 text-center sm:text-left">
            My Orders
          </h1>

          {/* Filter Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 sm:gap-4">
              {[
                { key: 'all', label: 'All Orders' },
                { key: 'active', label: 'Active Orders' },
                { key: 'delivered', label: 'Delivered' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filter === tab.key
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Orders List */}
          {filteredOrders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ClockIcon className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No orders found
              </h3>
              <p className="text-gray-600 mb-6">
                {filter === 'active'
                  ? "You don't have any active orders right now."
                  : filter === 'delivered'
                  ? "You haven't received any deliveries yet."
                  : "You haven't placed any orders yet."
                }
              </p>
              <Link
                to="/menu"
                className="btn btn-primary"
              >
                Browse Menu
              </Link>
            </motion.div>
          ) : (
            <div className="space-y-6">
              <AnimatePresence>
                {filteredOrders.map((order, index) => (
                  <OrderCard key={order._id} order={order} index={index} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default OrdersPage;