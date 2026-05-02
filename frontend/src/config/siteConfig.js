// ============================================
// Central Site Configuration
// @desc    ALL shop-related details in ONE place
// For reusability: Only edit this file to customize for new shops
// ============================================

// Base URL for API calls
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ============================================
// Site Configuration Object
// ============================================
const siteConfig = {
  // ============================================
  // Basic Shop Information
  // ============================================
  shopName: 'Adarsh Gate Grill and Fabrication Shop',
  shopNameShort: 'Adarsh Gate Grill',
  tagline: 'Quality Craftsmanship Since 2010',
  description: 'Professional iron fabrication services for gates, grills, railings, and custom metal work.',
  
  // Founder Info
  founded: '2010',
  founder: 'Pappu Chauhan',
  
  // ============================================
  // Contact Information
  // ============================================
  contact: {
    phone: '+917317289139',
    whatsapp: '917317289139',
    email: 'adarshgategrill@gmail.com',
    hours: 'Mon - Sat: 9:00 AM - 7:00 PM'
  },
  
  // ============================================
  // Address
  // ============================================
  address: {
    full: 'Ballia, Uttar Pradesh',
    city: 'Ballia',
    state: 'Uttar Pradesh',
    pincode: '277001'
  },
  
  // ============================================
  // Business Hours
  // ============================================
  hours: {
    monday: { open: '09:00', close: '19:00', closed: false },
    tuesday: { open: '09:00', close: '19:00', closed: false },
    wednesday: { open: '09:00', close: '19:00', closed: false },
    thursday: { open: '09:00', close: '19:00', closed: false },
    friday: { open: '09:00', close: '19:00', closed: false },
    saturday: { open: '09:00', close: '19:00', closed: false },
    sunday: { open: '10:00', close: '17:00', closed: false }
  },
  
  // ============================================
  // Services Offered
  // ============================================
  services: [
    'Custom Gate Fabrication',
    'Window Grills & Security Bars',
    'Iron & Steel Railings',
    'Balcony Grills',
    'Staircase Railings',
    'Aluminum Work',
    'Door & Window Installation',
    'Welding & Fitting Services',
    'Repair & Maintenance Services',
    'On-site Measurements'
  ],
  
  // ============================================
  // Categories
  // ============================================
  categories: [
    { id: 'gates', name: 'Gates', icon: 'gate' },
    { id: 'grill', name: 'Grill', icon: 'grill' },
    { id: 'railings', name: 'Railings', icon: 'railing' },
    { id: 'aluminum', name: 'Aluminum', icon: 'aluminum' },
    { id: 'doors', name: 'Doors/Windows', icon: 'door' }
  ],
  
  // ============================================
  // Hero Section Images (URLs)
  // ============================================
  heroImages: [
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    'https://images.unsplash.com/photo-1600585152220-40363ac063d4?w=1200&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80'
  ],
  
  // ============================================
  // Social Media Links
  // ============================================
  social: {
    facebook: '',
    instagram: '',
    twitter: '',
    youtube: ''
  },
  
  // ============================================
  // SEO & Meta Tags
  // ============================================
  seo: {
    ogImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    keywords: 'gate grill, iron works, fabrication, railing, window grill, custom gates'
  },
  
  // ============================================
  // Statistics (for About page)
  // ============================================
  stats: {
    yearsExperience: 14,
    projectsCompleted: 500,
    happyClients: 300,
    qualityGuarantee: 100
  },

  // ============================================
  // API Configuration
  // ============================================
  api: {
    baseURL: API_BASE_URL,
    timeout: 30000
  }
};

// Export for use in components
export default siteConfig;

// Named exports for convenience
export const {
  shopName,
  shopNameShort,
  tagline,
  founded,
  founder,
  contact,
  address,
  hours,
  services,
  categories,
  heroImages,
  social,
  seo,
  stats,
  api
} = siteConfig;
