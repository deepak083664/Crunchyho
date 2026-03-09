import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import './Wishlist.css';

export default function Wishlist() {
    const { wishlist, addToCart, toggleWishlist } = useContext(ShopContext);

    if (wishlist.length === 0) {
        return (
            <div className="empty-state container animate-fade-in">
                <h2>Your wishlist is empty</h2>
                <p className="text-muted">Save items you love to view them later.</p>
                <Link to="/" className="btn-primary mt-4">
                    Explore Products <ArrowRight size={18} />
                </Link>
            </div>
        );
    }

    return (
        <div className="wishlist-page container animate-fade-in">
            <h1 className="page-title">My Wishlist ({wishlist.length})</h1>

            <div className="wishlist-grid">
                {wishlist.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={() => addToCart(product)}
                        onToggleWishlist={() => toggleWishlist(product)}
                        isWishlisted={true}
                    />
                ))}
            </div>
        </div>
    );
}
