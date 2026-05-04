import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { shopName, tagline, contact, services } from '../config/siteConfig';
import './Footer.css';

const PHONE = contact.phone;

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* TOP GRID */}
        <div className="footer-grid">

          {/* BRAND */}
          <div className="footer-section footer-about">
            <h3 className="footer-title">{shopName}</h3>

            <p className="footer-description">
              {tagline}. We specialize in premium gates, grills, railings and custom metal fabrication.
            </p>

            <div className="footer-contact">
              <a
                href={`tel:${PHONE.replace(/[^0-9]/g, '')}`}
                className="footer-contact-btn"
              >
                📞 {PHONE}
              </a>

              <a
                href={`https://wa.me/${PHONE.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-whatsapp-btn"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>

          {/* SERVICES */}
          <div className="footer-section">
            <h3 className="footer-title">Services</h3>
            <ul className="footer-services">
              {services.map((service, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 6 }}
                >
                  <span>›</span> {service}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* QUICK LINKS */}
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/designs">Designs</Link></li>
              <li><Link to="/team">Our Team</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/admin">Admin</Link></li>
            </ul>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="footer-divider"></div>

        {/* BOTTOM */}
        <div className="footer-bottom">
          <p>© {currentYear} {shopName}. All rights reserved.</p>
          <p className="footer-credit">Built with precision craftsmanship ⚒️</p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;