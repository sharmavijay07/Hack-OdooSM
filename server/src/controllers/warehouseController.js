const Warehouse = require('../models/Warehouse');

// @desc    Get all warehouses
// @route   GET /api/warehouses
// @access  Private
const getWarehouses = async (req, res) => {
    try {
        const warehouses = await Warehouse.find().sort({ createdAt: -1 });
        res.json(warehouses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a warehouse
// @route   POST /api/warehouses
// @access  Private
const createWarehouse = async (req, res) => {
    try {
        const { name, shortCode, address } = req.body;

        const warehouseExists = await Warehouse.findOne({ $or: [{ name }, { shortCode }] });
        if (warehouseExists) {
            return res.status(400).json({ message: 'Warehouse already exists' });
        }

        const warehouse = await Warehouse.create({
            name,
            shortCode,
            address,
        });

        res.status(201).json(warehouse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a warehouse
// @route   PUT /api/warehouses/:id
// @access  Private
const updateWarehouse = async (req, res) => {
    try {
        const warehouse = await Warehouse.findById(req.params.id);

        if (!warehouse) {
            return res.status(404).json({ message: 'Warehouse not found' });
        }

        warehouse.name = req.body.name || warehouse.name;
        warehouse.shortCode = req.body.shortCode || warehouse.shortCode;
        warehouse.address = req.body.address || warehouse.address;

        const updatedWarehouse = await warehouse.save();
        res.json(updatedWarehouse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a warehouse
// @route   DELETE /api/warehouses/:id
// @access  Private
const deleteWarehouse = async (req, res) => {
    try {
        const warehouse = await Warehouse.findById(req.params.id);

        if (!warehouse) {
            return res.status(404).json({ message: 'Warehouse not found' });
        }

        await warehouse.deleteOne();
        res.json({ message: 'Warehouse removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getWarehouses,
    createWarehouse,
    updateWarehouse,
    deleteWarehouse,
};
