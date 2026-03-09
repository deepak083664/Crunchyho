import { Mail, Phone } from 'lucide-react';
import './Contact.css';

export default function Contact() {
    return (
        <div className="contact-page animate-fade-in">
            <div className="container">
                <div className="contact-header text-center">
                    <h1 className="page-title">Contact <span className="text-gradient">Us</span></h1>
                    <p className="text-muted text-lg mt-2">We'd love to hear from you</p>
                </div>

                <div className="contact-content mt-8 grid-2">
                    <div className="contact-form-container">
                        <h2>Send a Message</h2>
                        <form className="contact-form mt-4" onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}>
                            <div className="form-group">
                                <label>Your Name</label>
                                <input type="text" placeholder="John Doe" required className="search-input" />
                            </div>
                            <div className="form-group">
                                <label>Your Email</label>
                                <input type="email" placeholder="john@example.com" required className="search-input" />
                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <textarea rows="5" placeholder="How can we help you?" required className="search-input"></textarea>
                            </div>
                            <button type="submit" className="btn-primary w-full mt-4 p-lg">Send Message</button>
                        </form>
                    </div>

                    <div className="contact-info-container">
                        <h2>Get in Touch</h2>
                        <p className="text-muted mt-4 mb-6">
                            Have questions about our products, orders, or policies?
                            Reach out to us directly through the information below.
                        </p>

                        <div className="info-cards">
                            <div className="info-card">
                                <div className="info-icon"><Mail size={24} /></div>
                                <div>
                                    <h3>Email Us</h3>
                                    <p className="text-muted text-lg mt-1">Crunchyho8@gmail.com</p>
                                </div>
                            </div>

                            <div className="info-card">
                                <div className="info-icon"><Phone size={24} /></div>
                                <div>
                                    <h3>Call Us</h3>
                                    <p className="text-muted text-lg mt-1">8825181159</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
