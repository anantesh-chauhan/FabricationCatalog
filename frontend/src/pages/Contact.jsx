import { motion } from 'framer-motion';
import { shopName, tagline, contact, services } from '../config/siteConfig';
import './Contact.css';

// Format phone for tel and WhatsApp
const PHONE = contact.phone;

function Contact() {

  return (
    <div className="contact">
      <div className="container">
        {/* Header */}
        <motion.div 
          className="contact-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
<h1>Contact Us</h1>
          <p>Get in touch with {shopName}</p>
        </motion.div>

        {/* Content Grid */}
        <div className="contact-grid">
          {/* Contact Info */}
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
<div className="info-card">
              <h2>{shopName}</h2>
              <p className="tagline">{tagline}</p>
              
              <div className="info-items">
                <div className="info-item">
                  <span className="info-label">Phone</span>
                  <a href={`tel:${PHONE.replace(/[^0-9]/g, '')}`} className="info-link">{PHONE}</a>
                </div>
                
                <div className="info-item">
                  <span className="info-label">Hours</span>
                  <span className="info-value">{contact.hours}</span>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a 
                href={`https://wa.me/${PHONE.replace(/[^0-9]/g, '')}?text=Hi, I'm interested in your services`}
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-whatsapp whatsapp-cta"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.149-.099.45-.497.6-.737.198-.297.773-.985.854-1.165.174-.298.347-.496.69-.596.347-.099.694-.074.99-.024.297.05 1.805.446 2.444.993.639.548 1.063 1.445 1.063 1.445s.546 1.097.62 1.16c.074.063.27.198.645.099zm-3.94-1.146c.16-.01.32-.01.48-.01.07 0 .14.005.21.005.178 0 .357.003.536.003.06 0 .12-.003.18-.005.297-.024.595-.098.856-.298.261-.199.507-.463.707-.767.201-.303.396-.611.396-.611s.03-.048.06-.098c.03-.05.053-.108.069-.168.057-.208.06-.43.028-.643-.099-.594-.563-1.035-1.065-1.446-.502-.41-1.095-.714-1.506-.714-.099 0-.194.025-.278.037-.085.012-.177.024-.27.024l-.21-.002c-.063 0-.131-.003-.199-.008-.198-.015-.412-.043-.632.267-.22.311-.753.953-.822 1.032-.07.08-.14.173-.05.347.09.174.2.4.3.596.149.297.297.496.446.695.149.198.298.347.447.496.149.149.298.298.347.546.099.248-.05.595-.173.842-.124.248-.312.397-.527.596-.215.198-.477.347-.772.496-.295.149-.618.248-.918.298-.149.025-.297.025-.446.024-.149-.001-.447-.124-.648-.298z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div 
            className="contact-services"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="services-card">
              <h2>Our Services</h2>
              <p className="services-intro">
                We offer a wide range of iron fabrication services
              </p>
              
              <ul className="services-list">
                {services.map((service, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                  >
                    {service}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Map Placeholder */}
        <motion.div 
          className="contact-map"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="map-placeholder">
            <span>Map Placeholder</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Contact;
