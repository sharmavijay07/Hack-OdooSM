const mongoose = require('mongoose');

const operationItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    // For transfers
    fromLocation: String,
    toLocation: String,
});

const operationSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['RECEIPT', 'DELIVERY', 'TRANSFER', 'ADJUSTMENT'],
        required: true,
    },
    status: {
        type: String,
        enum: ['DRAFT', 'WAITING', 'READY', 'DONE', 'CANCELED'],
        default: 'DRAFT',
    },
    reference: {
        type: String,
        unique: true, // e.g., WH/IN/0001
    },
    contact: {
        type: String, // Vendor or Customer Name
    },
    scheduleDate: Date,
    responsible: String,
    items: [operationItemSchema],
    notes: String,
    performedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    validatedAt: Date,
}, {
    timestamps: true,
});

module.exports = mongoose.model('Operation', operationSchema);
