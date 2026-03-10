import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protectAdmin = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');

            // Find user and check if admin
            req.user = await User.findById(decoded.id);

            if (req.user && req.user.role === 'admin') {
                // Check if the pHash in the token matches the first 10 characters of the current password
                // If it doesn't match or doesn't exist, the token is from an older session (before password change)
                if (decoded.pHash && decoded.pHash === req.user.password.substring(0, 10)) {
                    // Remove password from req.user
                    req.user.password = undefined;
                    next();
                } else {
                    res.status(401).json({ message: 'Session expired due to password change. Please login again.' });
                }
            } else {
                res.status(401).json({ message: 'Not authorized as an admin' });
            }
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};
