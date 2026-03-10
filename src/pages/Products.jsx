import { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import './Products.css';

const CATEGORIES = ["All", "Shirts", "Shoes", "Electronics", "Accessories"];

export default function Products() {
    const [activeCategory, setActiveCategory] = useState("All");
    const { addToCart, toggleWishlist, wishlist, searchQuery } = useContext(ShopContext);
    
    // State for local caching and fetching
    const [localProducts, setLocalProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            setError(null);
            
            try {
                // 1. Check if "products" data exists in localStorage
                const cachedProducts = localStorage.getItem('products');
                
                if (cachedProducts) {
                    // 2. If products exist in localStorage, load them directly
                    setLocalProducts(JSON.parse(cachedProducts));
                    setIsLoading(false);
                    return; // Skip API call
                }
                
                // 3. Fetch products from the API endpoint
                const url = `${import.meta.env.VITE_API_URL}/api/products`;
                const response = await fetch(url);
                
                if (!response.ok) {
                    throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
                }
                
                const data = await response.json();
                
                let fetchedProducts = [];
                // Handle different JSON structures safely
                if (data && data.success && Array.isArray(data.products)) {
                    fetchedProducts = data.products;
                } else if (Array.isArray(data)) {
                    fetchedProducts = data;
                } else {
                    throw new Error("Invalid data format received from API");
                }
                
                // Update React state
                setLocalProducts(fetchedProducts);
                
                // 4. Store the result in localStorage for future use
                localStorage.setItem('products', JSON.stringify(fetchedProducts));
                
            } catch (err) {
                console.error("Error fetching products:", err);
                setError(err.message || 'Failed to load products');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = localProducts.filter(p => {
        const matchesCategory = activeCategory === "All" || p.category === activeCategory;
        const matchesSearch = p.name?.toLowerCase().includes((searchQuery || '').toLowerCase()) ||
            p.description?.toLowerCase().includes((searchQuery || '').toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const isProductWishlisted = (id) => {
        return wishlist.some(item => (item._id || item.id) === id);
    };

    // Skeleton UI while loading
    const renderSkeleton = () => (
        <div className="product-grid animate-fade-in">
            {[...Array(8)].map((_, index) => (
                <div key={index} className="product-card skeleton-card shadow-sm border border-gray-100 rounded-lg p-3">
                    <div className="skeleton-image bg-gray-200 animate-pulse rounded-md" style={{ width: '100%', aspectRatio: '3/4' }}></div>
                    <div className="product-info mt-4">
                        <div className="bg-gray-200 animate-pulse rounded h-5 mb-2 w-3/4"></div>
                        <div className="bg-gray-200 animate-pulse rounded h-4 mb-3 w-1/2"></div>
                        <div className="bg-gray-200 animate-pulse rounded h-6 w-1/3"></div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="products-page animate-fade-in">
            <div className="products-banner">
                <div className="container">
                    <h1 className="page-title text-center" style={{ color: 'white' }}>Our Collections</h1>
                    <p className="text-center mt-2" style={{ color: '#e2e8f0' }}>Quality meets elegance</p>
                </div>
            </div>

            <div className="container mt-8 mb-8">
                {isLoading ? (
                    renderSkeleton()
                ) : error ? (
                    <div className="text-center text-red-500 mt-8 p-6 bg-red-50 rounded-lg">
                        <h2 className="text-xl font-bold">Oops! Something went wrong.</h2>
                        <p className="mt-2">{error}</p>
                        <button 
                            className="mt-4 px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                            onClick={() => {
                                localStorage.removeItem('products');
                                window.location.reload();
                            }}
                        >
                            Try Again
                        </button>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center text-muted mt-8 p-6">
                        <h2 className="text-xl">No products found</h2>
                        <p className="mt-2">Try adjusting your search or category filter.</p>
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
