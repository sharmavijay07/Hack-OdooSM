const Product = require('../models/Product');
const Stock = require('../models/Stock');

// @desc    Get all products
// @route   GET /api/products
// @access  Private
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Private
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Manager
const createProduct = async (req, res) => {
    const { name, sku, category, uom, minStockLevel, description, initialStock } = req.body;

    try {
        const productExists = await Product.findOne({ sku });
        if (productExists) {
            return res.status(400).json({ message: 'Product with this SKU already exists' });
        }

        const product = await Product.create({
            name,
            sku,
            category,
            uom,
            minStockLevel,
            description,
        });

        // If initial stock is provided, create a stock entry for Main Warehouse
        if (initialStock && initialStock > 0) {
            await Stock.create({
                product: product._id,
                warehouse: 'Main Warehouse', // Default
                quantity: initialStock,
            });

            // TODO: Log this in Ledger as INITIAL
        }

        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Manager
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = req.body.name || product.name;
            product.category = req.body.category || product.category;
            product.uom = req.body.uom || product.uom;
            product.minStockLevel = req.body.minStockLevel || product.minStockLevel;
            product.description = req.body.description || product.description;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Manager
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
