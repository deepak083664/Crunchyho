import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/shopLocalDb');

        const adminExists = await User.findOne({ email: 'admin@crunchyho.com' });

        if (adminExists) {
            console.log('Admin user already exists');
            process.exit(0);
        }

        const adminUser = new User({
            fullName: 'Bipul Admin',
            email: 'admin@crunchyho.com',
            password: 'bipul123@',
            role: 'admin'
        });

        await adminUser.save();
        console.log('Admin user created successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error creating admin user:', error);
        process.exit(1);
    }
};

createAdmin();
