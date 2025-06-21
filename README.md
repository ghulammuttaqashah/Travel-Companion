# ✈️ Travel Companion App (MERN): Your All-in-One Travel Assistant

Travel Companion is a user-friendly web app designed to make traveling easier and more organized. With features like a Weather Checker, Currency Converter, and Expense Tracker, travelers can manage important travel tasks in one place — all while staying logged in securely.

---

## 🌟 Features

### 🌍 1. User Authentication
- Register/Login using name (only during register), email, and password
- Secure authentication with JWT tokens
- Protected routes with session management

### 🌦️ 2. Weather Module (OpenWeather API)
- Search and display current weather for any city
- Save favorite cities for quick access
- View & delete saved favorite cities

### 💱 3. Currency Converter (ExchangeRate API)
- Real-time currency conversion between any two currencies
- Save conversion history
- View & delete saved conversion records

### 💸 4. Expense Tracker
- Add expenses with fields like amount, category, date, note (optional), and tripName (optional)
- View complete expense history
- Filter expenses by category and/or tripName
- Update and delete expenses

---

## 🧠 Technologies Used

- **Frontend:** React, Axios, React Router
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT, bcrypt
- **APIs:** OpenWeatherMap, ExchangeRate API

---

## 🗂️ Project Structure
TravelCompanion/
│
├── client/ # React frontend
│ ├── src/
│ ├── .env # External APIs (weather, currency)
│ └── ...
│
├── server/ # Node.js + Express backend
│ ├── routes/
│ ├── models/
│ ├── controllers/
│ ├── .env # DB URI, JWT secret
│ └── config

---

## 💻 Installation & Local Setup

### 1. Clone the repository

git clone https://github.com/yourusername/travelcompanion.git
cd travelcompanion

### 2. Backend Setup
cd server
npm install
# Create .env file using the format below
npm start

### 3. Frontend Setup
cd client
npm install
# Create .env file using the format below
npm run dev

### 🔐 Environment Variables
server/.env
env

PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
client/.env
env

REACT_APP_WEATHER_API_KEY=your_openweather_api_key
REACT_APP_CURRENCY_API_KEY=your_exchange_rate_api_key

## 🔀 API Endpoints Overview

### 🧑‍💻 User Endpoints
- **POST** `/api/auth/register` – Register a new user  
  ▸ Required Body: `name`, `email`, `password`  
  ▸ Auth: ❌ No

- **POST** `/api/auth/login` – Login and receive JWT token  
  ▸ Required Body: `email`, `password`  
  ▸ Auth: ❌ No

- **POST** `/api/auth/logout` – Logout (handled on client side)  
  ▸ Auth: ❌ No

---

### 🌦️ Weather Endpoints (Favorite City)
- **POST** `/api/weather/favorites` – Save a favorite city  
  ▸ Required Body: `{ "cityName": "Paris", "country": "France" }`  
  ▸ Auth: ✅ Yes

- **GET** `/api/weather/favorites` – Get list of saved favorite cities  
  ▸ Auth: ✅ Yes

- **DELETE** `/api/weather/favorites/:id` – Delete a favorite city  
  ▸ Auth: ✅ Yes

---

### 💱 Currency Endpoints
- **POST** `/api/currency/` – Save a new currency conversion  
  ▸ Auth: ✅ Yes

- **GET** `/api/currency/` – View all saved currency conversions  
  ▸ Auth: ✅ Yes

- **DELETE** `/api/currency/:id` – Delete a specific currency conversion  
  ▸ Auth: ✅ Yes

---

### 💸 Expense Endpoints
- **POST** `/api/expenses` – Add a new expense  
  ▸ Required Body: `amount`, `category`  
  ▸ Optional: `date`, `note`, `tripName`  
  ▸ Auth: ✅ Yes

- **GET** `/api/expenses` – Get all expenses of the logged-in user  
  ▸ Auth: ✅ Yes

- **GET** `/api/expenses/filter` – Filter expenses by category and/or tripName  
  ▸ Query Params: `category`, `tripName`  
  ▸ Auth: ✅ Yes

- **PUT** `/api/expenses/:id` – Update an expense by ID  
  ▸ Required Body: `amount`, `category`, etc.  
  ▸ Auth: ✅ Yes

- **DELETE** `/api/expenses/:id` – Delete an expense by ID  
  ▸ Auth: ✅ Yes

💡 Frontend Pages & Components
📄 Pages
Home (Header, Card, Footer)

Login

Register

Weather

Currency Converter

Expense Tracker

Not Found Page

🧩 Components (used in above pages)
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

🚀 Deployment
Deployment coming soon on platforms like:

Frontend: Netlify / Vercel

Backend: Render / Railway

Database: MongoDB Atlas

👤 Author
Name: Ghulam Muttaqa Shah

Project: TravelCompanion MERN App

📄 License
This project is licensed under the MIT License

Feel free to ⭐ star this repo if you found it helpful!