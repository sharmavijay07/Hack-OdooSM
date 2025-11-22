const express = require('express');
const router = express.Router();
const {
    createOperation,
    validateOperation,
    getOperations,
} = require('../controllers/operationController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getOperations).post(protect, createOperation);
router.route('/:id/validate').post(protect, validateOperation);

module.exports = router;
