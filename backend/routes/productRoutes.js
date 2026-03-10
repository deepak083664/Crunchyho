import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

import upload from '../middleware/upload.js';

// @desc    Fetch all products
// @route   GET /api/products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// @desc    Create a product
// @route   POST /api/products
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { name, price, description, category } = req.body;

        let imageUrl = req.body.image || '/images/sample.jpg';
        if (req.file) {
            imageUrl = req.file.path;
        }

        const product = new Product({
            name: name || 'Sample name',
            price: price || 0,
            description: description || 'Sample description',
            image: imageUrl,
            category: category || 'Sample category',
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// @desc    Update a product
// @route   PUT /api/products/:id
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const { name, price, description, category } = req.body;
        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name || product.name;
            product.price = price || product.price;
            product.description = description || product.description;
            product.category = category || product.category;

            if (req.file) {
                product.image = req.file.path;
            } else if (req.body.image) {
                product.image = req.body.image;
            }

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

export default router;
