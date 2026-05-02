import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import './Gallery.css';

// Stagger animation for grid
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

function Designs() {
  const { products, loading, error, selectedCategory, setSelectedCategory, fetchProducts } = useProducts();

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory, fetchProducts]);

  return (
    <div className="gallery">
      <div className="container">
        {/* Header */}
        <motion.div 
          className="gallery-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Our Designs</h1>
          <p>Browse our collection of custom ironwork designs</p>
        </motion.div>

        {/* Category Filter */}
        <CategoryFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Products Grid */}
        <div className="gallery-content">
          {loading ? (
            <motion.div 
              className="gallery-loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="loading-spinner"></div>
              <p>Loading designs...</p>
            </motion.div>
          ) : error ? (
            <motion.div 
              className="gallery-error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring' }}
            >
              <p>{error}</p>
              <motion.button 
                className="btn btn-primary"
                onClick={() => fetchProducts(selectedCategory)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Try Again
              </motion.button>
            </motion.div>
          ) : products.length === 0 ? (
            <motion.div 
              className="gallery-empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p>No Designs Available</p>
              <p className="gallery-empty-subtext">Check back later for new designs or contact us for custom work.</p>
            </motion.div>
          ) : (
            <motion.div 
              className="grid grid-products"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence mode="popLayout">
                {products.map((product, index) => (
                  <motion.div
                    key={product._id}
                    variants={itemVariants}
                  >
                    <ProductCard 
                      product={product} 
                      index={index}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Designs;
