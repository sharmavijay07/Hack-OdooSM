const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    shortCode: {
        type: String,
        required: true,
        uppercase: true,
    },
    warehouse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Warehouse',
        required: true,
    },
}, { timestamps: true });

// Ensure unique location shortCode per warehouse
locationSchema.index({ warehouse: 1, shortCode: 1 }, { unique: true });

module.exports = mongoose.model('Location', locationSchema);
