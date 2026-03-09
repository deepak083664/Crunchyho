import React from 'react';
import { Star } from 'lucide-react';
import './CustomerReviews.css';

const REVIEWS = [
    {
        id: 1,
        name: "Rahul M.",
        role: "Food Blogger",
        content: "Absolutely love the snacks from CrunchyHo! The quality is top-notch and the flavors are incredibly authentic. My new favorite munching partner.",
        rating: 5,
        avatar: "R"
    },
    {
        id: 2,
        name: "Sneha P.",
        role: "Regular Customer",
        content: "The packaging is premium and the taste is just wow. Ordered the festive pack for my family and everyone loved it. Highly recommended!",
        rating: 5,
        avatar: "S"
    },
    {
        id: 3,
        name: "Vikram S.",
        role: "Verified Buyer",
        content: "Very fast delivery and the snacks were extremely fresh and crunchy. You can tell they use premium ingredients.",
        rating: 4,
        avatar: "V"
    },
    {
        id: 4,
        name: "Priya K.",
        role: "Verified Buyer",
        content: "Perfect snacks for evening tea! The balance of spices is brilliant. Will definitely be ordering more soon.",
        rating: 5,
        avatar: "P"
    },
    {
        id: 5,
        name: "Amit J.",
        role: "Food Enthusiast",
        content: "I've tried many snack brands, but CrunchyHo stands out for their unique flavors and amazing quality control.",
        rating: 5,
        avatar: "A"
    }
];

const ReviewCard = ({ review }) => {
    return (
        <div className="review-card">
            <div className="review-header">
                <div className="review-avatar">{review.avatar}</div>
                <div className="review-meta">
                    <h4 className="reviewer-name">{review.name}</h4>
                    <span className="reviewer-role">{review.role}</span>
                </div>
            </div>
            <div className="review-stars">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        size={16}
                        fill={i < review.rating ? "#f59e0b" : "transparent"}
                        color={i < review.rating ? "#f59e0b" : "#e2e8f0"}
                    />
                ))}
            </div>
            <p className="review-content">"{review.content}"</p>
        </div>
    );
};

const CustomerReviews = () => {
    return (
        <section className="customer-reviews-section">
            <div className="reviews-container">
                <div className="reviews-intro text-center">
                    <span className="section-badge">CrunchyHo</span>
                    <h2 className="section-title">Review by our Customers</h2>
                    <p className="section-subtitle">Don't just take our word for it. Here's what snack lovers have to say.</p>
                </div>

                <div className="reviews-slider-wrapper">
                    <div className="reviews-slider-track">
                        {/* Original Items */}
                        {REVIEWS.map(review => (
                            <ReviewCard key={`orig-${review.id}`} review={review} />
                        ))}
                        {/* Duplicated Items for seamless infinite scroll */}
                        {REVIEWS.map(review => (
                            <ReviewCard key={`dup-${review.id}`} review={review} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CustomerReviews;
