const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    warehouse: {
        type: String, // Can be an ObjectId if we have a Warehouse model, using String for simplicity/flexibility initially or 'Main'
        default: 'Main Warehouse',
    },
    location: {
        type: String, // Specific rack/bin
    },
    quantity: {
        type: Number,
        required: true,
        default: 0,
    }
}, {
    timestamps: true,
});

// Compound index to ensure unique product per location
stockSchema.index({ product: 1, warehouse: 1, location: 1 }, { unique: true });

module.exports = mongoose.model('Stock', stockSchema);
