const FavoriteCity = require('../models/FavoriteCity');

// ✅ Save a favorite city
exports.saveFavoriteCity = async (req, res) => {
  const { cityName, country, temperature } = req.body; // ✅ Receive temperature from frontend
  if (!cityName) return res.status(400).json({ error: 'City name is required' });

  try {
    const newCity = new FavoriteCity({
      userId: req.userId,
      cityName,
      country,
      temperature // ✅ Save temperature if provided
    });
    await newCity.save();
    res.status(201).json(newCity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// 📋 Get list of favorite cities
exports.getFavorites = async (req, res) => {
  try {
    const favorites = await FavoriteCity.find({ userId: req.userId });
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ❌ Delete a favorite city
exports.deleteFavorite = async (req, res) => {
  try {
    const deleted = await FavoriteCity.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });
    if (!deleted) return res.status(404).json({ error: 'City not found' });
    res.json({ message: 'City removed from favorites' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};