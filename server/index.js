const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser'); // ✅ ADD THIS
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const currencyRoutes = require('./routes/currencyRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// ✅ Middleware
app.use(express.json());
app.use(cookieParser()); // ✅ Add this

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true // ✅ Needed to send cookies from client
}));

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection failed:', err));

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/currency', currencyRoutes);

// ✅ Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});