import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ProductCard.css';

// WhatsApp phone number - updated to new number
const WHATSAPP_PHONE = '917317289139';

// Spring animation variants for natural feel
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      delay: i * 0.08,
    },
  }),
};

const imageVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.08 },
};

const buttonVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
};

function ProductCard({ product, onDelete, showDelete = false, isDeleting = false, index = 0 }) {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Handle click on card to navigate to product detail
  const handleCardClick = (e) => {
    // Don't navigate if clicking on buttons
    if (e.target.closest('.btn')) return;
    navigate(`/product/${product._id}`);
  };

  // Handle WhatsApp share with dynamic message including product name and URL
  const handleWhatsAppShare = (e) => {
    e.stopPropagation();
    
    // Get current origin for product URL
    const baseUrl = window.location.origin;
    const productUrl = `${baseUrl}/product/${product._id}`;
    
    // Dynamic message with product name and URL
    const message = `Hi, I am interested in this design: ${product.title}\nView here: ${productUrl}`;
    const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  const getCategoryLabel = (category) => {
    const labels = {
      gates: 'Gates',
      grill: 'Grill',
      railings: 'Railings',
      aluminum: 'Aluminum',
      doors: 'Doors/Windows',
      other: 'Other',
    };
    return labels[category] || category;
  };

  // Fallback image for when image fails
  const handleImageError = (e) => {
    setImageError(true);
    e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
  };

  return (
    <motion.article 
      className="product-card"
      initial="hidden"
      animate="visible"
      whileHover="hover"
      custom={index}
      variants={cardVariants}
      layout
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
    >
      {/* Image */}
      <motion.div 
        className="product-image-container"
        variants={imageVariants}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {!imageLoaded && !imageError && (
          <div className="product-image-loading">
            <div className="loading-spinner"></div>
          </div>
        )}
        {imageError ? (
          <div className="product-image-error">
            <span>Image not available</span>
          </div>
        ) : (
          <img
            src={product.imageUrl}
            alt={product.title}
            className={`product-image ${imageLoaded ? 'loaded' : ''}`}
            onLoad={() => setImageLoaded(true)}
            onError={handleImageError}
          />
        )}
        <motion.div 
          className="product-category-badge"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 + index * 0.08 }}
        >
          {getCategoryLabel(product.category)}
        </motion.div>
        
        {/* Overlay on hover */}
        <motion.div 
          className="product-overlay"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Content */}
      <div className="product-content">
        <motion.h3 
          className="product-title"
          whileHover={{ color: 'var(--color-primary)' }}
          transition={{ duration: 0.2 }}
        >
          {product.title}
        </motion.h3>
        
        <div className="product-actions">
          <motion.button 
            className="btn btn-whatsapp"
            onClick={handleWhatsAppShare}
            aria-label="Share on WhatsApp"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.149-.099.45-.497.6-.737.198-.297.773-.985.854-1.165.174-.298.347-.496.69-.596.347-.099.694-.074.99-.024.297.05 1.805.446 2.444.993.639.548 1.063 1.445 1.063 1.445s.546 1.097.62 1.16c.074.063.27.198.645.099zm-3.94-1.146c.16-.01.32-.01.48-.01.07 0 .14.005.21.005.178 0 .357.003.536.003.06 0 .12-.003.18-.005.297-.024.595-.098.856-.298.261-.199.507-.463.707-.767.201-.303.396-.611.396-.611s.03-.048.06-.098c.03-.05.053-.108.069-.168.057-.208.06-.43.028-.643-.099-.594-.563-1.035-1.065-1.446-.502-.41-1.095-.714-1.506-.714-.099 0-.194.025-.278.037-.085.012-.177.024-.27.024l-.21-.002c-.063 0-.131-.003-.199-.008-.198-.015-.412-.043-.632.267-.22.311-.753.953-.822 1.032-.07.08-.14.173-.05.347.09.174.2.4.3.596.149.297.497.496.446.695.149.198.298.347.447.496.149.149.297.298.347.546.099.248-.05.595-.173.842-.124.248-.312.397-.527.596-.215.198-.477.347-.772.496-.295.149-.618.248-.918.298-.149.025-.297.025-.446.024-.149-.001-.447-.124-.648-.298z"/>
              <path d="M12.012 2.005c-.733 0-1.43.2-2.055.576-.625.376-1.125.91-1.5 1.53-.375.62-.6 1.32-.75 2.02l-.02.1c-.01.07-.02.15-.01.23.04.32.21.62.48.88.27.26.6.48 1.01.65.41.17.88.25 1.36.25h.12c.48 0 .94-.08 1.37-.25.4-.17.74-.39 1.01-.65.27-.26.44-.56.48-.88.01-.08 0-.16-.01-.23l-.02-.1c-.15-.7-.375-1.4-.75-2.02-.375-.62-.875-1.154-1.5-1.53-.625-.376-1.322-.576-2.055-.576z" transform="translate(0 2) scale(1)"/>
            </svg>
            Share
          </motion.button>
          
          {showDelete && (
            <motion.button
              className="btn btn-danger"
              onClick={() => onDelete(product._id)}
              aria-label="Delete product"
              disabled={isDeleting}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </motion.button>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default ProductCard;
