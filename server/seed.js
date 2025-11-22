require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./src/models/Product');
const Warehouse = require('./src/models/Warehouse');
const Location = require('./src/models/Location');
const Operation = require('./src/models/Operation');
const User = require('./src/models/User');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/inventra-ims');
        console.log('MongoDB connected for seeding...');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

const seedData = async () => {
    try {
        // Clear existing data
        await Product.deleteMany({});
        await Warehouse.deleteMany({});
        await Location.deleteMany({});
        await Operation.deleteMany({});
        console.log('Cleared existing data');

        // Create Warehouses
        const warehouses = await Warehouse.create([
            { name: 'Main Warehouse', shortCode: 'WH-01', address: '123 Industrial Ave, City' },
            { name: 'Production Floor', shortCode: 'WH-02', address: '456 Factory Rd, City' },
            { name: 'Retail Store', shortCode: 'WH-03', address: '789 Market St, City' }
        ]);
        console.log('Created warehouses:', warehouses.length);

        // Create Locations
        const locations = await Location.create([
            { name: 'Receiving', shortCode: 'LOC-A1', warehouse: warehouses[0]._id },
            { name: 'Stock', shortCode: 'LOC-A2', warehouse: warehouses[0]._id },
            { name: 'Rack A', shortCode: 'LOC-A3', warehouse: warehouses[0]._id },
            { name: 'Assembly Line', shortCode: 'LOC-B1', warehouse: warehouses[1]._id },
            { name: 'Display Area', shortCode: 'LOC-C1', warehouse: warehouses[2]._id }
        ]);
        console.log('Created locations:', locations.length);

        // Create Products
        const products = await Product.create([
            {
                name: 'Steel Rods',
                sku: 'STL-001',
                category: 'Raw Material',
                uom: 'kg',
                minStockLevel: 100,
                description: 'High-grade steel rods for construction'
            },
            {
                name: 'Office Chair',
                sku: 'FUR-001',
                category: 'Finished Goods',
                uom: 'pcs',
                minStockLevel: 10,
                description: 'Ergonomic office chair with lumbar support'
            },
            {
                name: 'Laptop Battery',
                sku: 'ELC-001',
                category: 'Spares',
                uom: 'pcs',
                minStockLevel: 20,
                description: 'Replacement battery for laptops'
            },
            {
                name: 'Cardboard Boxes',
                sku: 'PKG-001',
                category: 'Packaging',
                uom: 'box',
                minStockLevel: 50,
                description: 'Standard shipping boxes 12x12x12'
            },
            {
                name: 'Aluminum Sheets',
                sku: 'STL-002',
                category: 'Raw Material',
                uom: 'm',
                minStockLevel: 200,
                description: 'Lightweight aluminum sheets'
            }
        ]);
        console.log('Created products:', products.length);

        // Create sample user (for operations)
        let sampleUser = await User.findOne({ email: 'admin@inventra.com' });
        if (!sampleUser) {
            sampleUser = await User.create({
                name: 'Admin User',
                email: 'admin@inventra.com',
                password: '$2a$10$YourHashedPasswordHere' // This won't work for login, just for reference
            });
        }

        // Create Operations
        const operations = await Operation.create([
            {
                type: 'RECEIPT',
                reference: 'WH/IN/0001',
                items: [
                    { product: products[0]._id, quantity: 500 },
                    { product: products[4]._id, quantity: 300 }
                ],
                status: 'DONE',
                contact: 'Steel Suppliers Inc.',
                scheduleDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                responsible: 'Admin User',
                createdBy: sampleUser._id
            },
            {
                type: 'RECEIPT',
                reference: 'WH/IN/0002',
                items: [
                    { product: products[1]._id, quantity: 50 }
                ],
                status: 'READY',
                contact: 'Furniture World',
                scheduleDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
                responsible: 'Admin User',
                createdBy: sampleUser._id
            },
            {
                type: 'DELIVERY',
                reference: 'WH/OUT/0001',
                items: [
                    { product: products[1]._id, quantity: 15 }
                ],
                status: 'DONE',
                contact: 'Corporate Office XYZ',
                scheduleDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                responsible: 'Admin User',
                createdBy: sampleUser._id
            },
            {
                type: 'DELIVERY',
                reference: 'WH/OUT/0002',
                items: [
                    { product: products[2]._id, quantity: 10 }
                ],
                status: 'DRAFT',
                contact: 'Tech Repair Shop',
                scheduleDate: new Date(),
                responsible: 'Admin User',
                createdBy: sampleUser._id
            },
            {
                type: 'TRANSFER',
                reference: 'WH/TRF/0001',
                items: [
                    { product: products[0]._id, quantity: 100 }
                ],
                status: 'DONE',
                contact: 'Internal Transfer',
                scheduleDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                responsible: 'Admin User',
                createdBy: sampleUser._id
            }
        ]);
        console.log('Created operations:', operations.length);

        console.log('\n✅ Database seeded successfully!');
        console.log(`\nSummary:
- ${warehouses.length} Warehouses
- ${locations.length} Locations
- ${products.length} Products
- ${operations.length} Operations
        `);

    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Database connection closed');
    }
};

// Run the seed
connectDB().then(seedData);
