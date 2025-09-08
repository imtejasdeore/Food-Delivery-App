const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  customizations: [{
    name: String,
    option: String,
    price: Number,
  }],
});

const paymentDetailsSchema = new mongoose.Schema({
  paymentMethod: {
    type: String,
    enum: ['card', 'upi', 'cod'],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed', 'Refunded'],
    default: 'Pending',
  },
  transactionId: String,
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true,
  },
  shippingAddress: {
    type: {
      type: String,
      enum: ['home', 'office', 'work'],
      default: 'home',
    },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
  paymentDetails: paymentDetailsSchema,
}, {
  timestamps: true,
});

module.exports = mongoose.model('Order', orderSchema);
