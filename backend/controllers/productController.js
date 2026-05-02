const Product = require('../models/Product');
const User = require('../models/User');
const cloudinary = require('cloudinary').v2;

// ============================================
// @desc    Get all products
// @route   GET /api/products
// @access  Public
// ============================================
const getProducts = async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};
    
    if (category && category !== 'all') {
      query.category = category.toLowerCase();
    }
    
    const products = await Product.find(query).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============================================
// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
// ============================================
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============================================
// @desc    Create new product with image upload
// @route   POST /api/products
// @access  Private (Admin)
// ============================================
const createProduct = async (req, res) => {
  try {
    // ============================================
// DEBUG: Log incoming request data
// IMPORTANT: This helps debug upload issues
// ============================================
console.log('📤 POST /api/products - Create Product');
console.log('📋 req.body:', req.body);
console.log('📎 req.file:', req.file ? {
  fieldname: req.file.fieldname,
  originalname: req.file.originalname,
  mimetype: req.file.mimetype,
  size: req.file.size,
  path: req.file.path
} : 'NO FILE UPLOADED');

// Validate required fields
const { title, category } = req.body;

// Check if image was uploaded
if (!req.file) {
  console.error('❌ No file uploaded!');
  return res.status(400).json({ message: 'Product image is required' });
}

// Validate title and category
if (!title || title.trim() === '') {
  console.error('❌ Title is missing!');
  return res.status(400).json({ message: 'Product title is required' });
}

if (!category || category.trim() === '') {
  console.error('❌ Category is missing!');
  return res.status(400).json({ message: 'Category is required' });
}

// Get the image URL from Cloudinary response
// multer-storage-cloudinary automatically uploads to Cloudinary
const imageUrl = req.file.path;
console.log('🖼️ Cloudinary image URL:', imageUrl);

// Create product in MongoDB
const product = await Product.create({
  title: title.trim(),
  imageUrl,
  category: category.toLowerCase().trim()
});

console.log('✅ Product saved:', product._id);
res.status(201).json(product);
  } catch (error) {
    console.error('❌ Error creating product:', error.message);
    res.status(400).json({ message: error.message });
  }
};

// ============================================
// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (Admin)
// ============================================
const updateProduct = async (req, res) => {
  try {
    const { title, imageUrl, category } = req.body;
    
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    product.title = title || product.title;
    product.category = category ? category.toLowerCase() : product.category;
    
    // If new image uploaded, update imageUrl and delete old one from Cloudinary
    if (req.file) {
      // Delete old image from Cloudinary
      const publicId = product.imageUrl.split('/').pop().split('.')[0];
      try {
        await cloudinary.uploader.destroy(`pappu-iron-works/${publicId}`);
      } catch (err) {
        console.error('Error deleting old image:', err);
      }
      
      product.imageUrl = req.file.path;
    } else {
      product.imageUrl = imageUrl || product.imageUrl;
    }
    
    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ============================================
// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (Admin)
// ============================================
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Delete image from Cloudinary
    if (product.imageUrl && product.imageUrl.includes('cloudinary')) {
      const publicId = product.imageUrl.split('/').pop().split('.')[0];
      try {
        await cloudinary.uploader.destroy(`pappu-iron-works/${publicId}`);
      } catch (err) {
        console.error('Error deleting image from Cloudinary:', err);
      }
    }
    
    await product.deleteOne();
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============================================
// @desc    Login admin
// @route   POST /api/auth/login
// @access  Public
// ============================================
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // First, try to authenticate against database users
    const user = await User.findOne({ 
      $or: [{ username: username }, { username: username.toLowerCase() }]
    });
    
    if (user && await user.matchPassword(password)) {
      const token = require('jsonwebtoken').sign(
        { id: user._id, username: user.username, role: user.role },
        process.env.JWT_SECRET || 'pappu_iron_works_secret_key',
        { expiresIn: '24h' }
      );
      
      res.status(200).json({
        token,
        user: { id: user._id, username: user.username, role: user.role }
      });
    } 
    // Fallback to ENV credentials for backward compatibility
    else if (username === 'admin' && password === process.env.ADMIN_PASSWORD) {
      const token = require('jsonwebtoken').sign(
        { id: 'admin', username, role: 'admin' },
        process.env.JWT_SECRET || 'pappu_iron_works_secret_key',
        { expiresIn: '24h' }
      );
      
      res.status(200).json({
        token,
        user: { id: 'admin', username: 'admin', role: 'admin' }
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  login
};
