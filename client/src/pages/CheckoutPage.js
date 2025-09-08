import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  MapPinIcon,
  CreditCardIcon,
  CheckCircleIcon,
  ClockIcon,
  TruckIcon
} from '@heroicons/react/24/outline';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import axios from '../utils/axios';

const CheckoutPage = () => {
  const { items, getCartTotals, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const cartTotals = getCartTotals();

  const [currentStep, setCurrentStep] = useState(1);
  const [orderData, setOrderData] = useState({
    deliveryAddress: {
      type: 'home', // <-- ADDED: address type (home, office, work)
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
    paymentMethod: 'card',
  });
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    upiId: ''
  });
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [useSavedAddress, setUseSavedAddress] = useState(false);
  const [paymentErrors, setPaymentErrors] = useState({});

  useEffect(() => {
    if (user?.addresses) {
      setSavedAddresses(user.addresses);
      if (user.addresses.length > 0) {
        setUseSavedAddress(true);
        // ensure saved address has type fallback
        const firstAddr = {
          type: user.addresses[0].type || 'home',
          ...user.addresses[0]
        };
        setOrderData(prev => ({
          ...prev,
          deliveryAddress: firstAddr
        }));
      }
    }
  }, [user]);

  const steps = [
    { id: 1, name: 'Order Summary', icon: CheckCircleIcon },
    { id: 2, name: 'Delivery Address', icon: MapPinIcon },
    { id: 3, name: 'Payment', icon: CreditCardIcon }
  ];

  const handleInputChange = (section, field, value) => {
    setOrderData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // <-- ADDED: helper to set whole deliveryAddress object (used by saved address select)
  const handleSetDeliveryAddress = (address) => {
    // ensure address.type exists
    const addr = { type: address.type || 'home', ...address };
    setOrderData(prev => ({ ...prev, deliveryAddress: addr }));
  };

  const handlePaymentChange = (field, value) => {
    let formattedValue = value;

    // Format card number with spaces
    if (field === 'cardNumber') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').slice(0, 19);
    }

    // Format expiry date
    if (field === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(?=\d)/, '$1/').slice(0, 5);
    }

    // Format CVV (numbers only)
    if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }

    // Format cardholder name (alphabetic and spaces only)
    if (field === 'cardholderName') {
      formattedValue = value.replace(/[^a-zA-Z\s]/g, '');
    }

    setPaymentDetails(prev => ({
      ...prev,
      [field]: formattedValue
    }));

    // Clear field-specific errors when user starts typing
    if (paymentErrors[field]) {
      setPaymentErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Luhn algorithm for card validation
  const validateCardNumber = (cardNumber) => {
    const digits = cardNumber.replace(/\s/g, '');
    if (!/^\d{16}$/.test(digits)) return false;

    let sum = 0;
    let isEven = false;

    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits[i]);

      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  };

  // Validate expiry date is in future
  const validateExpiryDate = (expiryDate) => {
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) return false;

    const [month, year] = expiryDate.split('/');
    const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
    const now = new Date();
    const currentMonth = new Date(now.getFullYear(), now.getMonth());

    return expiry >= currentMonth;
  };

  const validateStep = (step) => {
    switch (step) {
      case 2:
        // ADDED: ensure address type selected
        if (!orderData.deliveryAddress.type) {
          toast.error('Please select address type.');
          return false;
        }

        const { street, city, state, zipCode } = orderData.deliveryAddress;
        if (!street.trim()) {
          toast.error('Street address is required.');
          return false;
        }
        if (!city.trim()) {
          toast.error('City is required.');
          return false;
        }
        if (!state.trim()) {
          toast.error('State is required.');
          return false;
        }
        if (!zipCode.trim() || !/^\d{6}$/.test(zipCode)) {
          toast.error('Valid 6-digit PIN code is required.');
          return false;
        }
        return true;
      case 3:
        if (orderData.paymentMethod === 'card') {
          const { cardNumber, expiryDate, cvv, cardholderName } = paymentDetails;
          const errors = {};

          if (!cardNumber.trim()) {
            errors.cardNumber = 'Card number is required.';
          } else if (!validateCardNumber(cardNumber)) {
            errors.cardNumber = 'Invalid card number. Please check and try again.';
          }

          if (!expiryDate.trim()) {
            errors.expiryDate = 'Expiry date is required.';
          } else if (!validateExpiryDate(expiryDate)) {
            errors.expiryDate = 'Invalid or expired date. Please enter a future date in MM/YY format.';
          }

          if (!cvv.trim()) {
            errors.cvv = 'CVV is required.';
          } else if (!/^\d{3}$/.test(cvv)) {
            errors.cvv = 'CVV must be exactly 3 digits.';
          }

          if (!cardholderName.trim()) {
            errors.cardholderName = 'Cardholder name is required.';
          } else if (!/^[a-zA-Z\s]+$/.test(cardholderName)) {
            errors.cardholderName = 'Cardholder name must contain only alphabetic characters.';
          }

          if (Object.keys(errors).length > 0) {
            setPaymentErrors(errors);
            toast.error('Please fix the payment details to continue.');
            return false;
          }
        }
        if (orderData.paymentMethod === 'upi') {
          if (!paymentDetails.upiId.trim()) {
            toast.error('UPI ID is required.');
            return false;
          }
          if (!/^[\w.-]+@[\w.-]+$/.test(paymentDetails.upiId)) {
            toast.error('Please enter a valid UPI ID.');
            return false;
          }
        }

        // Clear any previous errors if validation passes
        setPaymentErrors({});
        return true;
      default:
        return true;
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handlePlaceOrder = async () => {
    if (!validateStep(3)) {
      return;
    }

    const orderPayload = {
      items: items.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.basePrice,
        customizations: item.customizations
      })),
      totalAmount: cartTotals.total,
      shippingAddress: orderData.deliveryAddress, // <-- includes type now
      paymentDetails: {
        paymentMethod: orderData.paymentMethod,
        paymentStatus: 'Pending'
      }
    };

    try {
      console.log("Sending order payload:", orderPayload);
      const response = await axios.post('/api/orders', orderPayload);
      toast.success('Order placed successfully!');
      clearCart();
      navigate('/order-success', { state: { order: response.data } });
    } catch (error) {
      console.error('Order API error:', error.response?.data || error.message);
      toast.error('Failed to place order. Please try again.');
    }
  };

  if (items.length === 0) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50">
        <div className="container-mobile py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto"
          >
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h1>
            <p className="text-gray-600 mb-8">
              Add some items to your cart before proceeding to checkout.
            </p>
            <button
              onClick={() => navigate('/menu')}
              className="btn btn-primary btn-lg"
            >
              Browse Menu
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="container-mobile section-padding-sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-responsive-lg font-bold text-gray-900 mb-8 text-center">
            Checkout
          </h1>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-between items-center max-w-2xl mx-auto">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                    currentStep >= step.id
                      ? 'bg-primary-600 border-primary-600 text-white'
                      : 'border-gray-300 text-gray-400'
                  }`}>
                    <step.icon className="w-5 h-5" />
                  </div>
                  <div className="hidden sm:block ml-3">
                    <p className={`text-sm font-medium ${
                      currentStep >= step.id ? 'text-primary-600' : 'text-gray-400'
                    }`}>
                      {step.name}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`hidden sm:block w-16 h-0.5 ml-4 ${
                      currentStep > step.id ? 'bg-primary-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="card p-6 sm:p-8">
                {/* Step 1: Order Summary */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
                    <div className="space-y-4">
                      {items.map((item, index) => (
                        <div key={item.product?._id || index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                          <img
                            src={
                              item.product?.image
                                ? (item.product.image.startsWith('http')
                                    ? item.product.image
                                    : `${process.env.REACT_APP_IMAGE_URL || ''}${item.product.image}`)
                                : '/placeholder.png'
                            }
                            alt={item.product?.name || 'Product'}
                            className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900">{item.product?.name}</h3>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">
                              ₹{(item.product?.basePrice * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Delivery Address */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Delivery Address</h2>
                    {savedAddresses.length > 0 && (
                      <div className="mb-4">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={useSavedAddress}
                            onChange={(e) => setUseSavedAddress(e.target.checked)}
                            className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                          />
                          <span className="ml-2 text-gray-700">Use a saved address</span>
                        </label>
                      </div>
                    )}
                    {useSavedAddress ? (
                      <select
                        className="input"
                        defaultValue=""
                        onChange={(e) => {
                          if (!e.target.value) return;
                          handleSetDeliveryAddress(JSON.parse(e.target.value));
                        }}
                      >
                        <option value="" disabled>Select an address…</option>
                        {savedAddresses.map((address, index) => (
                          <option key={index} value={JSON.stringify(address)}>
                            {`${address.type ? address.type + ' – ' : ''}${address.street}, ${address.city}, ${address.state} ${address.zipCode}`}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="grid sm:grid-cols-2 gap-4">
                        {/* ADDED: Address Type select */}
                        <div>
                          <label className="label">Address Type *</label>
                          <select
                            className="input"
                            value={orderData.deliveryAddress.type}
                            onChange={(e) => handleInputChange('deliveryAddress', 'type', e.target.value)}
                          >
                            <option value="home">Home</option>
                            <option value="office">Office</option>
                            <option value="work">Work</option>
                          </select>
                        </div>

                        <div className="sm:col-span-2">
                          <label className="label">Street Address *</label>
                          <input
                            type="text"
                            className="input"
                            placeholder="Enter your street address"
                            value={orderData.deliveryAddress.street}
                            onChange={(e) => handleInputChange('deliveryAddress', 'street', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="label">City *</label>
                          <input
                            type="text"
                            className="input"
                            placeholder="City"
                            value={orderData.deliveryAddress.city}
                            onChange={(e) => handleInputChange('deliveryAddress', 'city', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="label">State *</label>
                          <input
                            type="text"
                            className="input"
                            placeholder="State"
                            value={orderData.deliveryAddress.state}
                            onChange={(e) => handleInputChange('deliveryAddress', 'state', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="label">PIN Code *</label>
                          <input
                            type="text"
                            className="input"
                            placeholder="PIN Code"
                            value={orderData.deliveryAddress.zipCode}
                            onChange={(e) => handleInputChange('deliveryAddress', 'zipCode', e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Step 3: Payment */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h2>

                    <div className="mb-6">
                      <div className="grid sm:grid-cols-3 gap-4">
                        <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          orderData.paymentMethod === 'card' ? 'border-primary-600 bg-primary-50' : 'border-gray-200'
                        }`}>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="card"
                            checked={orderData.paymentMethod === 'card'}
                            onChange={(e) => setOrderData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                            className="sr-only"
                          />
                          <CreditCardIcon className="w-6 h-6 text-gray-600 mr-3" />
                          <span className="font-medium">Credit/Debit Card</span>
                        </label>
                        <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          orderData.paymentMethod === 'upi' ? 'border-primary-600 bg-primary-50' : 'border-gray-200'
                        }`}>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="upi"
                            checked={orderData.paymentMethod === 'upi'}
                            onChange={(e) => setOrderData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                            className="sr-only"
                          />
                          <span className="w-6 h-6 bg-orange-500 rounded mr-3 flex items-center justify-center text-white text-xs font-bold">₹</span>
                          <span className="font-medium">UPI</span>
                        </label>
                        <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          orderData.paymentMethod === 'cod' ? 'border-primary-600 bg-primary-50' : 'border-gray-200'
                        }`}>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="cod"
                            checked={orderData.paymentMethod === 'cod'}
                            onChange={(e) => setOrderData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                            className="sr-only"
                          />
                          <span className="w-6 h-6 bg-green-500 rounded mr-3 flex items-center justify-center text-white text-xs font-bold">₹</span>
                          <span className="font-medium">Cash on Delivery</span>
                        </label>
                      </div>
                    </div>

                    {orderData.paymentMethod === 'card' && (
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <label className="label">Cardholder Name *</label>
                          <input
                            type="text"
                            className={`input ${paymentErrors.cardholderName ? 'border-red-500 focus:ring-red-500' : ''}`}
                            placeholder="Name on card"
                            value={paymentDetails.cardholderName}
                            onChange={(e) => handlePaymentChange('cardholderName', e.target.value)}
                          />
                          {paymentErrors.cardholderName && (
                            <p className="mt-1 text-sm text-red-600">{paymentErrors.cardholderName}</p>
                          )}
                        </div>
                        <div className="sm:col-span-2">
                          <label className="label">Card Number *</label>
                          <input
                            type="text"
                            className={`input ${paymentErrors.cardNumber ? 'border-red-500 focus:ring-red-500' : ''}`}
                            placeholder="1234 5678 9012 3456"
                            value={paymentDetails.cardNumber}
                            onChange={(e) => handlePaymentChange('cardNumber', e.target.value)}
                          />
                          {paymentErrors.cardNumber && (
                            <p className="mt-1 text-sm text-red-600">{paymentErrors.cardNumber}</p>
                          )}
                        </div>
                        <div>
                          <label className="label">Expiry Date *</label>
                          <input
                            type="text"
                            className={`input ${paymentErrors.expiryDate ? 'border-red-500 focus:ring-red-500' : ''}`}
                            placeholder="MM/YY"
                            value={paymentDetails.expiryDate}
                            onChange={(e) => handlePaymentChange('expiryDate', e.target.value)}
                          />
                          {paymentErrors.expiryDate && (
                            <p className="mt-1 text-sm text-red-600">{paymentErrors.expiryDate}</p>
                          )}
                        </div>
                        <div>
                          <label className="label">CVV *</label>
                          <input
                            type="text"
                            className={`input ${paymentErrors.cvv ? 'border-red-500 focus:ring-red-500' : ''}`}
                            placeholder="123"
                            value={paymentDetails.cvv}
                            onChange={(e) => handlePaymentChange('cvv', e.target.value)}
                          />
                          {paymentErrors.cvv && (
                            <p className="mt-1 text-sm text-red-600">{paymentErrors.cvv}</p>
                          )}
                        </div>
                      </div>
                    )}
                    {orderData.paymentMethod === 'upi' && (
                      <div>
                        <label className="label">UPI ID *</label>
                        <input
                          type="text"
                          className="input"
                          placeholder="yourname@upi"
                          value={paymentDetails.upiId}
                          onChange={(e) => handlePaymentChange('upiId', e.target.value)}
                        />
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <button
                    onClick={handlePreviousStep}
                    disabled={currentStep === 1}
                    className="btn btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>

                  {currentStep < 3 ? (
                    <button
                      onClick={handleNextStep}
                      className="btn btn-primary"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      onClick={handlePlaceOrder}
                      className="btn btn-primary"
                    >
                      Place Order
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>

                <div className="space-y-3 mb-6">
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
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total</span>
                      <span>₹{cartTotals.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <ClockIcon className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-900">Estimated Delivery</span>
                  </div>
                  <p className="text-blue-700 text-sm">30-45 minutes</p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg mt-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <TruckIcon className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-900">Free Delivery</span>
                  </div>
                  <p className="text-green-700 text-sm">On orders above ₹500</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CheckoutPage;
