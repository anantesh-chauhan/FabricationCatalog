import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './HeroSlider.css';

// Hero slides data - high-quality fabrication images
const heroSlides = [
  {
    id: 1,
    image: 'https://res.cloudinary.com/dlixtmy1x/image/upload/v1777868769/hero_6_ivzcba.jpg',
    title: 'Adarsh Gate Grill and Fabrication Shop',
    subtitle: 'All Fabrication Work – From Welding to Fitting',
  },
  {
    id: 2,
    image: 'https://res.cloudinary.com/dlixtmy1x/image/upload/v1777869136/h3_f9islb.png',
    title: 'Custom Gates & Grills',
    subtitle: 'Premium Quality Craftsmanship for Your Home',
  },
  {
    id: 3,
    image: 'https://res.cloudinary.com/dlixtmy1x/image/upload/v1777869134/h2_rqamyt.jpg',
    title: 'Modern Railings & Aluminum',
    subtitle: 'Elegant Designs That Last a Lifetime',
  },
  {
    id: 4,
    image: 'https://res.cloudinary.com/dlixtmy1x/image/upload/v1777868769/hero_5_bxwb1q.jpg',
    title: 'Adarsh Gate Grill and Fabrication Shop',
    subtitle: 'All Fabrication Work – From Welding to Fitting',
  },
  {
    id: 5,
    image: 'https://res.cloudinary.com/dlixtmy1x/image/upload/v1777869135/h1_tspnci.jpg',
    title: 'Custom Gates & Grills',
    subtitle: 'Premium Quality Craftsmanship for Your Home',
  },
  {
    id: 6,
    image: 'https://res.cloudinary.com/dlixtmy1x/image/upload/v1777869383/r2_krw3f4.webp',
    title: 'Modern Railings & Aluminum',
    subtitle: 'Elegant Designs That Last a Lifetime',
  },
   {
    id: 7,
    image: 'https://res.cloudinary.com/dlixtmy1x/image/upload/v1777869383/r3_wcpcgz.jpg',
    title: 'Adarsh Gate Grill and Fabrication Shop',
    subtitle: 'All Fabrication Work – From Welding to Fitting',
  },
  {
    id: 8,
    image: 'https://res.cloudinary.com/dlixtmy1x/image/upload/v1777863021/adarsh-gate-grill/ywe6g2hdmvqe6zfpl5wj.jpg',
    title: 'Custom Gates & Grills',
    subtitle: 'Premium Quality Craftsmanship for Your Home',
  },
];

// Fallback image
const FALLBACK_IMAGE = 'https://res.cloudinary.com/dlixtmy1x/image/upload/v1777868769/hero_7_czmtza.jpg';

// Animation variants
const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: {
      duration: 0.4,
      ease: 'easeIn',
    },
  },
};

const sliderVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});

  // Preload images
  useEffect(() => {
    heroSlides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
      img.onload = () => {
        setLoadedImages((prev) => ({ ...prev, [slide.id]: true }));
      };
      img.onerror = () => {
        // Keep fallback
      };
    });
  }, []);

  // Auto-advance slides every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  // Handle slide change
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Handle image error
  const handleImageError = (e) => {
    e.target.src = FALLBACK_IMAGE;
  };

  const currentSlideData = heroSlides[currentSlide];

  return (
    <section className="hero-slider">
      {/* Background Images */}
      <div className="slider-images">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="slide-image-container"
            variants={sliderVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <div
              className="slide-image"
              style={{
                backgroundImage: `url(${loadedImages[currentSlideData.id] ? currentSlideData.image : FALLBACK_IMAGE})`,
              }}
              onError={handleImageError}
            />
          </motion.div>
        </AnimatePresence>

        {/* Dark Overlay */}
        <div className="slider-overlay" />
        
        {/* Pattern Overlay */}
        <div className="slider-pattern" />
      </div>

      {/* Content */}
      <div className="slider-content">
        <div className="container">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className="slide-content-inner"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h1 className="hero-title">Premium Gate &amp; Fabrication Solutions</h1>
              <p className="hero-subtitle">
                Trusted welding, modern designs, and durable fabrication for gates, railings, doors, and more—built for a lifetime.
              </p>

              <div className="hero-cta">
                <a
                  href="https://wa.me/917317289139"
                  className="btn btn-whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>

                <a
                  href="tel:+917317289139"
                  className="btn btn-secondary btn-call"
                >
                  Call Now
                </a>

                <Link to="/designs" className="btn btn-primary">
                  View Designs
                </Link>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slider Dots */}
      <div className="slider-dots">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <span>Scroll</span>
        <motion.div 
          className="scroll-line"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}

export default HeroSlider;
