import { createContext, useState, useEffect } from 'react';

export const ShopContext = createContext();

export function ShopProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    // Load from local storage and backend on mount
    useEffect(() => {
        try {
            const savedCart = localStorage.getItem('cart');
            const savedWishlist = localStorage.getItem('wishlist');

            if (savedCart && savedCart !== 'undefined') setCart(JSON.parse(savedCart));
            if (savedWishlist && savedWishlist !== 'undefined') setWishlist(JSON.parse(savedWishlist));
        } catch (err) {
            console.error("Error parsing localStorage data:", err);
            // Fallback to empty state
            setCart([]);
            setWishlist([]);
        }

        // Fetch products from backend
        const fetchProducts = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products", error);
            }
        };
        fetchProducts();
    }, []);

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [cart, wishlist]);

    const addToCart = (product) => {
        setCart(prev => {
            const matchId = product._id || product.id;
            const existing = prev.find(item => (item._id || item.id) === matchId);
            if (existing) {
                return prev.map(item => (item._id || item.id) === matchId ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, id: matchId, quantity: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => (item._id || item.id) !== id));
    };

    const updateQuantity = (id, quantity) => {
        if (quantity < 1) return removeFromCart(id);
        setCart(prev => prev.map(item => (item._id || item.id) === id ? { ...item, quantity } : item));
    };

    const toggleWishlist = (product) => {
        setWishlist(prev => {
            const matchId = product._id || product.id;
            const exists = prev.find(item => (item._id || item.id) === matchId);
            if (exists) {
                return prev.filter(item => (item._id || item.id) !== matchId);
            }
            return [...prev, { ...product, id: matchId }];
        });
    };

    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
    };

    // Admin Functions
    const addProduct = async (formData) => {
        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/product/add`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            const data = await res.json();
            if (res.ok) {
                setProducts(prev => [data, ...prev]);
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error("Failed to add product", error);
            throw error;
        }
    };

    const deleteProduct = async (id) => {
        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/product/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.ok) {
                setProducts(prev => prev.filter(p => p._id !== id && p.id !== id));
                removeFromCart(id);
                setWishlist(prev => prev.filter(item => item._id !== id && item.id !== id));
            }
        } catch (error) {
            console.error("Failed to delete product", error);
        }
    };

    const updateProduct = async (id, formData) => {
        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/product/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            const data = await res.json();

            if (res.ok) {
                setProducts(prev => prev.map(p => (p._id === id || p.id === id) ? data : p));
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error("Failed to update product", error);
            throw error;
        }
    };

    // Helper to resolve product image URL
    const resolveImageUrl = (img) => {
        if (!img) return '/images/sample.jpg';
        const API_URL = import.meta.env.VITE_API_URL;
        if (img.startsWith('/uploads') || img.startsWith('uploads/')) {
            const path = img.startsWith('/') ? img : `/${img}`;
            return `${API_URL}${path}`;
        }
        return img;
    };

    return (
        <ShopContext.Provider value={{
            products, cart, wishlist, cartTotal, cartCount, searchQuery,
            addToCart, removeFromCart, updateQuantity, toggleWishlist, clearCart,
            addProduct, deleteProduct, updateProduct, setSearchQuery, resolveImageUrl
        }}>
            {children}
        </ShopContext.Provider>
    );
}
