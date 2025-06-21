const CurrencyHistory = require('../models/CurrencyHistory');

// Save conversion to history
exports.saveConversion = async (req, res) => {
  const { fromCurrency, toCurrency, amount, result } = req.body;
  if (!fromCurrency || !toCurrency || !amount || !result) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const conversion = new CurrencyHistory({
      userId: req.userId,
      fromCurrency,
      toCurrency,
      amount,
      result
    });
    await conversion.save();
    res.status(201).json(conversion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all conversion history
exports.getHistory = async (req, res) => {
  try {
    const history = await CurrencyHistory.find({ userId: req.userId }).sort({ date: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a conversion from history
exports.deleteConversion = async (req, res) => {
  try {
    const deleted = await CurrencyHistory.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!deleted) return res.status(404).json({ error: 'Conversion not found' });
    res.json({ message: 'Conversion deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};