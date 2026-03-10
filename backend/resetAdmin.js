import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import fs from 'fs';

dotenv.config();

const resetAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        // Find existing admin
        let adminUser = await User.findOne({ email: 'admin@crunchyho.com' });

        if (adminUser) {
            console.log('Found existing admin user. Deleting and recreating...');
            await User.deleteOne({ email: 'admin@crunchyho.com' });
        }

        // Create new admin
        adminUser = new User({
            fullName: 'Bipul Admin',
            email: 'admin@crunchyho.com',
            password: 'bipul123@',
            role: 'admin'
        });

        await adminUser.save();
        console.log('Success');
        process.exit(0);
    } catch (error) {
        fs.writeFileSync('error_log.txt', error.stack || error.toString());
        process.exit(1);
    }
};

resetAdmin();
