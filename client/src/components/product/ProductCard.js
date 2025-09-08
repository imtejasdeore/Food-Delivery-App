import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { StarIcon, PlusIcon } from '@heroicons/react/24/solid';
import ImageWithFallback from '../common/ImageWithFallback';
import { useCart } from '../../contexts/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="card"
    >
      <Link to={`/product/${product._id}`}>
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="font-semibold text-lg text-gray-900 truncate">{product.name}</h3>
        </Link>
        <p className="text-gray-600 text-sm mt-1">{product.category}</p>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <StarIcon className="w-5 h-5 text-yellow-400" />
            <span className="text-gray-700 font-semibold ml-1">{product.rating?.average || 0}</span>
            <span className="text-gray-500 text-sm ml-1">({product.rating?.count || 0})</span>
          </div>
          <p className="font-bold text-lg text-primary-600">₹{product.basePrice}</p>
        </div>
        <button
          onClick={handleAddToCart}
          className="btn btn-primary w-full mt-4"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;