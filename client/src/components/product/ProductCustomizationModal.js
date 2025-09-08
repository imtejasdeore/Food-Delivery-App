import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XMarkIcon,
  PlusIcon,
  MinusIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import { useCart } from '../../contexts/CartContext';
import toast from 'react-hot-toast';

const ProductCustomizationModal = ({
  product,
  onClose,
  initialCustomizations = [],
  initialSpecialInstructions = '',
  onSave = null,
  isEditing = false
}) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [customizations, setCustomizations] = useState({});
  const [specialInstructions, setSpecialInstructions] = useState(initialSpecialInstructions);
  const initializedRef = useRef(false);

  // Memoize product properties to prevent unnecessary re-renders
  const productId = product?.id;
  const productBasePrice = product?.basePrice || 0;
  const productDiscount = product?.discount || 0;
  const customizationOptions = useMemo(() => product?.customizationOptions || [], [product?.customizationOptions]);

  // Initialize customizations only once when modal opens
  useEffect(() => {
    // Prevent re-initialization if already done for this product
    if (initializedRef.current && customizations && Object.keys(customizations).length > 0) {
      return;
    }

    const initializeCustomizations = () => {
      const state = {};
      
      if (initialCustomizations.length > 0) {
        // Load from existing customizations (editing mode)
        initialCustomizations.forEach(customization => {
          const option = customizationOptions.find(
            opt => opt.name === customization.optionName
          );
          if (option) {
            if (option.type === 'single') {
              const selectedValue = customization.selectedValues?.[0];
              if (selectedValue) {
                state[option.name] = selectedValue.name;
              }
            } else {
              state[option.name] = customization.selectedValues?.map(v => v.name) || [];
            }
          }
        });
      } else {
        // Set defaults for new customization - all options selected by default
        customizationOptions.forEach(option => {
          if (option.type === 'single') {
            const defaultOption = option.options.find(opt => opt.isDefault);
            if (defaultOption) {
              state[option.name] = defaultOption.name;
            } else if (option.options.length > 0) {
              state[option.name] = option.options[0].name;
            }
          } else {
            // For multiple selection, select all options by default
            state[option.name] = option.options.map(opt => opt.name);
          }
        });
      }
      
      return state;
    };

    setCustomizations(initializeCustomizations());
    initializedRef.current = true;
  }, [productId, customizationOptions, initialCustomizations, customizations]);

  // Memoize total price calculation
  const totalPrice = useMemo(() => {
    let price = productBasePrice;
    
    customizationOptions.forEach(option => {
      const selectedValues = customizations[option.name];
      
      if (option.type === 'single' && selectedValues) {
        const selectedOption = option.options.find(opt => opt.name === selectedValues);
        if (selectedOption) {
          price += selectedOption.price || 0;
        }
      } else if (option.type === 'multiple' && Array.isArray(selectedValues)) {
        selectedValues.forEach(valueName => {
          const selectedOption = option.options.find(opt => opt.name === valueName);
          if (selectedOption) {
            price += selectedOption.price || 0;
          }
        });
      }
    });

    // Apply discount if any
    if (productDiscount > 0) {
      price = price * (1 - productDiscount / 100);
    }

    return price;
  }, [customizations, productBasePrice, productDiscount, customizationOptions]);

  const handleSingleSelection = useCallback((optionName, valueName) => {
    setCustomizations(prev => ({
      ...prev,
      [optionName]: valueName
    }));
  }, []);

  const handleMultipleSelection = useCallback((optionName, valueName) => {
    setCustomizations(prev => {
      const currentValues = prev[optionName] || [];
      const isSelected = currentValues.includes(valueName);
      
      return {
        ...prev,
        [optionName]: isSelected
          ? currentValues.filter(v => v !== valueName)
          : [...currentValues, valueName]
      };
    });
  }, []);

  const formatCustomizationsForCart = () => {
    return product.customizationOptions?.map(option => {
      const selectedValues = customizations[option.name];
      
      if (option.type === 'single' && selectedValues) {
        const selectedOption = option.options.find(opt => opt.name === selectedValues);
        return {
          optionName: option.name,
          selectedValues: selectedOption ? [{
            name: selectedOption.name,
            price: selectedOption.price || 0
          }] : [],
          totalPrice: selectedOption?.price || 0
        };
      } else if (option.type === 'multiple' && Array.isArray(selectedValues)) {
        const selectedOptions = selectedValues.map(valueName => {
          const opt = option.options.find(o => o.name === valueName);
          return opt ? { name: opt.name, price: opt.price || 0 } : null;
        }).filter(Boolean);
        
        return {
          optionName: option.name,
          selectedValues: selectedOptions,
          totalPrice: selectedOptions.reduce((sum, opt) => sum + opt.price, 0)
        };
      }
      
      return null;
    }).filter(Boolean) || [];
  };

  const validateSelections = () => {
    const errors = [];
    
    product.customizationOptions?.forEach(option => {
      if (option.required) {
        const selectedValues = customizations[option.name];
        
        if (option.type === 'single' && !selectedValues) {
          errors.push(`Please select ${option.name}`);
        } else if (option.type === 'multiple' && (!selectedValues || selectedValues.length === 0)) {
          errors.push(`Please select at least one ${option.name}`);
        }
      }
    });
    
    return errors;
  };

  const handleAddToCart = () => {
    const errors = validateSelections();
    if (errors.length > 0) {
      errors.forEach(error => toast.error(error));
      return;
    }

    const formattedCustomizations = formatCustomizationsForCart();
    
    if (isEditing && onSave) {
      onSave(formattedCustomizations, specialInstructions);
    } else {
      addToCart(product, quantity, formattedCustomizations, specialInstructions);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-screen items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 100 }}
            className="relative bg-white rounded-t-2xl sm:rounded-2xl shadow-xl w-full sm:max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
              <div className="flex-1 min-w-0">
                <h2 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">
                  {isEditing ? 'Edit' : 'Customize'} {product.name}
                </h2>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">
                  Base Price: ₹{product.basePrice}
                  {product.discount > 0 && (
                    <span className="ml-2 text-green-600 font-medium">
                      {product.discount}% OFF
                    </span>
                  )}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0 ml-2"
              >
                <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1">
              {/* Product Image and Description */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full sm:w-24 h-32 sm:h-24 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {product.description}
                  </p>
                  {product.allergens && product.allergens.length > 0 && (
                    <div className="mt-2 flex items-center space-x-1">
                      <InformationCircleIcon className="w-4 h-4 text-amber-500" />
                      <span className="text-xs text-amber-600">
                        Contains: {product.allergens.join(', ')}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Customization Options */}
              {product.customizationOptions && product.customizationOptions.length > 0 ? (
                <div className="space-y-6">
                  {product.customizationOptions.map((option) => (
                    <div key={option.name} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900">
                          {option.name}
                          {option.required && (
                            <span className="text-red-500 ml-1">*</span>
                          )}
                        </h3>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {option.type === 'single' ? 'Choose one' : 'Choose multiple'}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {option.options.map((optionValue) => {
                          const isSelected = option.type === 'single'
                            ? customizations[option.name] === optionValue.name
                            : customizations[option.name]?.includes(optionValue.name);

                          return (
                            <label
                              key={optionValue.name}
                              className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all ${
                                isSelected
                                  ? 'border-primary-500 bg-primary-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-center space-x-3">
                                <input
                                  type={option.type === 'single' ? 'radio' : 'checkbox'}
                                  name={option.name}
                                  checked={isSelected}
                                  onChange={() => {
                                    if (option.type === 'single') {
                                      handleSingleSelection(option.name, optionValue.name);
                                    } else {
                                      handleMultipleSelection(option.name, optionValue.name);
                                    }
                                  }}
                                  className="text-primary-600 focus:ring-primary-500"
                                />
                                <span className="font-medium text-gray-900">
                                  {optionValue.name}
                                </span>
                              </div>
                              {optionValue.price > 0 && (
                                <span className="text-primary-600 font-medium">
                                  +₹{optionValue.price}
                                </span>
                              )}
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No customization options available for this item.
                </div>
              )}

              {/* Special Instructions */}
              <div className="mt-6">
                <label className="label">
                  Special Instructions (Optional)
                </label>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Any special requests or dietary requirements..."
                  className="input resize-none h-20"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-4 sm:p-6 flex-shrink-0 bg-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 space-y-3 sm:space-y-0">
                {!isEditing && (
                  <div className="flex items-center justify-center sm:justify-start space-x-3">
                    <span className="text-gray-700 font-medium text-sm sm:text-base">Quantity:</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors btn-touch"
                      >
                        <MinusIcon className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors btn-touch"
                      >
                        <PlusIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                <div className="text-center sm:text-right">
                  <div className="text-sm text-gray-600">
                    {isEditing ? 'Price per item' : 'Total Price'}
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-primary-600">
                    ₹{(isEditing ? totalPrice : totalPrice * quantity).toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <button
                  onClick={onClose}
                  className="btn btn-outline flex-1 btn-touch"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddToCart}
                  className="btn btn-primary flex-1 btn-touch"
                >
                  {isEditing ? 'Update Item' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default ProductCustomizationModal;