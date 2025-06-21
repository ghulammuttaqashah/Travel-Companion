const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');
const authenticate = require('../middleware/authentication');

// Favorite CRUD (requires login)
router.post('/favorites', authenticate, weatherController.saveFavoriteCity);
router.get('/favorites', authenticate, weatherController.getFavorites);
router.delete('/favorites/:id', authenticate, weatherController.deleteFavorite);

module.exports = router;