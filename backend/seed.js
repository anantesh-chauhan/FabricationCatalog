require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Product = require('./models/Product');
const User = require('./models/User');

// ============================================
// Database Seeding Script
// @desc    Seeds the database with high-quality product data
// @usage  npm run seed
// ============================================

// High-quality Unsplash images for Gates
const gatesImages = [
  {
    title: 'Modern Gate Design 01',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    description: 'Sleek modern steel gate with clean lines, perfect for contemporary homes and commercial properties.',
    tags: ['modern', 'steel', 'entrance', 'contemporary']
  },
  {
    title: 'Premium Gate Design 02',
    imageUrl: 'https://images.unsplash.com/photo-1506702315536-dd8b83e2dcf9?w=800&q=80',
    description: 'Classic wrought iron gate with intricate scrollwork and ornamental details.',
    tags: ['wrought-iron', 'classic', 'decorative', 'traditional']
  },
  {
    title: 'Heavy Duty Driveway Gate',
    imageUrl: 'https://images.unsplash.com/photo-1519162584292-56dfc9eb42db?w=800&q=80',
    description: 'Robust driveway gate designed for heavy vehicles and maximum security.',
    tags: ['driveway', 'heavy-duty', 'security', 'industrial']
  },
  {
    title: 'Decorative Entrance Gate',
    imageUrl: 'https://images.unsplash.com/photo-1600585152220-40363ac063d4?w=800&q=80',
    description: 'Elegant entrance gate with decorative patterns that enhance your property curb appeal.',
    tags: ['entrance', 'decorative', 'elegant', 'residential']
  },
  {
    title: 'Sliding Main Gate',
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a33af2d?w=800&q=80',
    description: 'Modern sliding gate mechanism for space-efficient driveway access.',
    tags: ['sliding', 'automated', 'modern', 'space-saving']
  },
  {
    title: 'Rustic Farm House Gate',
    imageUrl: 'https://images.unsplash.com/photo-1531834685032-c34c0a94f4e4?w=800&q=80',
    description: 'Rustic charm gate perfect for farmhouses and country estates.',
    tags: ['rustic', 'farmhouse', 'country', 'vintage']
  }
];

// High-quality Unsplash images for Grills
const grillImages = [
  {
    title: 'Security Window Grill 01',
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    description: 'Durable security window grill with ventilation support.',
    tags: ['security', 'window', 'safety', 'ventilated']
  },
  {
    title: 'Decorative Window Bars',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    description: 'Ornamental window bars that combine safety with aesthetic appeal.',
    tags: ['decorative', 'window', 'ornamental', 'safety']
  },
  {
    title: 'Modern Balcony Grill',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    description: 'Contemporary balcony grill with minimalist design for modern apartments.',
    tags: ['balcony', 'modern', 'contemporary', 'apartment']
  },
  {
    title: 'Safety Window Guards',
    imageUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
    description: 'Child-safe window guards with powder-coated finish.',
    tags: ['safety', 'child-safe', 'window', 'protective']
  },
  {
    title: 'Garden Window Grill',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    description: 'Elegant window grill for garden-facing rooms.',
    tags: ['garden', 'window', 'elegant', 'outdoor']
  },
  {
    title: 'Parlor Window Grill',
    imageUrl: 'https://images.unsplash.com/photo-1600573472591-ee6c563aaec3?w=800&q=80',
    description: 'Classic parlor window design with Victorian influences.',
    tags: ['parlor', 'window', 'classic', 'victorian']
  }
];

// High-quality Unsplash images for Railings
const railingImages = [
  {
    title: 'Steel Balcony Railing',
    imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
    description: 'Robust steel balcony railing with anti-corrosion coating.',
    tags: ['balcony', 'steel', 'corrosion-resistant', 'outdoor']
  },
  {
    title: 'Modern Glass Railing',
    imageUrl: 'https://images.unsplash.com/photo-1600566753086-00f18cf6b3ea?w=800&q=80',
    description: 'Modern glass panel railing with stainless steel fixtures.',
    tags: ['glass', 'modern', 'contemporary', 'transparent']
  },
  {
    title: 'Staircase Iron Railing',
    imageUrl: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80',
    description: 'Custom iron staircase railing with artistic balusters.',
    tags: ['staircase', 'iron', 'custom', 'indoor']
  },
  {
    title: 'Pool Safety Railing',
    imageUrl: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80',
    description: 'CPSS-compliant pool safety railing with secure grip.',
    tags: ['pool', 'safety', 'outdoor', 'compliant']
  },
  {
    title: 'Terrace Railing Design',
    imageUrl: 'https://images.unsplash.com/photo-1600210492493-0946911120ea?w=800&q=80',
    description: 'Weather-resistant terrace railing with modern aesthetics.',
    tags: ['terrace', 'weather-resistant', 'modern', 'outdoor']
  },
  {
    title: 'Roof Railing System',
    imageUrl: 'https://images.unsplash.com/photo-1600585152220-40363ac063d4?w=800&q=80',
    description: 'Safety roof railing system for flat and sloped roofs.',
    tags: ['roof', 'safety', 'industrial', 'fall-protection']
  }
];

