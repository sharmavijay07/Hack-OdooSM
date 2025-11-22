const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '30d',
    });
};

// @desc    Register new user
// @route   POST /api/auth/signup
// @access  Public
const signup = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please add all fields' });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id),
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id),
        });
    } else {
        res.status(400).json({ message: 'Invalid credentials' });
    }
};

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
    res.status(200).json(req.user);
};

// @desc    Forgot Password
// @route   POST /api/auth/forgotpassword
// @access  Public
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate Reset Token (Simple random string for now)
        const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        // Hash and set to resetPasswordToken field
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 Minutes

        await user.save();

        // In a real app, send email here. For now, return token.
        res.status(200).json({ success: true, data: resetToken, message: 'Email sent (Mock: Token returned in response)' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Reset Password
// @route   PUT /api/auth/resetpassword/:resetToken
// @access  Public
const resetPassword = async (req, res) => {
    const resetPasswordToken = req.params.resetToken;

    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        // Set new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(201).json({
            success: true,
            token: generateToken(user.id),
            message: 'Password updated success'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    signup,
    login,
    getMe,
    forgotPassword,
    resetPassword,
};
