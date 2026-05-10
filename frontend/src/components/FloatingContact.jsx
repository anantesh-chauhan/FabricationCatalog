import { FiPhone, FiMessageCircle } from 'react-icons/fi';
import './FloatingContact.css';

const PHONE_NUMBER = '+917317289139';
const WHATSAPP_NUMBER = '917317289139';

function FloatingContact() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`;

  const handleCall = () => {
    window.location.href = `tel:${PHONE_NUMBER}`;
  };

  return (
    <>
      {/* Floating WhatsApp (desktop + tablet) */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp"
        aria-label="Chat on WhatsApp"
      >
        <FiMessageCircle />
      </a>

      {/* Sticky mobile contact bar */}
      <div className="sticky-contact-bar" aria-label="Quick contact">
        <div className="bar-inner">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="sticky-btn whatsapp"
          >
            <FiMessageCircle />
            WhatsApp
          </a>

          <button type="button" className="sticky-btn call" onClick={handleCall}>
            <FiPhone />
            Call Now
          </button>
        </div>
      </div>
    </>
  );
}

export default FloatingContact;

