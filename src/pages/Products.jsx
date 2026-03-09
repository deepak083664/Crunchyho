import { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import './Products.css';

const CATEGORIES = ["All", "Shirts", "Shoes", "Electronics", "Accessories"];

export default function Products() {
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
        <div className="products-page animate-fade-in">
            <div className="products-banner">
                <div className="container">
                    <h1 className="page-title text-center" style={{ color: 'white' }}>Our Collections</h1>
                    <p className="text-center mt-2" style={{ color: '#e2e8f0' }}>Quality meets elegance</p>
                </div>
            </div>

            <div className="container mt-8 mb-8">

                {filteredProducts.length === 0 ? (
                    <div className="text-center text-muted mt-8">
                        <h2>No products found</h2>
                        <p>Try adjusting your search or category filter.</p>
                    </div>
                ) : (
                    <div className="product-grid animate-slide-up" key={activeCategory}>
                        {filteredProducts.map(product => (
                            <ProductCard
                                key={product._id || product.id}
                                product={product}
                                onAddToCart={() => addToCart(product)}
                                onToggleWishlist={() => toggleWishlist(product)}
                                isWishlisted={isProductWishlisted(product._id || product.id)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
