import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Designs from './pages/Gallery';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Team from './pages/Team';
import Admin from './pages/Admin';
import Contact from './pages/Contact';
import './index.css';

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="app">
      {/* Wrap with AuthProvider for authentication state */}
      <AuthProvider>
        {/* Wrap with ProductProvider for products state */}
        <ProductProvider>
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/designs" element={<Designs />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/team" element={<Team />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </ProductProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
