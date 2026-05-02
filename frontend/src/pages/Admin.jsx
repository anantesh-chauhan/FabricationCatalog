import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { categories, shopName } from '../config/siteConfig';
import ProductCard from '../components/ProductCard';
import './Admin.css';

// ============================================
// Admin Component
// @desc    Admin dashboard for managing products
// @route   /admin
// ============================================

function Admin() {
  const navigate = useNavigate();
const { isAuthenticated, logout, login } = useAuth();
  const { products, loading, error, fetchProducts, addProduct, deleteProduct, clearError } = useProducts();
  
  // Login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  
  // Add product form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('gates');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [addingProduct, setAddingProduct] = useState(false);
  const [addError, setAddError] = useState('');
  const [addSuccess, setAddSuccess] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  // ============================================
  // Effects
  // ============================================
  
  // Fetch products when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts('all');
    }
  }, [isAuthenticated, fetchProducts]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigate('/admin');
    }
  }, [isAuthenticated, loading, navigate]);

  // ============================================
  // Login Handler
  // ============================================
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoggingIn(true);
    
    // Use auth context login
    const result = await login(username, password);
    
    if (result.success) {
      // Login successful - context handles state
      navigate('/admin');
    } else {
      setLoginError(result.message || 'Login failed');
    }
    setLoggingIn(false);
  };

  // ============================================
  // Image Change Handler
  // ============================================
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // ============================================
  // Add Product Handler
  // ============================================
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setAddError('');
    setAddSuccess('');
    setAddingProduct(true);
    clearError();
    
    // Create FormData
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('image', image);
    
    // Use context method - handles auth header internally
    const result = await addProduct(formData);
    
    if (result.success) {
      setAddSuccess('Product added successfully!');
      // Reset form
      setTitle('');
      setImage(null);
      setImagePreview(null);
      // Refresh products (already handled in context)
    } else {
      setAddError(result.message || 'Failed to add product');
    }
    setAddingProduct(false);
  };

  // ============================================
  // Delete Product Handler
  // ============================================
  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    setDeletingId(id);
    clearError();
    
    // Use context method - handles auth header internally
    const result = await deleteProduct(id);
    
    if (!result.success) {
      alert(result.message || 'Failed to delete product');
    }
    setDeletingId(null);
  };

  // ============================================
  // Render - Login Form
  // ============================================
  if (!isAuthenticated) {
    return (
      <div className="admin admin-login">
        <div className="container">
          <motion.div 
            className="login-form-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1>Admin Login</h1>
            <p>Enter your credentials to manage products</p>
            
            <form onSubmit={handleLogin} className="login-form">
              {loginError && (
                <motion.div 
                  className="error-message"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {loginError}
                </motion.div>
              )}
              
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loggingIn}
              >
                {loggingIn ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    );
  }

  // ============================================
  // Render - Admin Dashboard
  // ============================================
  return (
    <div className="admin">
      <div className="container">
        {/* Header */}
        <motion.div 
          className="admin-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1>Admin Dashboard</h1>
            <p>Manage your products</p>
          </div>
          <button className="btn btn-secondary" onClick={logout}>
            Logout
          </button>
        </motion.div>

        {/* Add Product Form */}
        <motion.div 
          className="add-product-form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2>Add New Product</h2>
          
          <form onSubmit={handleAddProduct}>
            {addError && (
              <motion.div 
                className="error-message"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {addError}
              </motion.div>
            )}
            
            <AnimatePresence>
              {addSuccess && (
                <motion.div 
                  className="success-message"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {addSuccess}
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="form-row">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Product title"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="gates">Gates</option>
                  <option value="windows">Windows</option>
                  <option value="railings">Railings</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label>Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" />
                </div>
              )}
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={addingProduct || !image}
            >
              {addingProduct ? 'Adding...' : 'Add Product'}
            </button>
          </form>
        </motion.div>

        {/* Products List */}
        <motion.div 
          className="products-list"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2>Products ({products.length})</h2>
          
          {loading && !products.length ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
            </div>
          ) : error ? (
            <div className="error-container">
              <p>{error}</p>
              <button 
                className="btn btn-primary"
                onClick={() => fetchProducts('all')}
              >
                Try Again
              </button>
            </div>
          ) : products.length === 0 ? (
            <div className="empty-container">
              <p>No products yet. Add your first product above.</p>
            </div>
          ) : (
            <div className="grid grid-products">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  showDelete
                  isDeleting={deletingId === product._id}
                  onDelete={handleDeleteProduct}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Admin;
