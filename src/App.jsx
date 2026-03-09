import { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ShopProvider, ShopContext } from './context/ShopContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SlideMenu from './components/SlideMenu';
import AnnouncementBar from './components/AnnouncementBar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Admin from './pages/Admin';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import Products from './pages/Products';
import RefundPolicy from './pages/RefundPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import OrderSuccess from './pages/OrderSuccess';
import WhatsAppFloat from './components/WhatsAppFloat';
import CustomerReviews from './components/CustomerReviews';
import MiddleBanner from './components/MiddleBanner';
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Component to conditionally render Navbar and Footer based on route
function LayoutManager({ children, toggleMenu, isMenuOpen }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const { cartCount, wishlist } = useContext(ShopContext);

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <div className="app-container">
      <Navbar
        toggleMenu={toggleMenu}
        cartCount={cartCount}
        wishlistCount={wishlist.length}
      />
      <AnnouncementBar />
      <SlideMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />

      <main className="main-content">
        {children}
      </main>

      <MiddleBanner />
      <CustomerReviews />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <ScrollToTop />
      <LayoutManager toggleMenu={toggleMenu} isMenuOpen={isMenuOpen}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/terms-conditions" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </LayoutManager>
    </Router>
  );
}

function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}

export default App;
