import express from 'express';
import dotenv from 'dotenv';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import Order from '../models/Order.js';

dotenv.config();

const router = express.Router();

// Initialize razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'dummy_key_id',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_key_secret',
});

// @desc    Create Razorpay order
// @route   POST /api/payment/create-order
router.post('/create-order', async (req, res) => {
    try {
        const { amount, currency, receipt } = req.body;

        const options = {
            amount: amount * 100, // amount in smallest currency unit (paise)
            currency: currency || "INR",
            receipt: receipt
        };

        const order = await razorpay.orders.create(options);

        if (!order) return res.status(500).send("Some error occurred");

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// @desc    Verify Razorpay payment
// @route   POST /api/payment/verify
router.post('/verify', async (req, res) => {
    try {
        const {
            razorpayOrderId,
            razorpayPaymentId,
            signature,
            orderId
        } = req.body;

        const secret = process.env.RAZORPAY_KEY_SECRET || 'dummy_key_secret';

        const shasum = crypto.createHmac("sha256", secret);
        shasum.update(`${razorpayOrderId}|${razorpayPaymentId}`);
        const digest = shasum.digest("hex");

        if (digest === signature) {
            // Payment is successful, update DB order
            const order = await Order.findById(orderId);
            if (order) {
                order.paymentStatus = 'Completed';
                order.razorpayOrderId = razorpayOrderId;
                order.razorpayPaymentId = razorpayPaymentId;
                await order.save();
            }

            return res.json({ msg: "Payment Verified Successfully", success: true });
        } else {
            return res.status(400).json({ msg: "Transaction not legit!", success: false });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

export default router;
