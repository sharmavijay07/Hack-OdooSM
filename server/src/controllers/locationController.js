const Location = require('../models/Location');

// @desc    Get all locations (optionally filter by warehouse)
// @route   GET /api/locations
// @access  Private
const getLocations = async (req, res) => {
    try {
        const { warehouse } = req.query;
        const query = {};
        if (warehouse) query.warehouse = warehouse;

        const locations = await Location.find(query).populate('warehouse', 'name').sort({ createdAt: -1 });
        res.json(locations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a location
// @route   POST /api/locations
// @access  Private
const createLocation = async (req, res) => {
    try {
        const { name, shortCode, warehouse } = req.body;

        const locationExists = await Location.findOne({ warehouse, shortCode });
        if (locationExists) {
            return res.status(400).json({ message: 'Location with this short code already exists in this warehouse' });
        }

        const location = await Location.create({
            name,
            shortCode,
            warehouse,
        });

        res.status(201).json(location);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a location
// @route   PUT /api/locations/:id
// @access  Private
const updateLocation = async (req, res) => {
    try {
        const location = await Location.findById(req.params.id);

        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }

        location.name = req.body.name || location.name;
        location.shortCode = req.body.shortCode || location.shortCode;
        location.warehouse = req.body.warehouse || location.warehouse;

        const updatedLocation = await location.save();
        res.json(updatedLocation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a location
// @route   DELETE /api/locations/:id
// @access  Private
const deleteLocation = async (req, res) => {
    try {
        const location = await Location.findById(req.params.id);

        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }

        await location.deleteOne();
        res.json({ message: 'Location removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getLocations,
    createLocation,
    updateLocation,
    deleteLocation,
};
