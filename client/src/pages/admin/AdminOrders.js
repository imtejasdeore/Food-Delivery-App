import React from 'react';
import { motion } from 'framer-motion';

const AdminOrders = () => {
  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Manage Orders
          </h1>
          <div className="bg-white rounded-xl shadow-soft p-8 max-w-2xl mx-auto">
            <p className="text-gray-500">
              Order management interface for viewing and updating order status.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminOrders;