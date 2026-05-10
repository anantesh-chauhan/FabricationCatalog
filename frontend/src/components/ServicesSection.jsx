import { motion } from 'framer-motion';
import {
  FiHome,
  FiShield,
  FiGrid,
  FiLayers,
  FiDroplet,
  FiBox,
  FiGrid as FiWindow,
} from 'react-icons/fi';
import './ServicesSection.css';

// Services data with icons + imagery + CTA
// Note: using Cloudinary image URLs already present in the project.
const services = [
  {
    id: 1,
    icon: FiHome,
    title: 'Main Gates',
    description: 'Premium sliding and swing gates with strong frames and clean finishing.',
    image: 'https://res.cloudinary.com/dlixtmy1x/image/upload/v1777868769/hero_6_ivzcba.jpg',
    ctaText: 'Request Quote',
    ctaHref: 'https://wa.me/917317289139',
  },
  {
    id: 2,
    icon: FiLayers,
    title: 'Railings',
    description: 'Stair, balcony, and staircase railings built for durability and style.',
    image: 'https://res.cloudinary.com/dlixtmy1x/image/upload/v1777869134/h2_rqamyt.jpg',
    ctaText: 'See Designs',
    ctaHref: '/designs',
  },
  {
    id: 3,
    icon: FiShield,
    title: 'Safety Doors',
    description: 'Secure doors with solid welding and smooth hardware fitment.',
    image: 'https://res.cloudinary.com/dlixtmy1x/image/upload/v1777869383/r2_krw3f4.webp',
    ctaText: 'WhatsApp Us',
    ctaHref: 'https://wa.me/917317289139',
  },
  {
    id: 4,
    icon: FiBox,
    title: 'Sheds',
    description: 'Weather-ready sheds and covers with industrial-grade fabrication.',
    image: 'https://res.cloudinary.com/dlixtmy1x/image/upload/v1777869136/h3_f9islb.png',
    ctaText: 'Request Quote',
    ctaHref: 'https://wa.me/917317289139',
  },
  {
    id: 5,
    icon: FiDroplet,
    title: 'Stainless Steel Work',
    description: 'Polished stainless steel fabrication for modern commercial and homes.',
    image: 'https://res.cloudinary.com/dlixtmy1x/image/upload/v1777869135/h1_tspnci.jpg',
    ctaText: 'View Designs',
    ctaHref: '/designs',
  },
  {
    id: 6,
    icon: FiGrid,
    title: 'Window Grills',
    description: 'Designer window grills with strong pattern control and clean finishing.',
    image: 'https://res.cloudinary.com/dlixtmy1x/image/upload/v1777863021/adarsh-gate-grill/ywe6g2hdmvqe6zfpl5wj.jpg',
    ctaText: 'WhatsApp Us',
    ctaHref: 'https://wa.me/917317289139',
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
            const isExternal = service.ctaHref.startsWith('http');

            const CardCTA = () => {
              if (isExternal) {
                return (
                  <a
                    href={service.ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="service-cta"
                  >
                    {service.ctaText}
                  </a>
                );
              }

              return (
                <a href={service.ctaHref} className="service-cta">
                  {service.ctaText}
                </a>
              );
            };

            return (
              <motion.div
                key={service.id}
                className="service-card"
                variants={itemVariants}
                whileHover={{ y: -10 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              >
                <div className="service-media" aria-hidden="true">
                  <div
                    className="service-media-img"
                    style={{ backgroundImage: `url(${service.image})` }}
                  />
                  <div className="service-media-overlay" />
                </div>

                <motion.div className="service-icon" variants={iconVariants}>
                  <IconComponent />
                </motion.div>

                <h3>{service.title}</h3>
                <p>{service.description}</p>

                <div className="service-card-footer">
                  <CardCTA />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}

export default ServicesSection;
