import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  StarIcon as StarIconSolid,
  HeartIcon,
  ShareIcon,
  ClockIcon,
  InformationCircleIcon
} from '@heroicons/react/24/solid';
import { 
  ArrowLeftIcon,
  HeartIcon as HeartIconOutline
} from '@heroicons/react/24/outline';
import axios from 'axios';
import ProductCustomizationModal from '../components/product/ProductCustomizationModal';
import toast from 'react-hot-toast';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCustomization, setShowCustomization] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
        toast.error('Product not found');
        navigate('/menu');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, navigate]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
  };

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50">
        <div className="container-custom py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-200 rounded-xl"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="h-12 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Back to Menu</span>
        </button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
              {product.discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {product.discount}% OFF
                </div>
              )}
              {product.isVegetarian && (
                <div className="absolute top-4 right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              )}
            </div>

            {/* Additional Images */}
            {product.images && product.images.length > 0 && (
              <div className="flex space-x-4 mt-4">
                {product.images.slice(0, 3).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
                  />
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {product.name}
                </h1>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={toggleFavorite}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    {isFavorite ? (
                      <HeartIcon className="w-6 h-6 text-red-500" />
                    ) : (
                      <HeartIconOutline className="w-6 h-6 text-gray-400" />
                    )}
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <ShareIcon className="w-6 h-6 text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <span className="badge badge-info">{product.category}</span>
                {product.isVegetarian && (
                  <span className="badge badge-success">Vegetarian</span>
                )}
                {product.isVegan && (
                  <span className="badge badge-success">Vegan</span>
                )}
                {product.tags?.map((tag) => (
                  <span key={tag} className="badge bg-gray-100 text-gray-700">
                    {tag}
                  </span>
                ))}
              </div>

              {product.rating?.average > 0 && (
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIconSolid
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating.average)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating.average.toFixed(1)} ({product.rating.count} reviews)
                  </span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-primary-600">
                ₹{product.discountedPrice || product.basePrice}
              </span>
              {product.discount > 0 && (
                <span className="text-xl text-gray-500 line-through">
                  ₹{product.basePrice}
                </span>
              )}
              <span className="text-sm text-gray-600">starting from</span>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Preparation Time */}
            <div className="flex items-center space-x-2 text-gray-600">
              <ClockIcon className="w-5 h-5" />
              <span>Preparation time: {product.preparationTime || 15} minutes</span>
            </div>

            {/* Allergens */}
            {product.allergens && product.allergens.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <InformationCircleIcon className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-800 mb-1">Allergen Information</h4>
                    <p className="text-sm text-amber-700">
                      Contains: {product.allergens.join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Nutritional Info */}
            {product.nutritionalInfo && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-3">Nutritional Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {product.nutritionalInfo.calories && (
                    <div>
                      <span className="text-blue-700">Calories:</span>
                      <span className="ml-2 font-medium">{product.nutritionalInfo.calories}</span>
                    </div>
                  )}
                  {product.nutritionalInfo.protein && (
                    <div>
                      <span className="text-blue-700">Protein:</span>
                      <span className="ml-2 font-medium">{product.nutritionalInfo.protein}g</span>
                    </div>
                  )}
                  {product.nutritionalInfo.carbs && (
                    <div>
                      <span className="text-blue-700">Carbs:</span>
                      <span className="ml-2 font-medium">{product.nutritionalInfo.carbs}g</span>
                    </div>
                  )}
                  {product.nutritionalInfo.fat && (
                    <div>
                      <span className="text-blue-700">Fat:</span>
                      <span className="ml-2 font-medium">{product.nutritionalInfo.fat}g</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Customization Options Preview */}
            {product.customizationOptions && product.customizationOptions.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Customization Options Available</h4>
                <div className="space-y-2">
                  {product.customizationOptions.slice(0, 3).map((option) => (
                    <div key={option.name} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{option.name}</span>
                      <span className="text-xs text-gray-500">
                        {option.options.length} options
                      </span>
                    </div>
                  ))}
                  {product.customizationOptions.length > 3 && (
                    <p className="text-xs text-gray-500">
                      +{product.customizationOptions.length - 3} more options
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={() => setShowCustomization(true)}
                className="btn btn-primary w-full btn-lg"
                disabled={!product.isAvailable}
              >
                {product.isAvailable ? 'Customize & Add to Cart' : 'Currently Unavailable'}
              </button>
              
              {!product.isAvailable && (
                <p className="text-sm text-red-600 text-center">
                  This item is currently out of stock
                </p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Customization Modal */}
        {showCustomization && (
          <ProductCustomizationModal
            product={product}
            onClose={() => setShowCustomization(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;