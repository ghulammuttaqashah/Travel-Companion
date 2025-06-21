# ✈️ Travel Companion App (MERN): Your All-in-One Travel Assistant

**Travel Companion** is a full-stack web application designed to assist travelers by combining useful tools like a Weather Checker, Currency Converter, and Expense Tracker — all in one place. Users can register, log in, and securely access all features to manage their travel needs with ease.

---

## 🌟 Features

### 🌍 1. User Authentication
- Register/Login using name, email, and password
- Secure JWT-based session management
- Protected routes for authorized users

### 🌦️ 2. Weather Module (OpenWeatherMap API)
- Search and view current weather by city
- Save favorite cities
- View and delete saved cities

### 💱 3. Currency Converter (ExchangeRate API)
- Convert between any two currencies in real-time
- Save conversion history
- View and delete saved conversions

### 💸 4. Expense Tracker
- Add expenses with amount, category, date (optional), note (optional), and trip name (optional)
- View expense list
- Filter by category and/or trip
- Edit or delete expenses

---

## 🧠 Technologies Used

- **Frontend:** React, React Router DOM, Axios
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT, bcrypt
- **APIs:** OpenWeatherMap, ExchangeRate API
- **Tools:** Vite, Render, Netlify/Vercel, MongoDB Atlas

---

## 🗂️ Project Structure

TravelCompanion/
├── client/ # React frontend
│ ├── src/
│ ├── .env # API keys for weather and currency
│ └── ...
│
├── server/ # Node.js backend
│ ├── routes/
│ ├── models/
│ ├── controllers/
│ ├── config/
│ ├── .env # MongoDB URI, JWT secret
│ └── ...

yaml
Copy
Edit

---

## 💻 Installation & Local Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/Travel-Companion.git
cd Travel-Companion
2. Backend Setup
bash
Copy
Edit
cd server
npm install
# Create a .env file using the format below
npm start
3. Frontend Setup
bash
Copy
Edit
cd client
npm install
# Create a .env file using the format below
npm run dev
🔐 Environment Variables
📁 server/.env
env
Copy
Edit
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
📁 client/.env
env
Copy
Edit
REACT_APP_WEATHER_API_KEY=your_openweather_api_key
REACT_APP_CURRENCY_API_KEY=your_exchange_rate_api_key
🔀 API Endpoints Overview
🧑‍💻 User Endpoints
POST /api/auth/register – Register a new user
▸ Body: name, email, password
▸ Auth: ❌ No

POST /api/auth/login – Login and receive JWT
▸ Body: email, password
▸ Auth: ❌ No

POST /api/auth/logout – Logout (handled client-side)
▸ Auth: ❌ No

🌦️ Weather Endpoints (Favorites)
POST /api/weather/favorites – Save a favorite city
▸ Body: { cityName, country }
▸ Auth: ✅ Yes

GET /api/weather/favorites – Get all saved cities
▸ Auth: ✅ Yes

DELETE /api/weather/favorites/:id – Delete a saved city
▸ Auth: ✅ Yes

💱 Currency Endpoints
POST /api/currency/ – Save a currency conversion
▸ Auth: ✅ Yes

GET /api/currency/ – Get all conversions
▸ Auth: ✅ Yes

DELETE /api/currency/:id – Delete a specific conversion
▸ Auth: ✅ Yes

💸 Expense Endpoints
POST /api/expenses – Add a new expense
▸ Body: amount, category, date?, note?, tripName?
▸ Auth: ✅ Yes

GET /api/expenses – Get all expenses
▸ Auth: ✅ Yes

GET /api/expenses/filter – Filter expenses
▸ Query: category, tripName
▸ Auth: ✅ Yes

PUT /api/expenses/:id – Update an expense by ID
▸ Body: amount, category, etc.
▸ Auth: ✅ Yes

DELETE /api/expenses/:id – Delete an expense
▸ Auth: ✅ Yes

💡 Frontend Pages & Components
📄 Main Pages
Home (Header, Card, Footer)

Login

Register

Weather

Currency Converter

Expense Tracker

Not Found Page

🧩 Components
🔁 Shared
Header.jsx

Footer.jsx

Spinner.jsx

ToastContext.jsx

ProtectedRoutes.jsx

🌦️ Weather Module
WeatherDisplay.jsx

FavoriteCityCard.jsx

FavoriteCitiesList.jsx

💱 Currency Module
CurrencyDropDown.jsx

CurrencyHistoryCard.jsx

CurrencyHistoryList.jsx

💸 Expense Module
AddExpenseForm.jsx

ExpenseFilter.jsx

ExpenseCard.jsx

ExpenseList.jsx

⚙️ Services
Axios.js

🚀 Deployment (Coming Soon)
Frontend → Vercel / Netlify

Backend → Render / Railway

Database → MongoDB Atlas

👤 Author
Name: Ghulam Muttaqa Shah

Project: Travel Companion MERN Stack App

📄 License
This project is licensed under the MIT License.

✅ Feel free to star this repo ⭐ if you found it helpful!