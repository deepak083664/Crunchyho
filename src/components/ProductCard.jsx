import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { addToCart, toggleWishlist, wishlist, resolveImageUrl } = useContext(ShopContext);
    const isWishlisted = wishlist.some(item => (item._id || item.id) === (product._id || product.id));
    const [isExpanded, setIsExpanded] = useState(false);

    const description = product.description || '';
    const shouldTruncate = description.length > 50;

    return (
        <div className="product-card group">
            <div className="product-image-container relative overflow-hidden">
                <img src={resolveImageUrl(product.image)} alt={product.name} className="product-image" loading="lazy" />

                <button
                    className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
                    onClick={() => toggleWishlist(product)}
                    aria-label="Add to wishlist"
                >
                    <Heart size={20} className={isWishlisted ? 'fill-current' : ''} />
                </button>
            </div>

            <div className="product-info">
                <div className="product-rating">
                    <Star size={14} className="star-icon fill-current" />
                    <span>{product.rating || 0}</span>
                </div>

                <h3 className="product-name">{product.name}</h3>
                <div className="product-desc-container">
                    <p className={`product-desc ${isExpanded ? 'expanded' : ''}`}>
                        {description}
                    </p>
                    {shouldTruncate && (
                        <button 
                            className="see-more-btn"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsExpanded(!isExpanded);
                            }}
                        >
                            {isExpanded ? '...see less' : '...see more'}
                        </button>
                    )}
                </div>

                <div className="product-price-container">
                    <span className="product-price-original">
                        Rs. {product.price ? (product.price * 2).toFixed(2) : '0.00'}
                    </span>
                    <span className="product-price">
                        Rs. {product.price ? product.price.toFixed(2) : '0.00'}
                    </span>
                </div>
            </div>

            {/* Add to Cart Overlay revealed on hover */}
            <div className="product-action-overlay">
                <button
                    className="add-to-cart-btn"
                    onClick={() => addToCart(product)}
                >
                    <ShoppingCart size={18} /> Add to Cart
                </button>
            </div>
        </div>
    );
}

export default ProductCard;
