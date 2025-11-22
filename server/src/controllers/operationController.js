const Operation = require('../models/Operation');
const Stock = require('../models/Stock');
const Ledger = require('../models/Ledger');
const Product = require('../models/Product');

// Helper to update stock and ledger
const updateStockAndLedger = async (operation, item, type, warehouse, location, change, performedBy) => {
    // Update Stock
    let stock = await Stock.findOne({ product: item.product, warehouse, location });

    if (!stock) {
        if (change < 0) throw new Error(`Insufficient stock for product ${item.product} at ${warehouse} ${location}`);
        stock = new Stock({ product: item.product, warehouse, location, quantity: 0 });
    }

    if (stock.quantity + change < 0) {
        throw new Error(`Insufficient stock for product ${item.product} at ${warehouse} ${location}`);
    }

    stock.quantity += change;
    await stock.save();

    // Create Ledger Entry
    await Ledger.create({
        product: item.product,
        warehouse,
        location,
        change,
        balanceAfter: stock.quantity,
        operationType: type,
        operationReference: operation._id,
        performedBy,
    });

};

// @desc    Create new operation
// @route   POST /api/operations
// @access  Private
const createOperation = async (req, res) => {
    try {
        const { type, items, status, contact, scheduleDate, responsible } = req.body;

        // Generate Reference Number (e.g., WH/IN/0001)
        const count = await Operation.countDocuments({ type });
        const prefix = type === 'RECEIPT' ? 'WH/IN' : type === 'DELIVERY' ? 'WH/OUT' : 'WH/OPS';
        const reference = `${prefix}/${String(count + 1).padStart(4, '0')}`;

        const operation = await Operation.create({
            type,
            reference,
            items,
            status: status || 'DRAFT',
            contact,
            scheduleDate,
            responsible: responsible || req.user.name,
            createdBy: req.user._id
        });

        res.status(201).json(operation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Validate operation and update stock
// @route   POST /api/operations/:id/validate
// @access  Private
const validateOperation = async (req, res) => {
    try {
        const operation = await Operation.findById(req.params.id);

        if (!operation) {
            return res.status(404).json({ message: 'Operation not found' });
        }

        if (operation.status !== 'DRAFT') {
            return res.status(400).json({ message: 'Operation already validated or canceled' });
        }

        // Execute Stock Changes based on Type
        for (const item of operation.items) {
            if (operation.type === 'RECEIPT') {
                // Incoming: Increase stock in Main Warehouse (or specific location if we add that field to items)
                // Assuming default location for now or 'Incoming'
                await updateStockAndLedger(operation, item, 'RECEIPT', 'Main Warehouse', 'Receiving', item.quantity, req.user._id);
            } else if (operation.type === 'DELIVERY') {
                // Outgoing: Decrease stock
                await updateStockAndLedger(operation, item, 'DELIVERY', 'Main Warehouse', 'Stock', -item.quantity, req.user._id);
            } else if (operation.type === 'TRANSFER') {
                // Internal: Decrease from Source, Increase in Dest
                await updateStockAndLedger(operation, item, 'TRANSFER', 'Main Warehouse', item.fromLocation, -item.quantity, req.user._id);
                await updateStockAndLedger(operation, item, 'TRANSFER', 'Main Warehouse', item.toLocation, item.quantity, req.user._id);
            } else if (operation.type === 'ADJUSTMENT') {
                // Adjustment: Set to specific quantity or add/subtract difference?
                // Usually adjustment is "Counted Quantity", so we calculate diff.
                // But for simplicity here, let's assume the item.quantity IS the difference (+/-)
                // Or we can assume item.quantity is the NEW quantity. Let's stick to difference for now as per "Stock: -3" example.
                await updateStockAndLedger(operation, item, 'ADJUSTMENT', 'Main Warehouse', 'Stock', item.quantity, req.user._id);
            }
        }

        operation.status = 'DONE';
        operation.validatedAt = Date.now();
        await operation.save();

        // Emit Socket Event
        const io = req.app.get('io');
        io.emit('stock:update', { operationId: operation._id, type: operation.type });

        res.json(operation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all operations
// @route   GET /api/operations
// @access  Private
const getOperations = async (req, res) => {
    try {
        const { type, status } = req.query;
        const query = {};
        if (type) query.type = type;
        if (status) query.status = status;

        const operations = await Operation.find(query).populate('items.product').sort({ createdAt: -1 });
        res.json(operations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createOperation,
    validateOperation,
    getOperations,
};
