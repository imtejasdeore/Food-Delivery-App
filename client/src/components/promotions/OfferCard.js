import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  TagIcon,
  ClockIcon,
  CurrencyRupeeIcon
} from '@heroicons/react/24/outline';

const OfferCard = ({ offer, index }) => {
  const getOfferTypeColor = (type) => {
    switch (type) {
      case 'combo':
        return 'bg-blue-500';
      case 'discount':
        return 'bg-red-500';
      case 'free-delivery':
        return 'bg-green-500';
      default:
        return 'bg-primary-500';
    }
  };

  const getOfferTypeIcon = (type) => {
    switch (type) {
      case 'combo':
        return '🍽️';
      case 'discount':
        return '🏷️';
      case 'free-delivery':
        return '🚚';
      default:
        return '🎉';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-soft overflow-hidden hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
    >
      {/* Offer Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={offer.image}
          alt={offer.title}
          className="w-full h-full object-cover"
          // onError={(e) => {
          //   e.target.src = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop';
          // }}
        />
        
        {/* Discount Badge */}
        <div className={`absolute top-4 left-4 ${getOfferTypeColor(offer.type)} text-white px-3 py-1 rounded-full text-sm font-bold`}>
          {offer.discount}% OFF
        </div>

        {/* Offer Type Icon */}
        <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-lg">
          {getOfferTypeIcon(offer.type)}
        </div>
      </div>

      {/* Offer Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-lg text-gray-900 line-clamp-1">
            {offer.title}
          </h3>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded whitespace-nowrap ml-2">
            {offer.category || 'All Items'}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {offer.description}
        </p>

        {/* Offer Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <TagIcon className="w-4 h-4" />
            <span>Code: <span className="font-mono font-medium text-primary-600">{offer.code}</span></span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <CurrencyRupeeIcon className="w-4 h-4" />
            <span>Min order: ₹{offer.minOrder}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <ClockIcon className="w-4 h-4" />
            <span>Valid until: {offer.validUntil}</span>
          </div>
        </div>

        {/* Action Button */}
        <Link
          to={`/menu${offer.category ? `?category=${offer.category}` : ''}`}
          className="w-full btn btn-primary btn-sm"
        >
          Order Now
        </Link>
      </div>
    </motion.div>
  );
};

export default OfferCard;