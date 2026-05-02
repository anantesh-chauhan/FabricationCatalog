import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { shopName, tagline, founded, founder, stats } from '../config/siteConfig';
import './About.css';

// ============================================
// About Page
// @desc    Static about page for the company
// @route   /about
// ============================================

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

function About() {
  return (
    <div className="about-page">
      <div className="container">
        <motion.div 
          className="about-page-content"
          variants={pageVariants}
          initial="hidden"
          animate="visible"
        >
{/* Header */}
          <motion.div variants={itemVariants} className="about-page-header">
            <h1>About {shopName}</h1>
            <p>{tagline}</p>
          </motion.div>

          {/* Main Content */}
          <motion.div variants={itemVariants} className="about-page-section">
            <h2>Our Story</h2>
            <p>
              Founded by {founder} in {founded}, {shopName} has been a trusted name in iron fabrication. 
              We specialize in creating beautiful 
              and durable gates, grills, railings, and custom metal work that enhances the security 
              and aesthetics of homes and businesses.
            </p>
            <p>
              Our commitment to quality craftsmanship and customer satisfaction has made us the go-to 
              choice for customers. We take pride in every 
              project, big or small, ensuring precision and attention to detail in every weld and design.
            </p>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants} className="about-page-section">
            <h2>Our Services</h2>
            <div className="about-page-services">
              <div className="about-page-service">
                <h3>Gate Fabrication</h3>
                <p>
                  Custom-designed entrance gates, driveway gates, and compound gates in various 
                  styles including modern, traditional, and decorative iron designs.
                </p>
              </div>
              <div className="about-page-service">
                <h3>Window Grills</h3>
                <p>
                  Security window grills that combine safety with elegance, available in multiple 
                  patterns and custom designs to match your home's architecture.
                </p>
              </div>
              <div className="about-page-service">
                <h3>Railings</h3>
                <p>
                  Staircase railings, balcony railings, and compound railings crafted 
                  with precision and built to last for generations.
                </p>
              </div>
              <div className="about-page-service">
                <h3>Aluminum Work</h3>
                <p>
                  Professional aluminum fabrication and installation services for doors, windows, and partitions.
                </p>
              </div>
            </div>
          </motion.div>

{/* Why Choose Us */}
          <motion.div variants={itemVariants} className="about-page-section">
            <h2>Why Choose Us</h2>
            <div className="about-page-features">
              <div className="about-page-feature">
                <span className="feature-number">{stats.yearsExperience}+</span>
                <span className="feature-label">Years Experience</span>
              </div>
              <div className="about-page-feature">
                <span className="feature-number">{stats.projectsCompleted}+</span>
                <span className="feature-label">Projects Completed</span>
              </div>
              <div className="about-page-feature">
                <span className="feature-number">{stats.happyClients}+</span>
                <span className="feature-label">Happy Clients</span>
              </div>
              <div className="about-page-feature">
                <span className="feature-number">{stats.qualityGuarantee}%</span>
                <span className="feature-label">Quality Assured</span>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemVariants} className="about-page-cta">
            <h2>Ready to Transform Your Space?</h2>
            <p>Contact us today for a free consultation and quote.</p>
            <div className="about-page-cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                Contact Us
              </Link>
              <Link to="/designs" className="btn btn-secondary">
                View Designs
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default About;
