const mongoose = require('mongoose');

const favoriteCitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cityName: { type: String, required: true },
  country: { type: String },
  temperature: { type: Number }, // ✅ New field
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FavoriteCity', favoriteCitySchema);