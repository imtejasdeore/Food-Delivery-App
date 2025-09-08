import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  TruckIcon, 
  ClockIcon, 
  GiftIcon,
  SparklesIcon 
} from '@heroicons/react/24/outline';

const PromoBanner = ({ type }) => {
  const bannerTypes = {
    welcome: {
      title: "Welcome to FoodDelivery!",
      subtitle: "Get 20% off on your first order",
      code: "WELCOME20",
      bgColor: "bg-gradient-to-r from-primary-500 to-primary-600",
      icon: SparklesIcon,
      textColor: "text-white"
    },
    flash: {
      title: "Flash Sale!",
      subtitle: "Limited time offer - 30% off",
      code: "FLASH30",
      bgColor: "bg-gradient-to-r from-red-500 to-red-600",
      icon: ClockIcon,
      textColor: "text-white"
    },
    delivery: {
      title: "Free Delivery",
      subtitle: "On orders above ₹299",
      code: "FREEDEL",
      bgColor: "bg-gradient-to-r from-green-500 to-green-600",
      icon: TruckIcon,
      textColor: "text-white"
    },
    weekend: {
      title: "Weekend Special",
      subtitle: "Buy 1 Get 1 Free on selected items",
      code: "WEEKEND",
      bgColor: "bg-gradient-to-r from-purple-500 to-purple-600",
      icon: GiftIcon,
      textColor: "text-white"
    }
  };

  const banner = bannerTypes[type] || bannerTypes.welcome;
  const IconComponent = banner.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`${banner.bgColor} rounded-xl p-6 ${banner.textColor} relative overflow-hidden`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-white"></div>
        <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white"></div>
      </div>

      <div className="relative z-10 flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <IconComponent className="w-6 h-6" />
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-1">{banner.title}</h3>
          <p className="text-sm opacity-90 mb-2">{banner.subtitle}</p>
          <div className="flex items-center space-x-2">
            <span className="text-xs bg-white/20 px-2 py-1 rounded">
              Code: {banner.code}
            </span>
          </div>
        </div>

        <div className="flex-shrink-0">
          <Link
            to="/menu"
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Order Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PromoBanner;