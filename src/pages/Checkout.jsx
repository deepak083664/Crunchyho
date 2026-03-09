import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
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

    // Script loading mechanism for Razorpay
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
    }, []);

    if (cart.length === 0) {
        // Use a slight delay to allow alert/navigation to settle if coming from a success
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

        // Prepare order payload
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
            paymentMethod,
            totalAmount: cartTotal
        };

        if (paymentMethod === 'COD') {
            const result = await placeOrderBackend(orderData);
            if (result) {
                // Remove alert to make it an automatic, seamless transition
                clearCart();
                navigate('/order-success', { state: { order: result } });
            }
        } else if (paymentMethod === 'Razorpay') {
            try {
                // Create Razorpay Order first
                const rzOrderRes = await fetch(`${import.meta.env.VITE_API_URL}/api/payment/create-order`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ amount: cartTotal, receipt: `rcpt_${Date.now()}` })
                });
                const rzOrder = await rzOrderRes.json();

                const options = {
                    key: "rzp_live_SNUbcQkRDNQr3T", // Standard usage, though should be env var
                    amount: rzOrder.amount,
                    currency: rzOrder.currency,
                    name: "CrunchyHo",
                    description: "Premium Purchase",
                    order_id: rzOrder.id,
                    handler: async function (response) {
                        const verifyRes = await fetch(`${import.meta.env.VITE_API_URL}/api/payment/verify`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                razorpayOrderId: response.razorpay_order_id,
                                razorpayPaymentId: response.razorpay_payment_id,
                                signature: response.razorpay_signature,
                            })
                        });
                        const verified = await verifyRes.json();
                        if (verified.success) {
                            // Provide success information for Razorpay as well
                            clearCart();
                            // We simulate the order object or pass verified.order if returned, 
                            // but typically Razorpay verifies the order and we fetch state or just pass generic data
                            navigate('/order-success', { state: { order: { ...orderData, _id: rzOrder.id, paymentMethod: 'Razorpay' } } });
                        } else {
                            alert("Payment Verification Failed!");
                        }
                    },
                    prefill: {
                        name: shipping.fullName,
                        email: shipping.email,
                        contact: shipping.phone
                    },
                    theme: { color: "#0f172a" }
                };

                const rzp1 = new window.Razorpay(options);
                rzp1.open();

                // Save order as pending in backend, but don't navigate yet since handler handles it
                await placeOrderBackend(orderData);
            } catch (error) {
                console.error("Payment initiation failed", error);
                alert("Payment initiation failed");
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
                            <label className={`payment-option ${paymentMethod === 'Razorpay' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="payment"
                                    value="Razorpay"
                                    checked={paymentMethod === 'Razorpay'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                Pay Online (Razorpay)
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

                        <button type="submit" className="btn-primary w-full mt-4 p-lg">
                            {paymentMethod === 'COD' ? 'Place Order' : `Pay ₹${cartTotal.toFixed(2)}`}
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
