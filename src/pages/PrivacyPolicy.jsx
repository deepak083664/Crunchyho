import React from 'react';

export default function PrivacyPolicy() {
    return (
        <div className="container animate-fade-in" style={{ padding: '4rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1 className="page-title text-center mb-4">Privacy Policy – CrunchyHo</h1>
            <p className="text-muted text-center mb-8">Last Updated: March 2026</p>

            <div className="policy-content" style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                <p className="mb-4">CrunchyHo values the privacy of its customers and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, store, and protect your information when you visit our website or place an order for our products.</p>
                <p className="mb-6">By using our website and services, you agree to the terms described in this Privacy Policy.</p>

                <h3 className="mb-3" style={{ color: 'var(--text-primary)' }}>1. Business Information</h3>
                <p className="mb-4">CrunchyHo is an online food brand that sells sweets and snacks. All orders are prepared and dispatched from our business location in Jharkhand, India.</p>
                <div className="mb-6" style={{ background: 'var(--surface-color)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                    <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                        <li><strong>Owner Name:</strong> Bipul</li>
                        <li><strong>Brand Name:</strong> CrunchyHo</li>
                        <li><strong>Phone Number:</strong> 88251 81159</li>
                        <li><strong>Email Address:</strong> CrunchyHo@gmail.com</li>
                    </ul>
                    <h4 className="mt-4 mb-2" style={{ color: 'var(--text-primary)' }}>Business Address:</h4>
                    <p style={{ margin: 0 }}>Near Shivaly Mandir<br />Chitarpur – 825101<br />Ramgarh, Jharkhand<br />India</p>
                </div>

                <h3 className="mb-3" style={{ color: 'var(--text-primary)' }}>2. Information We Collect</h3>
                <p className="mb-2">When customers visit our website or place an order, we may collect certain personal information including:</p>
                <ul className="mb-4" style={{ paddingLeft: '2rem', listStyleType: 'disc' }}>
                    <li className="mb-1">Full Name</li>
                    <li className="mb-1">Mobile Phone Number</li>
                    <li className="mb-1">Email Address</li>
                    <li className="mb-1">Delivery Address</li>
                    <li className="mb-1">Order Details</li>
                    <li className="mb-1">Payment Information (processed securely via Razorpay)</li>
                    <li className="mb-1">IP Address and Browser Information</li>
                </ul>
                <p className="mb-6">This information helps us process orders and provide better customer service.</p>

                <h3 className="mb-3" style={{ color: 'var(--text-primary)' }}>3. How We Use Your Information</h3>
                <p className="mb-2">The information we collect from customers may be used for the following purposes:</p>
                <ul className="mb-4" style={{ paddingLeft: '2rem', listStyleType: 'disc' }}>
                    <li className="mb-1">To process and confirm customer orders</li>
                    <li className="mb-1">To deliver products to the correct address</li>
                    <li className="mb-1">To communicate order updates and delivery status</li>
                    <li className="mb-1">To provide customer support</li>
                    <li className="mb-1">To improve our website and services</li>
                    <li className="mb-1">To inform customers about offers, discounts, or new products</li>
                </ul>
                <p className="mb-6">CrunchyHo only uses customer information for legitimate business purposes.</p>

                <h3 className="mb-3" style={{ color: 'var(--text-primary)' }}>4. Payment Processing</h3>
                <p className="mb-4">All payments made on our website are securely processed through Razorpay, a trusted payment gateway provider in India.</p>
                <p className="mb-6">CrunchyHo does not store credit card, debit card, UPI, or banking details on its servers. Payment information is handled securely by Razorpay according to their security standards.</p>

                <h3 className="mb-3" style={{ color: 'var(--text-primary)' }}>5. Data Protection and Security</h3>
                <p className="mb-4">CrunchyHo takes reasonable security measures to protect customer information from unauthorized access, misuse, or disclosure.</p>
                <p className="mb-6">We use secure technologies and trusted service providers to ensure that customer data remains protected.</p>

                <h3 className="mb-3" style={{ color: 'var(--text-primary)' }}>6. Cookies and Tracking</h3>
                <p className="mb-2">Our website may use cookies to improve user experience. Cookies help us:</p>
                <ul className="mb-4" style={{ paddingLeft: '2rem', listStyleType: 'disc' }}>
                    <li className="mb-1">Understand website traffic</li>
                    <li className="mb-1">Remember customer preferences</li>
                    <li className="mb-1">Improve website performance</li>
                </ul>
                <p className="mb-6">Users can choose to disable cookies through their browser settings if they prefer.</p>

                <h3 className="mb-3" style={{ color: 'var(--text-primary)' }}>7. Third-Party Services</h3>
                <p className="mb-2">To provide our services, CrunchyHo may use trusted third-party services such as:</p>
                <ul className="mb-4" style={{ paddingLeft: '2rem', listStyleType: 'disc' }}>
                    <li className="mb-1">Payment gateways (Razorpay)</li>
                    <li className="mb-1">Courier and delivery partners</li>
                    <li className="mb-1">Website hosting services</li>
                </ul>
                <p className="mb-4">These third parties may access limited information only for completing transactions or deliveries.</p>
                <p className="mb-6">CrunchyHo does not sell, rent, or trade customer personal information with third parties for marketing purposes.</p>

                <h3 className="mb-3" style={{ color: 'var(--text-primary)' }}>8. Customer Rights</h3>
                <p className="mb-2">Customers have the right to:</p>
                <ul className="mb-4" style={{ paddingLeft: '2rem', listStyleType: 'disc' }}>
                    <li className="mb-1">Request information about the data we collect</li>
                    <li className="mb-1">Request correction of incorrect information</li>
                    <li className="mb-1">Request deletion of personal data (where applicable)</li>
                </ul>
                <p className="mb-6">Customers can contact us anytime regarding their data.</p>

                <h3 className="mb-3" style={{ color: 'var(--text-primary)' }}>9. Policy Updates</h3>
                <p className="mb-4">CrunchyHo reserves the right to update or modify this Privacy Policy at any time. Any changes will be updated on this page with the revised date.</p>
                <p className="mb-6">Customers are encouraged to review this page periodically.</p>

                <h3 className="mb-3" style={{ color: 'var(--text-primary)' }}>10. Contact Information</h3>
                <p className="mb-4">If you have any questions regarding this Privacy Policy or our services, please contact us:</p>
                <div style={{ background: 'var(--surface-color)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                    <p className="mb-1"><strong>Owner:</strong> Bipul</p>
                    <p className="mb-1"><strong>Brand:</strong> CrunchyHo</p>
                    <p className="mb-1"><strong>Phone:</strong> 88251 81159</p>
                    <p className="mb-4"><strong>Email:</strong> CrunchyHo@gmail.com</p>

                    <p className="mb-1"><strong>Business Address:</strong></p>
                    <p className="mb-1">Near Shivaly Mandir</p>
                    <p className="mb-1">Chitarpur – 825101</p>
                    <p className="mb-1">Ramgarh, Jharkhand</p>
                    <p className="mb-1">India</p>
                </div>
            </div>
        </div>
    );
}
