const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const authenticate = require('../middleware/authentication');

router.post('/', authenticate, expenseController.createExpense);
router.get('/', authenticate, expenseController.getAllExpenses);
router.get('/filter', authenticate, expenseController.filterExpenses); // new route
router.get('/:id', authenticate, expenseController.getExpenseById);
router.put('/:id', authenticate, expenseController.updateExpense);
router.delete('/:id', authenticate, expenseController.deleteExpense);

module.exports = router;