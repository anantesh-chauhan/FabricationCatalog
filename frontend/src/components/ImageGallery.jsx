import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ImageGallery.css';

// ============================================
// ImageGallery Component
// @desc    Display main image with thumbnail selection
// @props   images - array of image URLs (falls back to single imageUrl)
// ============================================

const thumbnailVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.3
    }
  })
};

function ImageGallery({ product }) {
  // Handle both multiple images array and single imageUrl
  const images = product.images && product.images.length > 0 
    ? product.images 
    : [product.imageUrl];
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const selectedImage = images[selectedIndex];

  const handleThumbnailClick = (index) => {
    setSelectedIndex(index);
    setImageLoaded(false);
    setImageError(false);
  };

  return (
    <div className="image-gallery">
      {/* Main Image */}
      <div className="image-gallery-main">
        {!imageLoaded && !imageError && (
          <div className="image-gallery-loading">
            <div className="loading-spinner"></div>
          </div>
        )}
        
        <AnimatePresence mode="wait">
          {imageError ? (
            <motion.div 
              className="image-gallery-error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span>Image not available</span>
            </motion.div>
          ) : (
            <motion.img
              key={selectedIndex}
              src={selectedImage}
              alt={`${product.title} - Image ${selectedIndex + 1}`}
              className={`image-gallery-main-img ${imageLoaded ? 'loaded' : ''}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: imageLoaded ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Thumbnails - Only show if more than 1 image */}
      {images.length > 1 && (
        <div className="image-gallery-thumbnails">
          {images.map((image, index) => (
            <motion.button
              key={index}
              className={`image-gallery-thumbnail ${
                index === selectedIndex ? 'active' : ''
              }`}
              onClick={() => handleThumbnailClick(index)}
              custom={index}
              variants={thumbnailVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img 
                src={image} 
                alt={`Thumbnail ${index + 1}`}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
                }}
              />
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageGallery;
