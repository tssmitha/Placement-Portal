// seedAdmin.js
const mongoose = require('mongoose');
const Admin = require('./admin'); // Path to Admin model

const seedAdmin = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/QuizApp', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Check if an admin user already exists
        const existingAdmin = await Admin.findOne({ username: 'admin' });
        if (existingAdmin) {
            console.log('Admin user already exists.');
            return;
        }

        // Create the admin user
        const admin = new Admin({
            username: 'admin', // Set desired username
            passwordHash: 'password123', // Replace with a secure password
        });

        await admin.save();
        console.log('Admin user created successfully.');
        mongoose.disconnect();
    } catch (error) {
        console.error('Error seeding admin user:', error);
        mongoose.disconnect();
    }
};

seedAdmin();
