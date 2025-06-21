const Expense = require('../models/Expense');

// Create Expense
exports.createExpense = async (req, res) => {
  const { amount, category, date, note, tripName } = req.body;
  if (!amount || !category) return res.status(400).json({ error: 'Amount and category required' });

  try {
    const expense = new Expense({
      amount,
      category,
      date: date || Date.now(),
      note,
      tripName,
      userId: req.userId,
    });
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Expenses
exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.userId });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Filter Expenses by category or tripName
exports.filterExpenses = async (req, res) => {
  const { category, tripName } = req.query;
  const filter = { userId: req.userId };
  if (category) filter.category = category;
  if (tripName) filter.tripName = tripName;

  try {
    const expenses = await Expense.find(filter);
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get One Expense
exports.getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id, userId: req.userId });
    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    res.json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Expense
exports.updateExpense = async (req, res) => {
  const { amount, category, date, note, tripName } = req.body;

  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { $set: { amount, category, date, note, tripName } },
      { new: true }
    );
    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    res.json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Expense
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};