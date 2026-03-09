import express from 'express';
import Order from '../models/Order.js';
import User from '../models/User.js';
import crypto from 'crypto';

const router = express.Router();

// @desc    Create new order
// @route   POST /api/orders
router.post('/', async (req, res) => {
    try {
        const { orderItems, user, paymentMethod, totalAmount } = req.body;

        if (orderItems && orderItems.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        } else {
            // Check if user exists, if not create a guest account
            let existingUser = await User.findOne({ email: user.email });

            if (!existingUser && user.email) {
                // Generate a random 12-char secure password for guests
                const randomPassword = crypto.randomBytes(8).toString('hex');

                existingUser = new User({
                    fullName: user.fullName || "Guest Customer",
                    email: user.email.toLowerCase(),
                    password: randomPassword,
                    role: 'user'
                });
                await existingUser.save();
            }

            const order = new Order({
                orderItems,
                user,
                paymentMethod,
                totalAmount
            });

            const createdOrder = await order.save();
            res.status(201).json(createdOrder);
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// @desc    Get all orders
// @route   GET /api/orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find({}).populate('orderItems.product', 'id name');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
router.put('/:id/status', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.orderStatus = req.body.status || order.orderStatus;
            order.paymentStatus = req.body.paymentStatus || order.paymentStatus;
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

export default router;
