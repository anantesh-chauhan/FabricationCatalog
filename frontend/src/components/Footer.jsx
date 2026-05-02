import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { shopName, tagline, contact, services } from '../config/siteConfig';
import './Footer.css';

// Format phone for tel link
const PHONE = contact.phone;

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
{/* Company Info */}
          <div className="footer-section footer-about">
            <h3 className="footer-title">{shopName}</h3>
            <p className="footer-description">
              {tagline}. Quality craftsmanship for gates, grills, railings, and custom metal work.
            </p>
            <div className="footer-contact">
              <div className="contact-item">
                <span className="contact-label">Phone:</span>
                <a href={`tel:${PHONE.replace(/[^0-9]/g, '')}`} className="contact-link">{PHONE}</a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h3 className="footer-title">Our Services</h3>
            <ul className="footer-services">
              {services.map((service, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {service}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/designs">Designs</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/admin">Admin Login</Link></li>
            </ul>
          </div>
        </div>

<div className="footer-bottom">
          <p>&copy; {currentYear} {shopName}. All rights reserved.</p>
          <p className="footer-credit">Crafted with excellence</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
