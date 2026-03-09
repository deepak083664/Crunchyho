import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', textDecoration: 'none' }}>
                            <img src="/logo1.jpeg" alt="CrunchyHo" style={{ height: '40px', objectFit: 'contain' }} />
                            <span className="logo-text">CrunchyHo</span>
                        </Link>
                        <p className="text-muted">A delicious and addictive snack – once you start eating CrunchyHo, it’s hard to stop.</p>
                        <div className="social-links">
                            <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
                            <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
                            <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
                            <a href="#" aria-label="Youtube"><Youtube size={20} /></a>
                        </div>
                    </div>

                    <div className="footer-nav">
                        <div className="footer-column">
                            <h3>Shop</h3>
                            <Link to="/products">All Products</Link>
                            <Link to="/products">New Arrivals</Link>
                            <Link to="/products">Special Offers</Link>
                        </div>

                        <div className="footer-column">
                            <h3>Company</h3>
                            <Link to="/about">About Us</Link>
                            <Link to="/contact">Contact</Link>
                            <Link to="/terms-conditions">Terms & Conditions</Link>
                        </div>

                        <div className="footer-column">
                            <h3>Support</h3>
                            <Link to="/refund-policy">Shipping & Returns</Link>
                            <Link to="/refund-policy">Refund Policy</Link>
                            <Link to="/privacy-policy">Privacy Policy</Link>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} CrunchyHo All rights reserved.</p>
                    <p className="powered-by">
                        powered by <a href="https://launchliftx.com/" target="_blank" rel="noopener noreferrer" className="launchlift-link">LaunchLiftx</a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
