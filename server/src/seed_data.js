const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/inventra');
        console.log('MongoDB Connected');

        const User = require('./models/User');
        const bcrypt = require('bcryptjs');

        await User.deleteMany({ email: 'admin@example.com' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('123456', salt);

        const user = await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: hashedPassword,
            role: 'manager',
        });

        console.log('User Created:', user);

        await Product.deleteMany({ sku: 'DESK-SEED' });

        const product = await Product.create({
            name: 'Seeded Desk',
            sku: 'DESK-SEED',
            category: 'Finished Goods',
            uom: 'pcs',
            minStockLevel: 10,
            quantity: 100,
            description: 'Seeded for testing',
        });

        console.log('Product Created:', product);
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedData();
