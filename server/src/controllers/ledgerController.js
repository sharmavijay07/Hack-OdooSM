const Ledger = require('../models/Ledger');

// @desc    Get stock ledger history
// @route   GET /api/ledger
// @access  Private
const getLedger = async (req, res) => {
    try {
        const ledger = await Ledger.find({})
            .populate('product', 'name sku')
            .populate('performedBy', 'name')
            .sort({ createdAt: -1 });
        res.json(ledger);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getLedger,
};
