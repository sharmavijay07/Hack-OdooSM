const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Mock Login Endpoint
router.post('/mock-login', (req, res) => {
    console.log('Mock login request received:', req.body);
    const { provider } = req.body;

    // Create a demo user payload
    const user = {
        _id: 'mock-user-id-123',
        name: `Demo User (${provider})`,
        email: `demo.${provider}@example.com`,
        role: 'user'
    };

    // Generate a real JWT so the frontend works normally
    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET || 'fallback_secret',
        { expiresIn: '1d' }
    );

    // Return the same structure as real login
    res.json({
        token,
        user
    });
});

module.exports = router;
