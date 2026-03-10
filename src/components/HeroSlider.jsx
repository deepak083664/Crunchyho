import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './HeroSlider.css';

const slides = [
    {
        id: 1,
        title: "Welcome to Crunchyho",
        subtitle: "Discover our latest premium products.",
        image: "/slide1.jpeg",
        cta: "Shop Now"
    },
    {
        id: 2,
        title: "Special Offers",
        subtitle: "Get up to 50% off on our best-selling items.",
        image: "/slide2.jpeg",
        cta: "View Deals"
    },
    {
        id: 3,
        title: "Trending Now",
        subtitle: "See what our customers are loving this week.",
        image: "/slide3.png",
        cta: "Explore"
    },
    {
        id: 4,
        title: "Exclusive Collection",
        subtitle: "Browse our hand-picked selection of top-quality products.",
        image: "/slide4.png",
        cta: "Shop Styles"
    }
];

export default function HeroSlider() {
    const [current, setCurrent] = useState(0);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent(prev => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const handleTouchStart = (e) => {
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (touchStartX.current - touchEndX.current > 50) {
            // Swipe left - next slide
            setCurrent(prev => (prev === slides.length - 1 ? 0 : prev + 1));
        }
        if (touchEndX.current - touchStartX.current > 50) {
            // Swipe right - prev slide
            setCurrent(prev => (prev === 0 ? slides.length - 1 : prev - 1));
        }
        // Reset
        touchStartX.current = 0;
        touchEndX.current = 0;
    };

    return (
        <div
            className="hero-slider"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div
                className="slider-track"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {slides.map((slide, index) => (
                    <div className="slide" key={slide.id}>
                        <div className="slide-image-container">
                            <img src={slide.image} alt={slide.title} className="slide-image" />
                            <div className="slide-overlay"></div>
                        </div>
                        <div className={`slide-content container ${current === index ? 'active' : ''}`}>
                            <h1 className="slide-title">{slide.title}</h1>
                            <p className="slide-subtitle">{slide.subtitle}</p>
                            <Link to="/products" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                Order Now <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            <div className="slider-dots">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`dot ${current === index ? 'active' : ''}`}
                        onClick={() => setCurrent(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
