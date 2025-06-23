const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
  const token = req.cookies.token; // ✅ Read from cookie

  if (!token) return res.status(401).json({ error: 'No token provided' });

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    req.userId = decoded.userId;
    next();
  });
};

module.exports = authenticate;