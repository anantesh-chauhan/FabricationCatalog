import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProducts } from '../context/ProductContext';
import './CategoryPreview.css';

// Fallback image
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1565557623262-b51c2516a634?w=400&q=80';

// Category preview data
const categories = [
  {
    id: 'gates',
    title: 'Gates',
    description: 'Beautiful and secure entrance gates',
  },
  {
    id: 'grill',
    title: 'Grills',
    description: 'Window and balcony security grills',
  },
  {
    id: 'railings',
    title: 'Railings',
    description: 'Sturdy stair and balcony railings',
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

function CategoryPreview() {
  const { products } = useProducts();
  const navigate = useNavigate();

  // Get products by category (up to 3)
  const getProductsByCategory = (category) => {
    return products
      .filter((p) => p.category === category)
      .slice(0, 3);
  };

  // Handle category click
  const handleCategoryClick = (category) => {
    navigate(`/designs?category=${category}`);
  };

  // Handle image error
  const handleImageError = (e) => {
    e.target.src = FALLBACK_IMAGE;
  };

  return (
    <section className="category-preview">
      <div className="container">
        {/* Section Header */}
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <h2>Browse by Category</h2>
          <p>Explore our wide range of fabrication designs</p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div 
          className="categories-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {categories.map((category) => {
            const categoryProducts = getProductsByCategory(category.id);
            
            return (
              <motion.div
                key={category.id}
                className="category-card"
                variants={itemVariants}
              >
                {/* Category Header */}
                <div className="category-header" onClick={() => handleCategoryClick(category.id)}>
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                </div>

                {/* Products Grid */}
                {categoryProducts.length > 0 ? (
                  <div className="category-products">
                    {categoryProducts.map((product, index) => (
                      <motion.div
                        key={product._id}
                        className="category-product"
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <img 
                          src={product.imageUrl} 
                          alt={product.title}
                          onError={handleImageError}
                          loading="lazy"
                        />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="no-products">
                    <p>No products yet</p>
                  </div>
                )}

                {/* View More Button */}
                <motion.button
                  className="btn btn-secondary view-more-btn"
                  onClick={() => handleCategoryClick(category.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View More
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default CategoryPreview;
