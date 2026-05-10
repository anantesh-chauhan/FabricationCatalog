import { motion } from 'framer-motion';
import {
  ShieldCheck,
  HardHat,
  LayoutGrid,
  TrendingUp,
  Clock,
} from 'lucide-react';

import './WhyChooseUs.css';

const trustItems = [
  {
    id: 1,
    icon: ShieldCheck,
    title: 'Strong Material',
    description: 'Built with quality steel to resist daily wear and long-term impact.',
  },
  {
    id: 2,
    icon: HardHat,
    title: 'Durable Welding',
    description: 'Precision welding for clean finishing, strength, and reliable performance.',
  },
  {
    id: 3,
    icon: LayoutGrid,
    title: 'Modern Designs',
    description: 'Premium gate, railing, and grill designs tailored to your property style.',
  },
  {
    id: 4,
    icon: TrendingUp,
    title: 'Affordable Pricing',
    description: 'Premium output at a practical budget with transparent value.',
  },
  {
    id: 5,
    icon: Clock,
    title: 'Timely Delivery',
    description: 'On-time planning and execution—so your project stays on schedule.',
  },
];

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 220, damping: 18 },
  },
};

function WhyChooseUs() {
  return (
    <section className="why-choose-us">
      <div className="container">
        <motion.div
          className="why-header"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <h2>Why Choose Us</h2>
          <p>
            Industrial strength, premium finishing, and dependable service—built for a lifetime.
          </p>
        </motion.div>

        <motion.div
          className="why-grid"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                className="why-card"
                variants={cardVariants}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 240, damping: 20 }}
              >
                <div className="why-card-icon" aria-hidden="true">
                  <Icon size={22} strokeWidth={2.2} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default WhyChooseUs;

