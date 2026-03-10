import { Menu, ShoppingCart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ toggleMenu, cartCount, wishlistCount }) {

  return (
    <header className="navbar">
      <div className="navbar-content" style={{ padding: '0 1rem', width: '100%' }}>
        <div className="nav-left">
          <Link to="/" className="logo">
            <img src="/logo1.jpeg" alt="Crunchyho" className="logo-img" />
            <span className="logo-text">Crunchyho</span>
          </Link>
        </div>

        <nav className="nav-center hidden-mobile">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/products" className="nav-link">Products</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <Link to="/admin" className="nav-link">Admin</Link>
        </nav>



        <div className="nav-right">
          <Link to="/wishlist" className="nav-icon" title="Wishlist">
            <Heart size={24} />
            {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
          </Link>
          <Link to="/cart" className="nav-icon cart-anim" title="Cart">
            <ShoppingCart size={24} />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </Link>
          <button className="nav-icon hamburger" onClick={toggleMenu} aria-label="Menu">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header >
  );
}
