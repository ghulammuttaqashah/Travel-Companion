const express = require('express');
const router = express.Router();
const currencyController = require('../controllers/currencyController');
const authenticate = require('../middleware/authentication');

// Save conversion
router.post('/', authenticate, currencyController.saveConversion);

// Get conversion history
router.get('/', authenticate, currencyController.getHistory);

// Delete a specific conversion by ID
router.delete('/:id', authenticate, currencyController.deleteConversion);

module.exports = router;