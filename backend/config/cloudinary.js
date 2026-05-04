const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config();

// ============================================
// Cloudinary Configuration
// Must be configured before using multer-storage-cloudinary
// ============================================
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ============================================
// PRODUCTION ENV VALIDATION (CRITICAL)
// ============================================
const requiredEnvVars = ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('🚨 ❌ PRODUCTION ISSUE: Missing Cloudinary env vars:', missingVars.join(', '));
  console.error('💡 Add to Render.com Environment Variables immediately!');
  console.error('🛑 Image uploads will FAIL without these vars');
} else {
  console.log('✅ Cloudinary env vars validated');
}

// Test connection on startup
cloudinary.api.ping((error, result) => {
  if (error) {
    console.error('❌ Cloudinary connection error:', error.message);
    if (process.env.NODE_ENV === 'production') {
      console.error('🚨 PRODUCTION ALERT: Check CLOUDINARY_* env vars on Render.com');
    }
  } else {
    console.log('✅ Cloudinary connected successfully');
  }
});

module.exports = cloudinary;
