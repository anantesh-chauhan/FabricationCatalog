import { motion } from 'framer-motion';
import { FiBox, FiGrid, FiLayers, FiSquare, FiDisc } from 'react-icons/fi';
import './ServicesSection.css';

// Services data with icons
const services = [
  {
    id: 1,
    icon: FiBox,
    title: 'Gates',
    description: 'Custom designed entrance gates - sliding, swing, and automated options',
  },
  {
    id: 2,
    icon: FiGrid,
    title: 'Grill',
    description: 'Window and balcony grills with modern and classic patterns',
  },
  {
    id: 3,
    icon: FiLayers,
    title: 'Railings',
    description: 'Sturdy stair and balcony railings in stainless steel and iron',
  },
  {
    id: 4,
    icon: FiSquare,
    title: 'Aluminum',
    description: 'Aluminum fabrication - partitions, frames, and custom work',
  },
  {
    id: 5,
    icon: FiDisc,
    title: 'Doors & Windows',
    description: 'Custom iron doors, windows, and ventilation frames',
  },
];

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

const iconVariants = {
  rest: { scale: 1, rotate: 0 },
  hover: { scale: 1.1, rotate: 5 },
};

function ServicesSection() {
  return (
    <section className="services-section">
      <div className="container">
        {/* Section Header */}
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <h2>Our Services</h2>
          <p>Comprehensive iron fabrication solutions for homes and businesses</p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.id}
                className="service-card"
                variants={itemVariants}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <motion.div 
                  className="service-icon"
                  variants={iconVariants}
                >
                  <IconComponent />
                </motion.div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default ServicesSection;
