const express = require('express');
const router = express.Router();
const Ledger = require('../models/Ledger');
const { protect } = require('../middleware/authMiddleware');

// @desc    Get ledger entries with filters
// @route   GET /api/ledger
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const { product, warehouse, location, startDate, endDate } = req.query;
        const query = {};

        if (product) query.product = product;
        if (warehouse) query.warehouse = warehouse;
        if (location) query.location = location;
        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate) query.createdAt.$gte = new Date(startDate);
            if (endDate) query.createdAt.$lte = new Date(endDate);
        }

        const entries = await Ledger.find(query)
            .populate('product', 'name sku')
            .populate('performedBy', 'name')
            .sort({ createdAt: -1 })
            .limit(100);

        res.json(entries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
