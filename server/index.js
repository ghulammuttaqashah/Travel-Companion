const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const currencyRoutes = require('./routes/currencyRoutes');
dotenv.config();
const cors = require('cors');


const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection failed:', err));

// API Routes
app.use('/api/auth', authRoutes);       // For user register/login
app.use('/api/expenses', expenseRoutes); // For all expense-related APIs
app.use('/api/weather', weatherRoutes); // For weather-related API:
app.use('/api/currency', currencyRoutes); // For currency-related apis


// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});