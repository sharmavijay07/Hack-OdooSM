const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const checkData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/inventra');
        console.log('MongoDB Connected');

        const products = await Product.find({});
        console.log('Products found:', products.length);
        console.log(JSON.stringify(products, null, 2));
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkData();