// High-quality Unsplash images for Aluminum
const aluminumImages = [
  {
    title: 'Aluminum Sliding Door',
    imageUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09d519d7?w=800&q=80',
    description: 'Energy-efficient aluminum sliding door with thermal break.',
    tags: ['sliding-door', 'thermal-break', 'energy-efficient', 'modern']
  },
  {
    title: 'Aluminum Window Frame',
    imageUrl: 'https://images.unsplash.com/photo-1600566752229-250ed79470f8?w=800&q=80',
    description: 'Powder-coated aluminum window frame with durability guarantee.',
    tags: ['window-frame', 'powder-coated', 'durable', 'modern']
  },
  {
    title: 'Office Aluminum Partition',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    description: 'Modern office partitioning system in aluminum.',
    tags: ['office', 'partition', 'commercial', 'modern']
  },
  {
    title: 'Aluminum Kitchen Cabinet',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    description: 'Sleek aluminum kitchen cabinet with soft-close hinges.',
    tags: ['kitchen', 'cabinet', 'modern', 'storage']
  },
  {
    title: 'Aluminum Facade Panel',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92d1afe?w=800&q=80',
    description: 'Architectural aluminum facade panel for commercial buildings.',
    tags: ['facade', 'architectural', 'commercial', 'exterior']
  },
  {
    title: 'Aluminum Pergola',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    description: 'Modern aluminum pergola with adjustable louvers.',
    tags: ['pergola', 'outdoor', 'adjustable', 'garden']
  }
];

// High-quality Unsplash images for Doors/Windows
const doorWindowImages = [
  {
    title: 'Main Entrance Door',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    description: 'Grand main entrance door with iron ornamental work.',
    tags: ['entrance', 'main-door', 'ornamental', 'grand']
  },
  {
    title: 'Iron Security Door',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    description: 'Heavy-duty security door with multi-point locking system.',
    tags: ['security', 'door', 'heavy-duty', 'safe']
  },
  {
    title: 'Glass Panel Door',
    imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
    description: 'Modern glass panel door with iron frame accent.',
    tags: ['glass', 'door', 'modern', 'transparent']
  },
  {
    title: 'Interior Door Design',
    imageUrl: 'https://images.unsplash.com/photo-1600573472591-ee6c563aaec3?w=800&q=80',
    description: 'Designer interior door with carved iron details.',
    tags: ['interior', 'door', 'designer', 'carved']
  },
  {
    title: 'French Window',
    imageUrl: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80',
    description: 'Classic French window with iron grid dividers.',
    tags: ['french', 'window', 'classic', 'traditional']
  },
  {
    title: 'Bay Window Design',
    imageUrl: 'https://images.unsplash.com/photo-1600210492493-0946911120ea?w=800&q=80',
    description: 'Elegant bay window with ironwork decorations.',
    tags: ['bay', 'window', 'elegant', 'decorative']
  }
];

// Combine all products with categories
const allProducts = [
  ...gatesImages.map(p => ({ ...p, category: 'gates', isFeatured: true })),
  ...grillImages.map(p => ({ ...p, category: 'grill', isFeatured: true })),
  ...railingImages.map(p => ({ ...p, category: 'railings', isFeatured: true })),
  ...aluminumImages.map(p => ({ ...p, category: 'aluminum', isFeatured: false })),
  ...doorWindowImages.map(p => ({ ...p, category: 'doors', isFeatured: false }))
];

// Sample admin users
const seedUsers = [
  {
    username: 'admin',
    password: 'admin123',
    role: 'admin'
  }
];

// ============================================
// Main Seeding Function
// ============================================
const seedDB = async () => {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/adarsh-gate-grill';
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB Connected...');

    // Clear existing data
    // await Product.deleteMany({});
    // await User.collection.drop().catch(() => {}); // Drop users if exists
    // console.log('🗑️  Existing data cleared...');

    // Insert seed products
    const products = await Product.insertMany(allProducts);
    console.log(`✅ ${products.length} products seeded successfully!`);

    // // Hash passwords for users
    // const salt = await bcrypt.genSalt(10);
    // const hashedUsers = await Promise.all(
    //   seedUsers.map(async (user) => ({
    //     ...user,
    //     password: await bcrypt.hash(user.password, salt)
    //   }))
    // );

    // // Insert users
    // await User.insertMany(hashedUsers);
    // console.log(`✅ User seeded: admin / admin123`);

    // Display summary by category
    const categories = ['gates', 'railings', 'aluminum', 'windows','others'];
    console.log('\n📊 Products by Category:');
    for (const cat of categories) {
      const count = await Product.countDocuments({ category: cat });
      console.log(`   - ${cat}: ${count} products`);
    }

    console.log('\n✨ Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

// Run the seeder
seedDB();
