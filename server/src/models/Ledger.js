const mongoose = require('mongoose');

const ledgerSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    warehouse: {
        type: String,
        required: true,
    },
    location: String,
    change: {
        type: Number, // +50 or -20
        required: true,
    },
    balanceAfter: {
        type: Number, // Snapshot of stock after this move
    },
    operationType: {
        type: String,
        enum: ['RECEIPT', 'DELIVERY', 'TRANSFER', 'ADJUSTMENT', 'INITIAL'],
        required: true,
    },
    operationReference: {
        type: mongoose.Schema.Types.ObjectId, // Link to the Operation doc
        ref: 'Operation',
    },
    performedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Ledger', ledgerSchema);
