import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const debugDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/shopLocalDb');
        const user = await User.findOne({ email: 'admin@crunchyho.com' });
        console.log('User found:', !!user);
        if (user) {
            console.log('Role:', user.role);
            console.log('Hashed Password stored:', user.password);
            const isMatch = await user.matchPassword('adminpassword123');
            console.log('Does password match?', isMatch);
        }
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
debugDb();
