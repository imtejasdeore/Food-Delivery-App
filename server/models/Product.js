const mongoose = require('mongoose');

const customizationOptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['single', 'multiple'],
    required: true
  },
  required: {
    type: Boolean,
    default: false
  },
  options: [{
    name: String,
    price: {
      type: Number,
      default: 0
    },
    isDefault: {
      type: Boolean,
      default: false
    }
  }]
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Pizza', 'Burgers', 'Fries', 'Beverages', 'Combos', 'Desserts']
  },
  basePrice: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    required: true
  },
  images: [String], // Additional images
  isVegetarian: {
    type: Boolean,
    default: false
  },
  isVegan: {
    type: Boolean,
    default: false
  },
  allergens: [String],
  nutritionalInfo: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    fiber: Number
  },
  customizationOptions: [customizationOptionSchema],
  isAvailable: {
    type: Boolean,
    default: true
  },
  preparationTime: {
    type: Number, // in minutes
    default: 15
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  tags: [String], // e.g., 'spicy', 'popular', 'new'
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  }
}, {
  timestamps: true
});

// Index for search functionality
productSchema.index({ name: 'text', description: 'text', category: 'text' });

// Virtual for discounted price
productSchema.virtual('discountedPrice').get(function() {
  return this.basePrice * (1 - this.discount / 100);
});

// Ensure virtual fields are serialized
productSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Product', productSchema);