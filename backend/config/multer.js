const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();
const siteConfig = require('./siteConfig');

// ============================================
// IMPORTANT: Ensure Cloudinary is configured before using
// The config sets up global config for cloudinary package
// ============================================
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ============================================
// Cloudinary Image Optimization
// Uses auto quality and format for optimal performance
// ============================================
const cloudinaryParams = {
  folder: siteConfig.shopNameShort.toLowerCase().replace(/\s+/g, '-'),
  allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
  transformation: [
    { width: 1200, height: 1200, crop: 'limit', quality: 'auto:best', fetch_format: 'auto' }
  ],
};

// ============================================
// Multer Storage with Cloudinary
// ============================================
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: cloudinaryParams,
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// ============================================
// Approach 2: Using memoryStorage (Manual Cloudinary upload)
// Uncomment below and use this instead of above for full control
// ============================================
/*
// Configure memory storage
const memoryStorage = multer.memoryStorage();

// Use memoryStorage
const uploadMemory = multer({
  storage: memoryStorage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Export function to upload buffer to Cloudinary manually
const uploadToCloudinary = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder || 'pappu-iron-works',
        public_id: options.publicId,
        transformation: options.transformation || [
          { width: 1200, height: 1200, crop: 'limit', quality: 'auto' }
        ],
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    stream.end(buffer);
  });
};

module.exports = { upload: uploadMemory, uploadToCloudinary };
*/

module.exports = upload;
