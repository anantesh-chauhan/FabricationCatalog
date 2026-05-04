import { motion } from 'framer-motion';
import { FiPhone, FiMessageCircle } from 'react-icons/fi';
import './CTASection.css';

// Phone number
const PHONE_NUMBER = '+917317289139';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

function CTASection() {
  // Handle phone call
  const handleCall = () => {
    window.location.href = `tel:${PHONE_NUMBER}`;
  };

  // Handle WhatsApp
  const handleWhatsApp = () => {
    window.open('https://wa.me/917317289139', '_blank');
  };

  return (
    <section className="cta-section">
      {/* Background */}
      <div className="cta-background">
        <div className="cta-pattern" />
      </div>

      <div className="container">
        <motion.div 
          className="cta-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Title */}
          <motion.div variants={itemVariants}>
            <h2>Looking for Custom Design?</h2>
            <p>Get in touch with us for your fabrication needs</p>
          </motion.div>

          {/* Buttons */}
          <motion.div 
            className="cta-buttons"
            variants={itemVariants}
          >
            <motion.button
              className="btn btn-primary cta-btn"
              onClick={handleCall}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiPhone />
              Call Now
            </motion.button>

            <motion.a
              href="https://wa.me/917317289139"
              className="btn btn-whatsapp cta-btn"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiMessageCircle />
              WhatsApp Now
            </motion.a>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="cta-contact"
            variants={itemVariants}
          >
            <p>
              <strong>Adarsh Gate Grill and Fabrication Shop</strong>
              <br />
              Ballia, Uttar Pradesh
            </p>
            <p className="cta-phone">
              <FiPhone /> {PHONE_NUMBER}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default CTASection;
