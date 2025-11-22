const express = require('express');
const router = express.Router();
const { signup, login, getMe, forgotPassword, resetPassword } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resetToken', resetPassword);
router.get('/me', protect, getMe);

// Mock Login Route (Added directly here to fix 404)
const jwt = require('jsonwebtoken');
router.post('/mock-login', (req, res) => {
    console.log('Mock login request received:', req.body);
    const { provider } = req.body;

    // Create a demo user payload
    const user = {
        _id: '507f1f77bcf86cd799439011', // Valid 24-char hex ObjectId
        name: `Demo User (${provider})`,
        email: `demo.${provider}@example.com`,
        role: 'user'
    };

    // Generate a real JWT
    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET || 'fallback_secret',
        { expiresIn: '1d' }
    );

    res.json({
        token,
        user
    });
});

module.exports = router;
