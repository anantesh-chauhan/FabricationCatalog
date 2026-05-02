const mongoose = require('mongoose');

// ============================================
// Product Schema
// @desc    Product model for the fabrication shop
// ============================================
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Product title is required'],
    maxlength: [100, 'Title cannot exceed 100 characters'],
    trim: true
  },
  // Support for single image (backward compatible) or multiple images
  imageUrl: {
    type: String,
    required: [true, 'Product image is required']
  },
  images: {
    type: [String],
    default: []
  },
  description: {
    type: String,
    maxlength: [1000, 'Description cannot exceed 1000 characters'],
    default: ''
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['gates', 'grill', 'railings', 'aluminum', 'doors', 'windows', 'other'],
      message: 'Category must be one of: gates, grill, railings, aluminum, doors, windows, other'
    }
  },
  // Additional fields for better product management
  isFeatured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  // Tags for better search
  tags: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
productSchema.index({ category: 1, createdAt: -1 });
productSchema.index({ title: 'text', description: 'text' });

// Pre-save middleware to update timestamp
productSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Product', productSchema);
