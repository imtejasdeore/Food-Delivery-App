const mongoose = require('mongoose');

const orderTrackingSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  trackingNumber: {
    type: String,
    required: true,
    unique: true
  },
  currentStatus: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  statusHistory: [{
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'],
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    location: String,
    notes: String,
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  estimatedDeliveryTime: Date,
  actualDeliveryTime: Date,
  deliveryAddress: {
    type: {
      type: String,
      enum: ['home', 'office', 'work'],
      default: 'home'
    },
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  deliveryPerson: {
    name: String,
    phone: String,
    vehicleNumber: String
  },
  specialInstructions: String,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Generate tracking number before saving
orderTrackingSchema.pre('save', function(next) {
  if (!this.trackingNumber) {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    this.trackingNumber = `FD${timestamp}${random}`;
  }
  next();
});

// Add status to history when status changes
orderTrackingSchema.pre('save', function(next) {
  if (this.isModified('currentStatus') && !this.isNew) {
    this.statusHistory.push({
      status: this.currentStatus,
      timestamp: new Date()
    });
  }
  next();
});

orderTrackingSchema.methods.updateStatus = function(newStatus, notes = '', updatedBy = null, location = '') {
  this.currentStatus = newStatus;
  this.statusHistory.push({
    status: newStatus,
    timestamp: new Date(),
    notes,
    location,
    updatedBy
  });

  if (newStatus === 'Delivered') {
    this.actualDeliveryTime = new Date();
  }

  return this.save();
};

orderTrackingSchema.methods.getCurrentTrackingInfo = function() {
  const latestStatus = this.statusHistory[this.statusHistory.length - 1];
  return {
    trackingNumber: this.trackingNumber,
    currentStatus: this.currentStatus,
    lastUpdate: latestStatus ? latestStatus.timestamp : this.createdAt,
    estimatedDelivery: this.estimatedDeliveryTime,
    statusHistory: this.statusHistory
  };
};

module.exports = mongoose.model('OrderTracking', orderTrackingSchema);
