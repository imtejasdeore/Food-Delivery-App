import React, { createContext, useContext, useReducer, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload
      };
    
    case 'ADD_ITEM': {
      const { product, quantity, customizations, specialInstructions } = action.payload;
      
      // Create unique item ID based on product and customizations
      const customizationKey = JSON.stringify(customizations?.sort() || []);
      const itemId = `${product._id}_${customizationKey}`;
      
      const existingItemIndex = state.items.findIndex(item => item.id === itemId);
      
      let newItems;
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        newItems = state.items.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        const newItem = {
          id: itemId,
          product,
          quantity,
          customizations: customizations || [],
          specialInstructions: specialInstructions || '',
          addedAt: new Date().toISOString()
        };
        newItems = [...state.items, newItem];
      }
      
      return {
        ...state,
        items: newItems
      };
    }
    
    case 'UPDATE_ITEM': {
      const { itemId, quantity, customizations, specialInstructions } = action.payload;
      
      const newItems = state.items.map(item => 
        item.id === itemId 
          ? { 
              ...item, 
              quantity,
              customizations: customizations !== undefined ? customizations : item.customizations,
              specialInstructions: specialInstructions !== undefined ? specialInstructions : item.specialInstructions
            }
          : item
      );
      
      return {
        ...state,
        items: newItems
      };
    }
    
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: newItems
      };
    }
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };
    
    case 'UPDATE_ITEM_CUSTOMIZATION': {
      const { itemId, customizations } = action.payload;
      
      // Create new item ID with updated customizations
      const item = state.items.find(i => i.id === itemId);
      if (!item) return state;
      
      const customizationKey = JSON.stringify(customizations?.sort() || []);
      const newItemId = `${item.product._id}_${customizationKey}`;
      
      // Check if item with new customizations already exists
      const existingItemIndex = state.items.findIndex(i => i.id === newItemId && i.id !== itemId);
      
      let newItems;
      if (existingItemIndex >= 0) {
        // Merge with existing item
        newItems = state.items
          .filter(i => i.id !== itemId)
          .map((i, index) => 
            index === existingItemIndex 
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          );
      } else {
        // Update current item
        newItems = state.items.map(i => 
          i.id === itemId 
            ? { ...i, id: newItemId, customizations }
            : i
        );
      }
      
      return {
        ...state,
        items: newItems
      };
    }
    
    default:
      return state;
  }
};

// Initial state
const initialState = {
  items: []
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        if (Array.isArray(cartItems)) {
          dispatch({ type: 'LOAD_CART', payload: cartItems });
        }
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(state.items));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [state]);

  // Calculate item price with customizations
  const calculateItemPrice = (item) => {
    let basePrice = item.product.basePrice;
    let customizationPrice = 0;

    if (item.customizations && item.customizations.length > 0) {
      item.customizations.forEach(customization => {
        if (customization.selectedValues) {
          customization.selectedValues.forEach(value => {
            customizationPrice += value.price || 0;
          });
        }
      });
    }

    // Apply product discount if any
    let totalPrice = basePrice + customizationPrice;
    if (item.product.discount > 0) {
      totalPrice = totalPrice * (1 - item.product.discount / 100);
    }

    return totalPrice;
  };

  // Calculate cart totals
  const getCartTotals = () => {
    const subtotal = state.items.reduce((total, item) => {
      return total + (calculateItemPrice(item) * item.quantity);
    }, 0);

    const deliveryFee = subtotal < 500 ? 50 : 0; // Free delivery above ₹500
    const tax = subtotal * 0.05; // 5% tax
    const total = subtotal + deliveryFee + tax;

    return {
      subtotal: Math.round(subtotal * 100) / 100,
      deliveryFee,
      tax: Math.round(tax * 100) / 100,
      total: Math.round(total * 100) / 100,
      itemCount: state.items.reduce((count, item) => count + item.quantity, 0)
    };
  };

  // Add item to cart
  const addToCart = (product, quantity = 1, customizations = [], specialInstructions = '') => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        product,
        quantity,
        customizations,
        specialInstructions
      }
    });
    
    toast.success('Item added to cart!');
  };

  // Update item in cart
  const updateCartItem = (itemId, quantity, customizations, specialInstructions) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    dispatch({
      type: 'UPDATE_ITEM',
      payload: {
        itemId,
        quantity,
        customizations,
        specialInstructions
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: itemId
    });
    
    toast.success('Item removed from cart');
  };

  // Clear entire cart
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast.success('Cart cleared');
  };

  // Update item customizations (for re-customization)
  const updateItemCustomization = (itemId, customizations) => {
    dispatch({
      type: 'UPDATE_ITEM_CUSTOMIZATION',
      payload: {
        itemId,
        customizations
      }
    });
    
    toast.success('Item customization updated!');
  };

  // Get item by ID
  const getCartItem = (itemId) => {
    return state.items.find(item => item.id === itemId);
  };

  // Check if cart is empty
  const isCartEmpty = () => {
    return state.items.length === 0;
  };

  // Get formatted customization summary for display
  const getCustomizationSummary = (customizations) => {
    if (!customizations || customizations.length === 0) {
      return 'No customizations';
    }

    return customizations.map(customization => {
      const values = customization.selectedValues?.map(v => v.name).join(', ') || '';
      return `${customization.optionName}: ${values}`;
    }).join(' | ');
  };

  const value = {
    items: state.items,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    updateItemCustomization,
    getCartItem,
    isCartEmpty,
    calculateItemPrice,
    getCartTotals,
    getCustomizationSummary
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;