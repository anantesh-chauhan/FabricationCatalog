import { motion } from 'framer-motion';
import './CategoryFilter.css';

const categories = [
  { value: 'all', label: 'All' },
  { value: 'gates', label: 'Gates' },
  { value: 'grill', label: 'Grill' },
  { value: 'railings', label: 'Railings' },
  { value: 'aluminum', label: 'Aluminum' },
  { value: 'doors', label: 'Doors' },
  { value: 'other', label: 'Other' },
];

function CategoryFilter({ selectedCategory, onCategoryChange }) {
  return (
    <div className="category-filter">
      <div className="category-filter-container">
        {categories.map((category, index) => (
          <motion.button
            key={category.value}
            className={`category-btn ${
              selectedCategory === category.value ? 'active' : ''
            }`}
            onClick={() => onCategoryChange(category.value)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.label}
            {selectedCategory === category.value && (
              <motion.div
                className="category-indicator"
                layoutId="category-indicator"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
