const express = require('express');
const router = express.Router();
const { login } = require('../controllers/productController');

// @desc    Admin login
// @route   POST /api/auth/login
// @access  Public
router.post('/login', login);

module.exports = router;
