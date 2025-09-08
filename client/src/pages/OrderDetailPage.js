import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ClockIcon,
  CheckCircleIcon,
  TruckIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import axios from "../utils/axios";
import toast from "react-hot-toast";

const OrderDetailPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/orders/${id}`);
        console.log("Order API response:", response.data); // 👈 log it
        setOrder(response.data);
      } catch (error) {
        console.error("Failed to fetch order:", error);
        toast.error("Failed to load order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Confirmed":
        return CheckCircleIcon;
      case "Preparing":
        return ClockIcon;
      case "Out for Delivery":
        return TruckIcon;
      case "Delivered":
        return CheckCircleIcon;
      default:
        return ClockIcon;
    }
  };

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner w-8 h-8 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Order not found
          </h1>
          <p className="text-gray-600 mb-8">
            The order you are looking for does not exist.
          </p>
          <Link to="/orders" className="btn btn-primary">
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  const StatusIcon = getStatusIcon(order.status);

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="container-mobile section-padding-sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6">
            <Link
              to="/orders"
              className="flex items-center text-primary-600 hover:text-primary-700"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to My Orders
            </Link>
          </div>
          <div className="card p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center space-x-4">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600`}
                >
                  <StatusIcon className="w-6 h-6" />
                </div>
                <div>
                 <h1 className="text-lg sm:text-xl font-bold text-gray-900 break-all whitespace-normal">
  Order #{order._id}
</h1>


                  <p className="text-gray-600 text-sm">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800`}
                >
                  {order.status}
                </span>
                <div className="flex items-center space-x-1">
                  <CurrencyDollarIcon className="w-5 h-5 text-gray-500" />
                  <span className="font-bold text-lg text-gray-900">
                    ₹{order.totalAmount}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Order Items
                </h2>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium text-gray-900">₹{item.price}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Delivery Details
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPinIcon className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        Delivery Address
                      </p>
                      <p className="text-gray-600 text-sm">{`${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}`}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <ClockIcon className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        Estimated Delivery
                      </p>
                      <p className="text-gray-600 text-sm">30-45 minutes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
