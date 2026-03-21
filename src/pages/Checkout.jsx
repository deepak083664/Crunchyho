import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { load } from '@cashfreepayments/cashfree-js';
import './Checkout.css';

export default function Checkout() {
    const { cart, cartTotal, clearCart, resolveImageUrl } = useContext(ShopContext);
    const navigate = useNavigate();

    const [shipping, setShipping] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: ''
    });

    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [loading, setLoading] = useState(false);

    if (cart.length === 0) {
        const timer = setTimeout(() => {
            if (window.location.pathname === '/checkout') {
                navigate('/cart');
            }
        }, 100);
        return null;
    }

    const handleChange = (e) => {
        setShipping({ ...shipping, [e.target.name]: e.target.value });
    };

    const placeOrderBackend = async (orderData) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });
            return await res.json();
        } catch (error) {
            console.error("Order error", error);
            alert("Failed to place order");
        }
    };

    const handleCheckout = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Prepare order items
        const orderItems = cart.map(item => ({
            name: item.name,
            qty: item.quantity,
            image: item.image,
            price: item.price,
            product: item._id || item.id
        }));

        const orderData = {
            orderItems,
            user: shipping,
            paymentMethod: paymentMethod === 'Online' ? 'Cashfree' : 'COD',
            totalAmount: cartTotal
        };

        if (paymentMethod === 'COD') {
            const result = await placeOrderBackend(orderData);
            if (result) {
                clearCart();
                navigate('/order-success', { state: { order: result } });
            }
            setLoading(false);
        } else if (paymentMethod === 'Online') {
            try {
                // 1. Prepare and validate payload
                const payload = {
                    amount: Number(cartTotal),
                    customer_details: {
                        customer_phone: shipping.phone.trim(),
                        customer_email: shipping.email.trim(),
                        customer_name: shipping.fullName.trim(),
                        customer_id: shipping.phone.trim() // Using phone as unique ID
                    }
                };

                console.log("FRONTEND Payment Payload:", payload);

                // Validation checks
                if (isNaN(payload.amount) || payload.amount <= 0) {
                    alert("Invalid cart total. Please refresh.");
                    setLoading(false);
                    return;
                }

                const phoneRegex = /^[0-9]{10}$/;
                if (!phoneRegex.test(payload.customer_details.customer_phone)) {
                    alert("Please enter a valid 10-digit phone number.");
                    setLoading(false);
                    return;
                }

                if (!payload.customer_details.customer_email || !payload.customer_details.customer_email.includes('@')) {
                    alert("Please enter a valid email address.");
                    setLoading(false);
                    return;
                }

                // 2. Create Order in Backend to get payment session ID
                const cfOrderRes = await fetch(`${import.meta.env.VITE_API_URL}/api/payment/create-order`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                const data = await cfOrderRes.json();
                
                console.log("Backend Response:", data);

                if (!data.payment_session_id) {
                    console.log("Full Backend Error Data:", data);
                    alert("Critical Debug Info: " + JSON.stringify(data.debugData || data.error || data));
                    throw new Error(data.message || "Failed to create payment session");
                }

                // 3. Save order as pending in backend before redirecting
                await placeOrderBackend({
                    ...orderData,
                    cfOrderId: data.order_id
                });

                // 4. Redirect to Cashfree Payment Page
                const cashfree = await load({
                    mode: "production" // Use production for live, sandbox for test
                });
                cashfree.checkout({
                    paymentSessionId: data.payment_session_id,
                    redirectTarget: "_self"
                });

            } catch (error) {
                console.error("Payment initiation failed", error);
                alert("Payment initiation failed: " + error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="checkout-page container animate-fade-in">
            <h1 className="page-title">Checkout</h1>

            <div className="checkout-grid">
                <div className="checkout-form-container">
                    <h3>Shipping Address</h3>
                    <form onSubmit={handleCheckout} className="checkout-form">
                        <div className="form-group">
                            <label>Full Name</label>
                            <input type="text" name="fullName" required value={shipping.fullName} onChange={handleChange} />
                        </div>
                        <div className="form-grid-2">
                            <div className="form-group">
                                <label>Email Address</label>
                                <input type="email" name="email" required value={shipping.email} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input type="tel" name="phone" required value={shipping.phone} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <textarea name="address" required value={shipping.address} onChange={handleChange}></textarea>
                        </div>
                        <div className="form-grid-2">
                            <div className="form-group">
                                <label>City</label>
                                <input type="text" name="city" required value={shipping.city} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>State</label>
                                <input type="text" name="state" required value={shipping.state} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Pincode</label>
                            <input type="text" name="pincode" required value={shipping.pincode} onChange={handleChange} />
                        </div>

                        <h3 className="mt-4">Payment Method</h3>
                        <div className="payment-options">
                            <label className={`payment-option ${paymentMethod === 'Online' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="payment"
                                    value="Online"
                                    checked={paymentMethod === 'Online'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                Pay Online (Cashfree)
                            </label>
                            <label className={`payment-option ${paymentMethod === 'COD' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="payment"
                                    value="COD"
                                    checked={paymentMethod === 'COD'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                Cash On Delivery
                            </label>
                        </div>

                        <button type="submit" className="btn-primary w-full mt-4 p-lg" disabled={loading}>
                            {loading ? 'Processing...' : (paymentMethod === 'COD' ? 'Place Order' : `Pay ₹${cartTotal.toFixed(2)}`)}
                        </button>
                    </form>
                </div>

                <div className="checkout-summary">
                    <h3>Order Details</h3>
                    <div className="checkout-items">
                        {cart.map(item => (
                            <div key={item._id || item.id} className="checkout-item">
                                <img src={resolveImageUrl(item.image)} alt={item.name} />
                                <div className="checkout-item-info">
                                    <h4>{item.name}</h4>
                                    <p>Qty: {item.quantity}</p>
                                </div>
                                <div className="checkout-item-price">₹{(item.price * item.quantity).toFixed(2)}</div>
                            </div>
                        ))}
                    </div>
                    <div className="summary-row total mt-4">
                        <span>Total to Pay</span>
                        <span>₹{cartTotal.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
