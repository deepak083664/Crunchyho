import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import './SlideMenu.css';

export default function SlideMenu({ isOpen, toggleMenu }) {
    return (
        <>
            <div
                className={`menu-overlay ${isOpen ? 'open' : ''}`}
                onClick={toggleMenu}
            ></div>

            <aside className={`slide-menu ${isOpen ? 'open' : ''}`}>
                <div className="menu-header">
                    <img src="/logo1.jpeg" alt="CrunchyHo" style={{ height: '36px', objectFit: 'contain' }} />
                    <button className="close-btn" onClick={toggleMenu} aria-label="Close Menu">
                        <X size={24} />
                    </button>
                </div>

                <nav className="menu-links">
                    <Link to="/" onClick={toggleMenu}>Home</Link>
                    <Link to="/products" onClick={toggleMenu}>Products</Link>
                    <Link to="/about" onClick={toggleMenu}>About</Link>
                    <Link to="/contact" onClick={toggleMenu}>Contact</Link>
                </nav>

                <div className="menu-footer">
                    <Link to="/admin" onClick={toggleMenu} className="admin-link">
                        Admin Dashboard
                    </Link>
                    <div className="powered-by-mobile">
                        powered by <a href="https://launchliftx.com/" target="_blank" rel="noopener noreferrer" className="launchlift-link">LaunchLiftx</a>
                    </div>
                </div>
            </aside>
        </>
    );
}
