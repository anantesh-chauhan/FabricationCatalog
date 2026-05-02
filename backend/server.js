require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const siteConfig = require('./config/siteConfig');

// ============================================
// ⚠️ CRITICAL: Import cloudinary config BEFORE using multer
// This ensures Cloudinary is configured before multer-storage-cloudinary uses it
// ============================================
require('./config/cloudinary');

const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// ============================================
// CORS - Must be first
// ============================================
app.use(cors());

// ============================================
// Body Parsers - For JSON and URL-encoded data
// Multer will handle multipart form data specifically
// ============================================
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ============================================
// Serve Frontend Static Files (Production)
// ============================================
const frontendDistPath = path.resolve(__dirname, '../frontend/dist');
app.use(express.static(frontendDistPath));

// ============================================
// Routes - Multer already has Cloudinary configured
// ============================================
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: `${siteConfig.shopName} API is running` });
});

// ============================================
// SPA Fallback Route - Serve index.html for all non-API routes
// This ensures refresh works on any route
// ============================================
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
});

// ============================================
// Error Handling Middleware (must be last)
// ============================================
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`✅ ${siteConfig.shopName} API running on port ${PORT}`);
});
