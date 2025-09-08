import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlusIcon, StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { useCart } from '../../contexts/CartContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const SimilarItems = ({ currentItems = [] }) => {
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        setLoading(true);
        
        // Get categories from current cart items
        const categories = [...new Set(currentItems.map(item => item.product.category))];
        
        if (categories.length === 0) {
          setLoading(false);
          return;
        }

        // Fetch products from similar categories
        const response = await axios.get(`/api/products?category=${categories[0]}&limit=6`);
        
        // Filter out items already in cart
        const currentProductIds = currentItems.map(item => item.product._id);
        const filtered = response.data.products.filter(
          product => !currentProductIds.includes(product._id)
        );
        
        setSimilarProducts(filtered.slice(0, 4));
      } catch (error) {
        console.error('Failed to fetch similar products:', error);
        // Mock data for demonstration
        const mockProducts = [
          {
            _id: 'mock-1',
            name: 'Pepperoni Pizza',
            description: 'Classic pepperoni with mozzarella cheese',
            basePrice: 349,
            image: '/images/pepperoni-pizza.jpg',
            category: 'Pizza',
            rating: { average: 4.5, count: 120 },
            isVegetarian: false
          },
          {
            _id: 'mock-2',
            name: 'Chicken Wings',
            description: 'Spicy buffalo chicken wings with ranch dip',
            basePrice: 299,
            image: '/images/chicken-wings.jpg',
            category: 'Appetizers',
            rating: { average: 4.3, count: 85 },
            isVegetarian: false
          },
          {
            _id: 'mock-3',
            name: 'Caesar Salad',
            description: 'Fresh romaine lettuce with caesar dressing',
            basePrice: 199,
            image: '/images/caesar-salad.jpg',
            category: 'Salads',
            rating: { average: 4.1, count: 65 },
            isVegetarian: true
          },
          {
            _id: 'mock-4',
            name: 'Chocolate Brownie',
            description: 'Rich chocolate brownie with vanilla ice cream',
            basePrice: 149,
            image: '/images/chocolate-brownie.jpg',
            category: 'Desserts',
            rating: { average: 4.7, count: 95 },
            isVegetarian: true
          }
        ];
        setSimilarProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarProducts();
  }, [currentItems]);

  const handleAddToCart = (product) => {
    addToCart(product, 1, [], '');
    toast.success(`${product.name} added to cart!`);
  };

  if (loading) {
    return (
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">You might also like</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="card animate-pulse">
              <div className="h-32 bg-gray-200"></div>
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (similarProducts.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">You might also like</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {similarProducts.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="card-hover group"
          >
            <div className="relative overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = '/images/placeholder-food.jpg';
                }}
              />
              {product.isVegetarian && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
            </div>
            
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900 text-sm group-hover:text-primary-600 transition-colors line-clamp-1">
                  {product.name}
                </h4>
                {product.rating?.average > 0 && (
                  <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
                    <StarIconSolid className="w-3 h-3 text-yellow-400" />
                    <span className="text-xs text-gray-600">
                      {product.rating.average.toFixed(1)}
                    </span>
                  </div>
                )}
              </div>
              
              <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                {product.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-primary-600">
                  ₹{product.basePrice}
                </span>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="btn btn-primary btn-sm group/btn"
                >
                  <PlusIcon className="w-3 h-3 mr-1 group-hover/btn:scale-110 transition-transform" />
                  Add
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="text-center mt-6">
        <Link
          to="/menu"
          className="btn btn-outline"
        >
          View More Items
        </Link>
      </div>
    </div>
  );
};

export default SimilarItems;