import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import './Cart.css';

export default function Cart() {
    const { cart, updateQuantity, removeFromCart, cartTotal, resolveImageUrl } = useContext(ShopContext);

    if (cart.length === 0) {
        return (
            <div className="empty-state container animate-fade-in">
                <h2>Your cart is empty</h2>
                <p className="text-muted">Looks like you haven't added anything to your cart yet.</p>
                <Link to="/" className="btn-primary mt-4">
                    Start Shopping <ArrowRight size={18} />
                </Link>
            </div>
        );
    }

    return (
        <div className="cart-page container animate-fade-in">
            <h1 className="page-title">Shopping Cart</h1>

            <div className="cart-content">
                <div className="cart-items">
                    {cart.map(item => (
                        <div className="cart-item" key={item.id}>
                            <img src={resolveImageUrl(item.image)} alt={item.name} className="cart-item-image" />

                            <div className="cart-item-details">
                                <h3 className="cart-item-name">{item.name}</h3>
                                <p className="cart-item-price">₹{item.price.toFixed(2)}</p>

                                <div className="cart-item-actions">
                                    <div className="quantity-controls">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                            <Minus size={16} />
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                            <Plus size={16} />
                                        </button>
                                    </div>

                                    <button
                                        className="delete-btn"
                                        onClick={() => removeFromCart(item.id)}
                                        aria-label="Remove item"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                            ₹{(item.price * item.quantity).toFixed(2)}
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <h3>Order Summary</h3>
                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>₹{cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>
                    <div className="summary-row total">
                        <span>Total</span>
                        <span>₹{cartTotal.toFixed(2)}</span>
                    </div>
                    <Link to="/checkout" className="btn-primary checkout-btn" style={{ display: 'flex' }}>
                        Order Now
                    </Link>
                </div>
            </div>
        </div>
    );
}
