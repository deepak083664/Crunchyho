import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    rating: { type: Number, default: 0 }
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

const sampleProducts = [
    {
        name: "Premium Crunch Delight",
        description: "Experience the ultimate crunchy sensation with our premium delight bundle.",
        price: 24.99,
        image: "/product1.jpeg",
        category: "Snacks",
        rating: 4.8
    },
    {
        name: "Classic Crunchy Mix",
        description: "A timeless blend of classic crunchy flavors for your everyday cravings.",
        price: 18.50,
        image: "/product2.jpeg",
        category: "Mixes",
        rating: 4.5
    },
    {
        name: "Spicy Honey Roast",
        description: "Sweet and spicy perfectly balanced in this gourmet roasted treat.",
        price: 22.00,
        image: "/product3.jpeg",
        category: "Roasted",
        rating: 4.9
    },
    {
        name: "Organic Nut cluster",
        description: "Healthy, organic, and locally sourced crunchy nut clusters.",
        price: 29.99,
        image: "/product4.jpeg",
        category: "Organic",
        rating: 5.0
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");

        await Product.deleteMany(); // Clear existing
        console.log("Cleared existing products");

        await Product.insertMany(sampleProducts);
        console.log("Successfully seeded 4 premium products!");

        process.exit(0);
    } catch (error) {
        console.error("Error seeding DB:", error);
        process.exit(1);
    }
};

seedDB();
