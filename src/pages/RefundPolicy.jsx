import React from 'react';

export default function RefundPolicy() {
    return (
        <div className="container animate-fade-in" style={{ padding: '4rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1 className="page-title text-center mb-4">Refund / Cancellation Policy – CrunchyHo</h1>
            <p className="text-muted text-center mb-8">Last Updated: March 2026</p>

            <div className="policy-content" style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                <p className="mb-6">At CrunchyHo, we strive to deliver fresh and high-quality sweets and snacks to our customers. Since our products are food items, certain conditions apply to cancellations, returns, and refunds. Please read this policy carefully before placing an order.</p>

                <h3 className="mb-3" style={{ color: 'var(--text-primary)' }}>1. Order Cancellation</h3>
                <p className="mb-4">Customers may cancel their order only before the order has been processed or dispatched.</p>
                <p className="mb-6">If you wish to cancel your order, please contact us immediately using the contact details provided below. Once the order has been processed or shipped, cancellation may not be possible.</p>

                <h3 className="mb-3" style={{ color: 'var(--text-primary)' }}>2. Refund Policy</h3>
                <p className="mb-2">Refunds are only applicable under the following circumstances:</p>
                <ul className="mb-4" style={{ paddingLeft: '2rem', listStyleType: 'disc' }}>
                    <li className="mb-1">The product received is damaged during delivery</li>
                    <li className="mb-1">The wrong product has been delivered</li>
                    <li className="mb-1">The product is missing from the order</li>
                </ul>
                <p className="mb-4">In such cases, customers must inform us within 24 hours of delivery with clear photos of the product and packaging.</p>
                <p className="mb-2">After verification, CrunchyHo will either:</p>
                <ul className="mb-6" style={{ paddingLeft: '2rem', listStyleType: 'disc' }}>
                    <li className="mb-1">Provide a replacement product, or</li>
                    <li className="mb-1">Issue a refund to the original payment method.</li>
                </ul>

                <h3 className="mb-3" style={{ color: 'var(--text-primary)' }}>3. Non-Refundable Situations</h3>
                <p className="mb-2">Refunds or returns will not be accepted in the following cases:</p>
                <ul className="mb-4" style={{ paddingLeft: '2rem', listStyleType: 'disc' }}>
                    <li className="mb-1">If the product package has been opened or consumed</li>
                    <li className="mb-1">If the complaint is made after 24 hours of delivery</li>
                    <li className="mb-1">If the delivery address was entered incorrectly by the customer</li>
                    <li className="mb-1">If delivery failed due to customer unavailability</li>
                </ul>
                <p className="mb-6">Since our products are perishable food items, we cannot accept returns once the package has been opened.</p>

                <h3 className="mb-3" style={{ color: 'var(--text-primary)' }}>4. Refund Processing Time</h3>
                <p className="mb-2">If a refund is approved, it will be processed within 5–7 business days.</p>
                <p className="mb-6">All refunds will be issued through the original payment method used during checkout, which is processed securely via Razorpay payment gateway.</p>

                <h3 className="mb-3" style={{ color: 'var(--text-primary)' }}>5. Order Issues and Support</h3>
                <p className="mb-6">If you face any issues with your order, please contact us immediately. Our team will review the situation and try to resolve the issue as quickly as possible.</p>

                <h3 className="mb-3" style={{ color: 'var(--text-primary)' }}>6. Contact Information</h3>
                <p className="mb-1"><strong>Owner:</strong> Bipul</p>
                <p className="mb-1"><strong>Brand:</strong> CrunchyHo</p>
                <p className="mb-1"><strong>Phone:</strong> 88251 81159</p>
                <p className="mb-4"><strong>Email:</strong> CrunchyHo@gmail.com</p>

                <p className="mb-1"><strong>Dispatch Address:</strong></p>
                <p className="mb-1">Near Shivaly Mandir</p>
                <p className="mb-1">Chitarpur – 825101</p>
                <p className="mb-1">Ramgarh, Jharkhand</p>
                <p className="mb-1">India</p>
            </div>
        </div>
    );
}
