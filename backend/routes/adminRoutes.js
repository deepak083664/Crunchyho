import express from 'express';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import User from '../models/User.js';
import Product from '../models/Product.js';
import { protectAdmin } from '../middleware/adminAuth.js';

const router = express.Router();

// Generate JWT
const generateToken = (id, password) => {
    // Include password hash in the token so that when password changes, old tokens are invalidated
    return jwt.sign({ id, pHash: password.substring(0, 10) }, process.env.JWT_SECRET || 'fallback_secret', {
        expiresIn: '30d',
    });
};

// @route   POST /api/admin/login
// @desc    Auth user & get token
// @access  Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            if (user.role !== 'admin') {
                return res.status(401).json({ message: 'Not authorized as admin' });
            }

            res.json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                token: generateToken(user._id, user.password),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private/Admin
router.get('/users', protectAdmin, async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- MULTER CONFIGURATION FOR IMAGE UPLOADS ---
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png|webp|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Images only!');
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});

// @route   POST /api/admin/product/add
// @desc    Create a new product with image upload
// @access  Private/Admin
router.post('/product/add', protectAdmin, upload.single('image'), async (req, res) => {
    try {
        const { name, price, description, category, stockQuantity, rating } = req.body;

        let imageUrl = '';
        if (req.file) {
            imageUrl = `/${req.file.path.replace(/\\/g, '/')}`; // Normalize slashes for windows
        } else if (req.body.image) {
            imageUrl = req.body.image; // Fallback to URL string if sent via form
        }

        const product = new Product({
            name,
            price: Number(price) || 0,
            description,
            category,
            stockQuantity: Number(stockQuantity) || 0,
            rating: Number(rating) || 0,
            image: imageUrl,
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   PUT /api/admin/product/update/:id
// @desc    Update a product
// @access  Private/Admin
router.put('/product/update/:id', protectAdmin, upload.single('image'), async (req, res) => {
    try {
        const { name, price, description, category, stockQuantity, rating } = req.body;
        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name || product.name;
            product.price = price ? Number(price) : product.price;
            product.description = description || product.description;
            product.category = category || product.category;
            product.stockQuantity = stockQuantity !== undefined ? Number(stockQuantity) : product.stockQuantity;
            product.rating = rating !== undefined ? Number(rating) : product.rating;

            if (req.file) {
                product.image = `/${req.file.path.replace(/\\/g, '/')}`;
            } else if (req.body.image && req.body.image !== 'undefined') {
                product.image = req.body.image;
            }

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   DELETE /api/admin/product/delete/:id
// @desc    Delete a product
// @access  Private/Admin
router.delete('/product/delete/:id', protectAdmin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/admin/products
// @desc    Fetch all products (admin view)
// @access  Private/Admin
router.get('/products', protectAdmin, async (req, res) => {
    try {
        const products = await Product.find({}).sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
