const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const auth = require('../middleware/auth');
const upload = require('../config/multer');

// ============================================
// IMPORTANT: Route Order Matters!
// ============================================
// Multer MUST run BEFORE auth middleware
// This ensures req.file is populated before authentication
// If auth runs first, it may block the request before file is processed
// ============================================

// Public routes
router.get('/', getProducts);
router.get('/:id', getProduct);

// ============================================
// CRITICAL: Multer runs FIRST, then auth runs
// This order ensures file upload works properly
// ============================================

// POST /api/products - Create new product with image
// Step 1: multer.single('image') processes the file FIRST
// Step 2: auth middleware verifies the token
// Step 3: createProduct controller handles the rest
router.post('/', upload.single('image'), auth, createProduct);

// PUT /api/products/:id - Update product with new image
router.put('/:id', upload.single('image'), auth, updateProduct);

// DELETE /api/products/:id - Delete product
router.delete('/:id', auth, deleteProduct);

module.exports = router;
