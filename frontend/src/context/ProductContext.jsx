import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { api as apiConfig, shopName } from '../config/siteConfig';

const ProductContext = createContext(null);

// ============================================
// Base URL configuration from config
// ============================================
const BASE_URL = apiConfig.baseURL;

export function ProductProvider({ children }) {
  // State
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // ============================================
// Helper: Create axios instance with interceptors
// ============================================
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // 30 seconds for file uploads
});

// Request interceptor - add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

// ============================================
// Fetch Products
// @desc    Get all products with optional category filter
// @route   GET /api/products
// ============================================
  const fetchProducts = useCallback(async (category = 'all') => {
    setLoading(true);
    setError(null);
    
    try {
      const params = category !== 'all' ? { category } : {};
      const response = await api.get('/products', { params });
      setProducts(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch products when category changes
  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory, fetchProducts]);

  // ============================================
// Fetch Single Product by ID
// @desc    Get single product by ID for detail page
// @route   GET /api/products/:id
// ============================================
  const fetchProductById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to fetch product';
      setError(message);
      console.error('Error fetching product:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // ============================================
// Add Product with Image Upload
// @desc    Create new product with image upload
// @route   POST /api/products
// @access  Private (Admin)
// ============================================
const addProduct = async (formData) => {
  setLoading(true);
  setError(null);
  
  try {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required. Please login first.');
    }
    
    // ============================================
// DEBUG: Log what we're about to upload
// ============================================
console.log('📤 Uploading product...');
console.log('📋 FormData contents:');
for (let [key, value] of formData.entries()) {
  if (value instanceof File) {
    console.log(`  ${key}: ${value.name} (${value.size} bytes, ${value.type})`);
  } else {
    console.log(`  ${key}: ${value}`);
  }
}

    // ============================================
// IMPORTANT: Send as multipart/form-data
// Content-Type is auto-set by axios when using FormData
// ============================================
    const response = await api.post('/products', formData, {
      headers: {
        // Do NOT set Content-Type manually!
        // Axios will auto-set with correct boundary
      },
    });
    
    const product = response.data;
    
    // Add to products list (newest first)
    setProducts((prev) => [product, ...prev]);
    
    console.log('✅ Product uploaded successfully:', product._id);
    return { success: true, product };
  } catch (err) {
    console.error('❌ Error uploading product:', err);
    const message = err.response?.data?.message || err.message || 'Failed to add product';
    setError(message);
    return { success: false, message };
  } finally {
    setLoading(false);
  }
};

  // ============================================
// Delete Product
// @desc    Delete product by ID
// @route   DELETE /api/products/:id
// @access  Private (Admin)
// ============================================
  const deleteProduct = async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required');
      }
      
      await api.delete(`/products/${id}`);
      
      // Remove from products list
      setProducts((prev) => prev.filter((p) => p._id !== id));
      
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to delete product';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // ============================================
// Clear Error
// ============================================
  const clearError = () => setError(null);

  // ============================================
// Context Value
// ============================================
  const value = {
    // State
    products,
    loading,
    error,
    selectedCategory,
    
// Actions
    setSelectedCategory,
    fetchProducts,
    fetchProductById,
    addProduct,
    deleteProduct,
    clearError,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

// ============================================
// Custom Hook
// ============================================
export function useProducts() {
  const context = useContext(ProductContext);
  
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  
  return context;
}

export default ProductContext;
