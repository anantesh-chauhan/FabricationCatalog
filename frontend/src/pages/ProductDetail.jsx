import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProducts } from '../context/ProductContext';
import ImageGallery from '../components/ImageGallery';
import './ProductDetail.css';

// ============================================
// ProductDetail Page
// @desc    Display product details with multiple images and WhatsApp
// @route   /product/:id
// ============================================

// WhatsApp phone number
const WHATSAPP_PHONE = '917317289139';

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
};

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchProductById, loading, error } = useProducts();
  
  const [product, setProduct] = useState(null);
  const [productLoading, setProductLoading] = useState(true);
  const [productError, setProductError] = useState(null);

  // Fetch product on mount
  useEffect(() => {
    const loadProduct = async () => {
      setProductLoading(true);
      const data = await fetchProductById(id);
      if (data) {
        setProduct(data);
      } else {
        setProductError('Product not found');
      }
      setProductLoading(false);
    };
    
    loadProduct();
  }, [id, fetchProductById]);

  // Generate WhatsApp message with product details
  const generateWhatsAppMessage = (prod) => {
    // Get current origin for product URL
    const baseUrl = window.location.origin;
    const productUrl = `${baseUrl}/product/${prod._id}`;
    
    const message = `Hi, I am interested in this design: ${prod.title}\nView here: ${productUrl}`;
    return message;
  };

  // Handle WhatsApp button click
  const handleWhatsAppClick = () => {
    if (!product) return;
    
    const message = generateWhatsAppMessage(product);
    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;
    
    window.open(waUrl, '_blank');
  };

  // Handle back button click
  const handleBackClick = () => {
    navigate(-1);
  };

  // Get category label
const getCategoryLabel = (category) => {
    const labels = {
      gates: 'Gates',
      grill: 'Grill',
      railings: 'Railings',
      aluminum: 'Aluminum',
      doors: 'Doors/Windows',
      other: 'Other'
    };
    return labels[category] || category;
  };

  // Loading state
  if (productLoading || loading) {
    return (
      <div className="product-detail">
        <div className="container">
          <motion.div 
            className="product-detail-loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="loading-spinner"></div>
            <p>Loading product...</p>
          </motion.div>
        </div>
      </div>
    );
  }

  // Error state
  if (productError || error) {
    return (
      <div className="product-detail">
        <div className="container">
          <motion.div 
            className="product-detail-error"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring' }}
          >
            <h2>Product Not Found</h2>
            <p>{productError || error}</p>
            <div className="product-detail-error-actions">
              <motion.button 
                className="btn btn-primary"
                onClick={handleBackClick}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Go Back
              </motion.button>
<Link to="/designs" className="btn btn-secondary">
                View All Designs
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // No product state
  if (!product) {
    return (
      <div className="product-detail">
        <div className="container">
          <motion.div 
            className="product-detail-error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2>Product Not Found</h2>
            <p>The product you are looking for does not exist.</p>
<Link to="/designs" className="btn btn-primary">
              View Designs
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <div className="container">
        <motion.div 
          className="product-detail-content"
          variants={pageVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Back Button */}
          <motion.div variants={itemVariants} className="product-detail-back">
            <motion.button 
              className="btn btn-back"
              onClick={handleBackClick}
              whileHover={{ scale: 1.02, x: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back
            </motion.button>
          </motion.div>

          {/* Product Grid */}
          <div className="product-detail-grid">
            {/* Image Section */}
            <motion.div variants={itemVariants} className="product-detail-images">
              <ImageGallery product={product} />
            </motion.div>

            {/* Details Section */}
            <motion.div variants={itemVariants} className="product-detail-info">
              {/* Category Badge */}
              <span className="product-detail-category">
                {getCategoryLabel(product.category)}
              </span>

              {/* Title */}
              <h1 className="product-detail-title">{product.title}</h1>

              {/* Description */}
              {product.description && (
                <div className="product-detail-description">
                  <p>{product.description}</p>
                </div>
              )}

              {/* Divider */}
              <div className="product-detail-divider"></div>

              {/* Action Buttons */}
              <div className="product-detail-actions">
                {/* WhatsApp Button */}
                <motion.button 
                  className="btn btn-whatsapp btn-large"
                  onClick={handleWhatsAppClick}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.149-.099.45-.497.6-.737.198-.297.773-.985.854-1.165.174-.298.347-.496.69-.596.347-.099.694-.074.99-.024.297.05 1.805.446 2.444.993.639.548 1.063 1.445 1.063 1.445s.546 1.097.62 1.16c.074.063.27.198.645.099zm-3.94-1.146c.16-.01.32-.01.48-.01.07 0 .14.005.21.005.178 0 .357.003.536.003.06 0 .12-.003.18-.005.297-.024.595-.098.856-.298.261-.199.507-.463.707-.767.201-.303.396-.611.396-.611s.03-.048.06-.098c.03-.05.053-.108.069-.168.057-.208.06-.43.028-.643-.099-.594-.563-1.035-1.065-1.446-.502-.41-1.095-.714-1.506-.714-.099 0-.194.025-.278.037-.085.012-.177.024-.27.024l-.21-.002c-.063 0-.131-.003-.199-.008-.198-.015-.412-.043-.632.267-.22.311-.753.953-.822 1.032-.07.08-.14.173-.05.347.09.174.2.4.3.596.149.297.497.496.446.695.149.198.298.347.447.496.149.149.297.298.347.546.099.248-.05.595-.173.842-.124.248-.312.397-.527.596-.215.198-.477.347-.772.496-.295.149-.618.248-.918.298-.149.025-.297.025-.446.024-.149-.001-.447-.124-.648-.298z"/>
                    <path d="M12.012 2.005c-.733 0-1.43.2-2.055.576-.625.376-1.125.91-1.5 1.53-.375.62-.6 1.32-.75 2.02l-.02.1c-.01.07-.02.15-.01.23.04.32.21.62.48.88.27.26.6.48 1.01.65.41.17.88.25 1.36.25h.12c.48 0 .94-.08 1.37-.25.4-.17.74-.39 1.01-.65.27-.26.44-.56.48-.88.01-.08 0-.16-.01-.23l-.02-.1c-.15-.7-.375-1.4-.75-2.02-.375-.62-.875-1.154-1.5-1.53-.625-.376-1.322-.576-2.055-.576z" transform="translate(0 2) scale(1)"/>
                  </svg>
                  Enquire on WhatsApp
                </motion.button>

{/* View Gallery Link */}
                <Link to="/designs" className="btn btn-secondary">
                  View All Designs
                </Link>
              </div>

              {/* Product ID (for reference) */}
              <div className="product-detail-id">
                <span>Product ID: {product._id}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ProductDetail;
