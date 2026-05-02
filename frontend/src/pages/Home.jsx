import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useProducts } from '../context/ProductContext';

// New components
import HeroSlider from '../components/HeroSlider';
import ServicesSection from '../components/ServicesSection';
import CategoryPreview from '../components/CategoryPreview';
import FeaturedDesigns from '../components/FeaturedDesigns';
import CTASection from '../components/CTASection';

// Styles
import './Home.css';

// Animation variants for sections
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  },
};

function Home() {
  const { fetchProducts, loading } = useProducts();

  // Fetch all products on mount
  useEffect(() => {
    fetchProducts('all');
  }, [fetchProducts]);

  return (
    <div className="home">
      {/* Hero Slider Section */}
      <HeroSlider />

      {/* Services Section */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <ServicesSection />
      </motion.div>

      {/* Category Preview */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <CategoryPreview />
      </motion.div>

      {/* Featured Designs */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <FeaturedDesigns />
      </motion.div>

      {/* CTA Section */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <CTASection />
      </motion.div>
    </div>
  );
}

export default Home;
