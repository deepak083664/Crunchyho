import React from 'react';

export default function TermsAndConditions() {
    return (
        <div className="container animate-fade-in" style={{ padding: '4rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1 className="page-title text-center mb-4">Terms and Conditions</h1>
            <p className="text-muted text-center mb-8">Last Updated: March 2026</p>

            <div className="policy-content" style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                <p className="mb-6">Welcome to CrunchyHo. By accessing or using our website and placing an order, you agree to comply with the following Terms and Conditions. Please read them carefully before making a purchase.</p>

                <h3 className="mb-3" style={{ color: 'var(--text-primary)' }}>1. General Information</h3>
                <p className="mb-4">CrunchyHo is an online food brand offering sweets and snacks. All products are prepared and dispatched from our location in Jharkhand.</p>
                <div className="mb-6" style={{ background: 'var(--surface-color)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                    <h4 className="mb-2" style={{ color: 'var(--text-primary)' }}>Business Details:</h4>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        <li><strong>Name:</strong> Bipul</li>
                        <li><strong>Brand:</strong> CrunchyHo</li>
                        <li><strong>Phone:</strong> 88251 81159</li>
                        <li><strong>Email:</strong> CrunchyHo@gmail.com</li>
                    </ul>
                    <h4 className="mt-4 mb-2" style={{ color: 'var(--text-primary)' }}>Dispatch Address:</h4>
                    <p style={{ margin: 0 }}>Near Shivaly Mandir<br />Chitarpur – 825101<br />Ramgarh, Jharkhand, India</p>
                </div>

                <h3 className="mb-3" style={{ color: 'var(--text-primary)' }}>2. Product Information</h3>
                <p className="mb-6">We ensure that all our sweets and snacks are prepared following proper hygiene and quality standards. Product packaging includes important details such as Best Before Date and storage instructions, which customers are advised to follow.</p>

                <h3 className="mb-3" style={{ color: 'var(--text-primary)' }}>3. Orders and Payments</h3>
                <ul className="mb-6" style={{ paddingLeft: '2rem', listStyleType: 'disc' }}>
                    <li className="mb-1">Orders placed on the website will be confirmed only after successful payment.</li>
                    <li className="mb-1">All online payments are securely processed through Razorpay payment gateway.</li>
                    <li className="mb-1">In case of payment failure or incomplete transactions, the order will not be processed.</li>
                </ul>

                <h3 className="mb-3" style={{ color: 'var(--text-primary)' }}>4. Shipping and Delivery</h3>
                <ul className="mb-6" style={{ paddingLeft: '2rem', listStyleType: 'disc' }}>
                    <li className="mb-1">All orders are dispatched from Chitarpur, Ramgarh, Jharkhand.</li>
                    <li className="mb-1">Delivery timelines may vary depending on the customer’s location.</li>
                    <li className="mb-1">Estimated delivery time is usually 3–5 business days.</li>
                    <li className="mb-1">In case of unexpected delays due to logistics or other factors, customers will be informed accordingly.</li>
                </ul>

                <h3 className="mb-3" style={{ color: 'var(--text-primary)' }}>5. Cancellation and Refund</h3>
                <p className="mb-4">Due to the perishable nature of food products, returns and refunds are generally not accepted once the product package has been opened.</p>
                <p className="mb-2">However, if:</p>
                <ul className="mb-4" style={{ paddingLeft: '2rem', listStyleType: 'disc' }}>
                    <li className="mb-1">The product received is damaged, or</li>
                    <li className="mb-1">A wrong product has been delivered</li>
                </ul>
                <p className="mb-6">Customers must contact us within 24 hours of delivery with clear photos of the product. After verification, we will provide an appropriate resolution.</p>

                <h3 className="mb-3" style={{ color: 'var(--text-primary)' }}>6. Pricing</h3>
                <p className="mb-6">All prices mentioned on the website are in Indian Rupees (INR). CrunchyHo reserves the right to update or change product prices and availability without prior notice.</p>

                <h3 className="mb-3" style={{ color: 'var(--text-primary)' }}>7. Limitation of Liability</h3>
                <p className="mb-6">CrunchyHo shall not be responsible for delays caused by courier partners, natural events, or circumstances beyond our control.</p>

                <h3 className="mb-3" style={{ color: 'var(--text-primary)' }}>8. Contact Information</h3>
                <p className="mb-4">For any queries related to orders, payments, or policies, customers can contact us:</p>
                <div style={{ background: 'var(--surface-color)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                    <p className="mb-1"><strong>Name:</strong> Bipul</p>
                    <p className="mb-1"><strong>Phone:</strong> 88251 81159</p>
                    <p className="mb-3"><strong>Email:</strong> CrunchyHo@gmail.com</p>
                    <p className="mb-0"><strong>Address:</strong> Near Shivaly Mandir, Chitarpur – 825101, Ramgarh, Jharkhand, India</p>
                </div>
            </div>
        </div>
    );
}
