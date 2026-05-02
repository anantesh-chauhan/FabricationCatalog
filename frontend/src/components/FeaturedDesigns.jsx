import { motion } from 'framer-motion';
import { FiMessageCircle } from 'react-icons/fi';
import { useProducts } from '../context/ProductContext';
import './FeaturedDesigns.css';

// Fallback image
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1565557623262-b51c2516a634?w=600&q=80';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

function FeaturedDesigns() {
  const { products } = useProducts();

  // Get featured products (up to 6)
  const featuredProducts = products.slice(0, 6);

  // Handle image error
  const handleImageError = (e) => {
    e.target.src = FALLBACK_IMAGE;
  };

  // Handle WhatsApp click
  const handleWhatsApp = () => {
    window.open('https://wa.me/917317289139', '_blank');
  };

  return (
    <section className="featured-designs">
      <div className="container">
        {/* Section Header */}
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <h2>Featured Designs</h2>
          <p>Our most popular fabrication work</p>
        </motion.div>

        {/* Products Grid */}
        {featuredProducts.length > 0 ? (
          <motion.div 
            className="featured-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {featuredProducts.map((product) => (
              <motion.div
                key={product._id}
                className="featured-card"
                variants={itemVariants}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* Image */}
                <div className="featured-image">
                  <img 
                    src={product.imageUrl} 
                    alt={product.title}
                    onError={handleImageError}
                    loading="lazy"
                  />
                  <motion.div 
                    className="featured-overlay"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <span>{product.category}</span>
                  </motion.div>
                </div>

                {/* Info */}
                <div className="featured-info">
                  <h3>{product.title}</h3>
                  <p>{product.description || 'Custom fabrication work'}</p>
                  
                  <motion.button
                    className="btn btn-whatsapp btn-small"
                    onClick={handleWhatsApp}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FiMessageCircle />
                    Enquire on WhatsApp
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="no-products"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p>No featured designs yet. Check back soon!</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default FeaturedDesigns;
