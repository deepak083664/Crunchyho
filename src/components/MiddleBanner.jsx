import React from 'react';
import './MiddleBanner.css';
import { Star } from 'lucide-react';

const MiddleBanner = () => {
    return (
        <div className="middle-banner-container">
            <div className="middle-banner-track">
                {/* We repeat the content multiple times to ensure smooth infinite scrolling */}
                {[...Array(4)].map((_, index) => (
                    <div key={index} className="banner-content-group">
                        <span className="banner-text highlight">EXCLUSIVE OFFER</span>
                        <Star className="banner-icon" size={16} fill="currentColor" />
                        <span className="banner-text">FLAT 50% OFF ON ALL PRODUCTS</span>
                        <Star className="banner-icon" size={16} fill="currentColor" />
                        <span className="banner-text highlight">NEW ARRIVAL</span>
                        <Star className="banner-icon" size={16} fill="currentColor" />
                        <span className="banner-text">LIMITED TIME SALE</span>
                        <Star className="banner-icon" size={16} fill="currentColor" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MiddleBanner;
