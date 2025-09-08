import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrashIcon, 
  PencilIcon, 
  MinusIcon, 
  PlusIcon,
  ShoppingBagIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import ProductCustomizationModal from '../components/product/ProductCustomizationModal';
import SimilarItems from '../components/cart/SimilarItems';
import toast from 'react-hot-toast';

const CartPage = () => {
  const { 
    items, 
    updateCartItem, 
    removeFromCart, 
    clearCart, 
    isCartEmpty, 
    calculateItemPrice, 
    getCartTotals
  } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [customizationModal, setCustomizationModal] = useState({
    isOpen: false,
    item: null
  });

  const cartTotals = getCartTotals();

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }
    
    const item = items.find(i => i.id === itemId);
    updateCartItem(itemId, newQuantity, item.customizations, item.specialInstructions);
  };

  const handleEditCustomization = (item) => {
    setCustomizationModal({
      isOpen: true,
      item
    });
  };

  const handleCustomizationUpdate = (customizations, specialInstructions) => {
    const { item } = customizationModal;
    updateCartItem(item.id, item.quantity, customizations, specialInstructions);
    setCustomizationModal({ isOpen: false, item: null });
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error('Please login to proceed with checkout');
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }
    navigate('/checkout');
  };

  if (isCartEmpty()) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50">
        <div className="container-custom py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto"
          >
            <ShoppingBagIcon className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet. 
              Start browsing our delicious menu!
            </p>
            <Link
              to="/menu"
              className="btn btn-primary btn-lg"
            >
              Browse Menu
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Shopping Cart
          </h1>
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="card p-6"
                >
                  <div className="flex items-start space-x-4">
                    {/* Product Image */}
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                    />

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg">
                            {item.product.name}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {item.product.category}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 p-1 transition-colors"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Customization Summary */}
                      <div className="mb-4">
                        <div className="bg-gray-50 rounded-lg p-3 mb-2">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">
                              Customizations:
                            </span>
                            <button
                              onClick={() => handleEditCustomization(item)}
                              className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center space-x-1 transition-colors"
                            >
                              <PencilIcon className="w-4 h-4" />
                              <span>Edit</span>
                            </button>
                          </div>
                          
                          {item.customizations && item.customizations.length > 0 ? (
                            <div className="space-y-1">
                              {item.customizations.map((customization, index) => (
                                <div key={index} className="text-sm text-gray-600">
                                  <span className="font-medium">
                                    {customization.optionName}:
                                  </span>
                                  <span className="ml-1">
                                    {customization.selectedValues?.map(v => v.name).join(', ')}
                                  </span>
                                  {customization.totalPrice > 0 && (
                                    <span className="ml-2 text-primary-600 font-medium">
                                      +₹{customization.totalPrice}
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500">No customizations</p>
                          )}
                        </div>

                        {/* Special Instructions */}
                        {item.specialInstructions && (
                          <div className="bg-blue-50 rounded-lg p-3">
                            <span className="text-sm font-medium text-blue-700">
                              Special Instructions:
                            </span>
                            <p className="text-sm text-blue-600 mt-1">
                              {item.specialInstructions}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Quantity and Price */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-gray-600">Quantity:</span>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                            >
                              <MinusIcon className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                            >
                              <PlusIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">
                            ₹{(calculateItemPrice(item) * item.quantity).toFixed(2)}
                          </div>
                          <div className="text-sm text-gray-500">
                            ₹{calculateItemPrice(item).toFixed(2)} each
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartTotals.itemCount} items)</span>
                  <span>₹{cartTotals.subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>
                    {cartTotals.deliveryFee === 0 ? (
                      <span className="text-green-600 font-medium">FREE</span>
                    ) : (
                      `₹${cartTotals.deliveryFee.toFixed(2)}`
                    )}
                  </span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Tax (5%)</span>
                  <span>₹{cartTotals.tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>₹{cartTotals.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {cartTotals.subtotal < 500 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-yellow-800">
                    Add ₹{(500 - cartTotals.subtotal).toFixed(2)} more for free delivery!
                  </p>
                </div>
              )}

              <button
                onClick={handleCheckout}
                className="btn btn-primary w-full btn-lg group"
              >
                Proceed to Checkout
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>

              <Link
                to="/menu"
                className="block text-center text-primary-600 hover:text-primary-700 font-medium mt-4 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>

        {/* Similar Items Section */}
        <SimilarItems currentItems={items} />
      </div>

      {/* Customization Modal */}
      {customizationModal.isOpen && (
        <ProductCustomizationModal
          product={customizationModal.item.product}
          initialCustomizations={customizationModal.item.customizations}
          initialSpecialInstructions={customizationModal.item.specialInstructions}
          onClose={() => setCustomizationModal({ isOpen: false, item: null })}
          onSave={handleCustomizationUpdate}
          isEditing={true}
        />
      )}
    </div>
  );
};

export default CartPage;