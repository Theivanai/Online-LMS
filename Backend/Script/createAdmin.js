const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../Modules/User');

async function createAdminUser(name, email, password) {
    try {
        if (!name || !email || !password) {
            console.error('Please provide name, email, and password');
            process.exit(1);
        }

        mongoose.connect('mongodb://localhost:27017/library')

        const hashedPassword = await bcrypt.hash(password, 10);

        const existingAdmin = await User.findOne({ email });
        if (existingAdmin) {
            console.log(`Admin user with email ${email} already exists!`);
            await mongoose.disconnect();
            return;
        }

        const adminUser = new User({
            name,
            email,
            password: hashedPassword,
            isAdmin: true,
        });

        await adminUser.save();

        console.log('Admin user created successfully!');
        await mongoose.disconnect();
    } catch (error) {
        console.error('Error creating admin user:', error);
    }
}

// Read command line arguments
const [name, email, password] = process.argv.slice(2);

createAdminUser(name, email, password);
