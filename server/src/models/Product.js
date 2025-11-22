const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    sku: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: String,
        required: true,
    },
    uom: {
        type: String, // Unit of Measure (e.g., kg, pcs, box)
        required: true,
    },
    minStockLevel: {
        type: Number,
        default: 0,
    },
    description: String,
    image: String, // URL to image
}, {
    timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);
