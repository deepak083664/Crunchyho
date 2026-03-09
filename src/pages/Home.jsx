import { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import HeroSlider from '../components/HeroSlider';
import ProductCard from '../components/ProductCard';
import './Home.css';

const CATEGORIES = ["All", "Shirts", "Shoes", "Electronics", "Accessories"];

export default function Home() {
    const [activeCategory, setActiveCategory] = useState("All");
    const { products, addToCart, toggleWishlist, wishlist, searchQuery } = useContext(ShopContext);

    const filteredProducts = products.filter(p => {
        const matchesCategory = activeCategory === "All" || p.category === activeCategory;
        const matchesSearch = p.name.toLowerCase().includes((searchQuery || '').toLowerCase()) ||
            p.description.toLowerCase().includes((searchQuery || '').toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const isProductWishlisted = (id) => {
        return wishlist.some(item => (item._id || item.id) === id);
    };

    return (
        <div className="home-page animate-fade-in">
            <HeroSlider />

            <section className="container products-section">
                <div className="section-header">
                    <div className="title-wrapper">
                        <h2 className="section-title">OUR PRODUCTS</h2>
                        <div className="animated-sale-badge">
                            <span className="badge-dot"></span>
                            <span className="badge-text">EXCLUSIVE OFFER</span>
                        </div>
                    </div>
                </div>

                <div className="product-grid animate-slide-up" key={activeCategory}>
                    {filteredProducts.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={() => addToCart(product)}
                            onToggleWishlist={() => toggleWishlist(product)}
                            isWishlisted={isProductWishlisted(product._id || product.id)}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
