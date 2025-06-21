// models/Expense.js
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  amount: Number,
  category: String,
  date: Date,
  note: String,
  tripName: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Expense', expenseSchema);