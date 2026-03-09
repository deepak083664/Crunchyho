import './About.css';

export default function About() {
    return (
        <div className="about-page animate-fade-in">
            <div className="container">
                <div className="about-header text-center">
                    <h1 className="page-title">About <span className="text-gradient">CrunchyHo</span></h1>
                    <p className="text-muted text-lg mt-2">CrunchyHo – Where Every Bite Brings the Perfect Crunch.</p>
                </div>

                <div className="about-content mt-8 grid-2">
                    <div className="about-text-content">
                        <h2>Our Story</h2>
                        <p className="text-muted mt-4">
                            Welcome to CrunchyHo – your destination for delicious, crunchy, and authentic Indian snacks. At CrunchyHo, we believe that snacks are not just food; they are moments of joy shared with family and friends.
                        </p>
                        <p className="text-muted mt-4">
                            Our journey started with a simple mission: to bring the taste of traditional Indian snacks to every home with the perfect balance of quality, flavor, and crunch. From our crispy mixture to our freshly prepared gujiya and other tasty snack items, every product is made with carefully selected ingredients and traditional recipes.
                        </p>
                        <p className="text-muted mt-4">
                            At CrunchyHo, we focus on delivering snacks that are fresh, flavorful, and satisfying. Each bite is crafted to give you a perfect combination of spices, crunch, and authentic taste that reminds you of home-style snacks.
                        </p>
                        <p className="text-muted mt-4">
                            Whether you are enjoying tea time, celebrating with family, or simply craving something crunchy, CrunchyHo is here to make every moment more delicious.
                        </p>

                        <div className="mission-vision mt-8">
                            <div className="mb-6">
                                <h3 className="text-primary">Our Mission</h3>
                                <p className="text-muted mt-2">
                                    To provide high-quality, tasty, and hygienic snacks that bring happiness and authentic flavor to every customer.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-primary">Our Vision</h3>
                                <p className="text-muted mt-2">
                                    To become a trusted snack brand known for delivering premium quality traditional snacks with a modern touch.
                                </p>
                            </div>
                        </div>

                        <p className="text-muted mt-6 font-semibold">
                            Thank you for choosing CrunchyHo – where every bite is full of crunch and flavor.
                        </p>
                    </div>

                    <div className="about-image-container">
                        <img src="/logo1.jpeg" alt="CrunchyHo Logo Large" className="about-main-img" />
                        <div className="glow-effect"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
