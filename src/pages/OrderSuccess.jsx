import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import html2canvas from 'html2canvas';
import './OrderSuccess.css';

export default function OrderSuccess() {
    const location = useLocation();
    const navigate = useNavigate();
    const [windowDimension, setWindowDimension] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [isClient, setIsClient] = useState(false);

    // Check if we have order data; if not, someone might have navigated here directly
    const orderData = location.state?.order;
    const billRef = useRef(null);

    // Get screen dimensions for confetti and set client render
    useEffect(() => {
        setIsClient(true);
        const detectSize = () => {
            setWindowDimension({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener('resize', detectSize);
        return () => window.removeEventListener('resize', detectSize);
    }, []);

    // Redirect if no order data
    useEffect(() => {
        if (!orderData) {
            navigate('/');
        }
    }, [orderData, navigate]);

    if (!orderData) return null;

    const handleDownloadBill = async () => {
        if (!billRef.current) return;

        try {
            // Temporarily add a class for PDF rendering
            billRef.current.classList.add('pdf-render-mode');

            // Small delay to allow CSS changes to propagate before capturing
            await new Promise(resolve => setTimeout(resolve, 100));

            const canvas = await html2canvas(billRef.current, {
                scale: 2, // Higher resolution
                useCORS: true,
                backgroundColor: '#ffffff',
                scrollY: -window.scrollY,
                windowWidth: document.documentElement.offsetWidth
            });

            billRef.current.classList.remove('pdf-render-mode');

            const image = canvas.toDataURL('image/png', 1.0);

            // Create a fake link and trigger download
            const link = document.createElement('a');
            link.href = image;
            link.download = `CrunchyHo_Bill_${orderData._id || 'receipt'}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        } catch (err) {
            console.error('Error generating bill screenshot:', err);
            alert('Failed to generate bill download. Please try again.');
            if (billRef.current) billRef.current.classList.remove('pdf-render-mode');
        }
    };

    return (
        <div className="order-success-page">
            {isClient && (
                <Confetti
                    width={windowDimension.width}
                    height={windowDimension.height}
                    recycle={false}
                    numberOfPieces={600}
                    gravity={0.12}
                    colors={['#0f172a', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']}
                />
            )}

            <div className="os-container">
                <div className="os-header animate-fade-in-up">
                    <div className="success-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="os-title">Payment Successful!</h1>
                    <p className="os-subtitle">Thank you. Your order has been placed securely.</p>
                </div>

                {/* Bill Container to be captured */}
                <div ref={billRef} className="bill-card relative-z">
                    <div className="bill-header">
                        <div className="bill-brand">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                <img src="/logo1.jpeg" alt="CrunchyHo" style={{ height: '32px', objectFit: 'contain' }} />
                                <h2>CRUNCHYHO.</h2>
                            </div>
                            <p>Premium Snacks</p>
                        </div>
                        <div className="bill-meta">
                            <h3>INVOICE</h3>
                            <p className="bill-id">#{orderData._id?.substring(0, 8).toUpperCase() || 'N/A'}</p>
                            <p className="bill-date">{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                    </div>

                    <div className="bill-customer-info">
                        <div className="bill-info-block">
                            <h4>Billed To:</h4>
                            <p className="info-name">{orderData.user?.fullName || 'Customer'}</p>
                            <p>{orderData.user?.phone || 'N/A'}</p>
                            <p>{orderData.user?.email || 'N/A'}</p>
                        </div>
                        <div className="bill-info-block text-right">
                            <h4>Shipping Address:</h4>
                            <p>{orderData.user?.address}</p>
                            <p>{orderData.user?.city}, {orderData.user?.state} - {orderData.user?.pincode}</p>
                        </div>
                    </div>

                    <div className="bill-items-section">
                        <h4>Order Summary</h4>
                        <ul className="bill-items-list">
                            {orderData.orderItems?.map((item, index) => (
                                <li key={index} className="bill-item">
                                    <div className="item-details">
                                        <span className="item-name">{item.name}</span>
                                        <span className="item-qty">x {item.qty}</span>
                                    </div>
                                    <span className="item-price">₹{(item.price * item.qty).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bill-footer text-right">
                        <div className="bill-summary-row">
                            <span>Payment Method</span>
                            <span className="badge badge-gray">{orderData.paymentMethod || 'COD'}</span>
                        </div>
                        {orderData.paymentMethod === 'Cashfree' && (
                            <div className="bill-summary-row">
                                <span>Status</span>
                                <span className="badge badge-green">Paid</span>
                            </div>
                        )}
                        <div className="bill-total-row">
                            <span>Total Amount</span>
                            <span className="total-amount-val">₹{orderData.totalAmount?.toFixed(2) || '0.00'}</span>
                        </div>
                    </div>

                    <div className="bill-thankyou">
                        <p>Thank you for shopping with CrunchyHo!</p>
                        <p className="small-text">For support, contact Crunchyho8@gmail.com</p>
                    </div>
                </div>

                <div className="os-actions relative-z">
                    <button onClick={handleDownloadBill} className="os-btn os-btn-primary group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon group-hover-anim" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download Invoice
                    </button>
                    <button onClick={() => navigate('/products')} className="os-btn os-btn-secondary group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
}
