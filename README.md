# ✈️ Travel Companion App (MERN): Your All-in-One Travel Assistant

Travel Companion is a user-friendly web app designed to make traveling easier and more organized. With features like a Weather Checker, Currency Converter, and Expense Tracker, travelers can manage important travel tasks in one place — all while staying logged in securely.

---

## 🌟 Features

### 🌍 1. User Authentication
- Register/Login using name (only during register), email, and password
- Secure authentication using HTTP-only JWT cookies (not exposed to JavaScript)
- Protected routes validated via backend session (cookie-based verification)

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

## 🗂️ Project Structure

- **TravelCompanion/**
  - `client/` – React frontend
    - `src/`
    - `.env` – for external API keys (weather, currency)
  - `server/` – Node.js + Express backend
    - `routes/`
    - `models/`
    - `controllers/`
    - `config/`
    - `.env` – for MongoDB URI and JWT secret

---

# 💻 Installation & Local Setup

## 1. Clone the Repository
- git clone https://github.com/yourusername/Travel-Companion.git
- cd Travel-Companion

## 2. Backend Setup
- cd server
- npm install
- npm start
- Important Backend Packages:
    -bcryptjs – for password hashing
    -jsonwebtoken – for creating and verifying JWTs
    -cookie-parser – for handling HTTP-only cookies
    -express – server framework
    -mongoose – for MongoDB integration
    -cors – to handle cross-origin requests
    -dotenv – to manage environment variables

## 3. Frontend Setup
- cd client
- npm install
- npm run dev
- Important Backend Packages:
    -axios – for api calls
    -tailwind CSS – for styles and UI.
    -react-router – for navigating pages

## 🔐 Environment Variables
### 🔧 server/.env
#### env
- PORT=5000
- MONGODB_URI=your_mongodb_connection_string
- JWT_SECRET=your_jwt_secret
- CLIENT_URL=your_react_app_url

### 🌐 client/.env
#### env
- REACT_APP_WEATHER_API_KEY=your_openweather_api_key
- REACT_APP_CURRENCY_API_KEY=your_exchange_rate_api_key
- Vite_API_BASE_URL=your_server_url
  
---


# 🔀 API Endpoints Overview

## 🧑‍💻 User Endpoints

- **POST** `/api/auth/register` – Register a new user  
  ▸ Required Body: `name`, `email`, `password`  
  ▸ Auth: ❌ No

- **POST** `/api/auth/login` – Login and receive HTTP-only JWT cookie  
  ▸ Required Body: `email`, `password`  
  ▸ Auth: ❌ No

- **POST** `/api/auth/logout` – Logout and clear cookie  
  ▸ Auth: ❌ No

- **GET** `/api/auth/verify` – Check if user is authenticated (via cookie)  
  ▸ Auth: ✅ Yes


---

## 🌦️ Weather Endpoints (Favorite City)
- **POST** `/api/weather/favorites` – Save a favorite city  
  ▸ Required Body: `{ "cityName": "Paris", "country": "France" }`  
  ▸ Auth: ✅ Yes

- **GET** `/api/weather/favorites` – Get list of saved favorite cities  
  ▸ Auth: ✅ Yes

- **DELETE** `/api/weather/favorites/:id` – Delete a favorite city  
  ▸ Auth: ✅ Yes

---

## 💱 Currency Endpoints
- **POST** `/api/currency/` – Save a new currency conversion  
  ▸ Auth: ✅ Yes

- **GET** `/api/currency/` – View all saved currency conversions  
  ▸ Auth: ✅ Yes

- **DELETE** `/api/currency/:id` – Delete a specific currency conversion  
  ▸ Auth: ✅ Yes

---

## 💸 Expense Endpoints
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


# 💡 Frontend Pages & Components

## 📄 Pages
- **Home Page**  
  ▸ Uses: `Header`, `Card`, `Footer`

- **Login Page**

- **Register Page**

- **Weather Page**

- **Currency Converter Page**

- **Expense Tracker Page**

- **Not Found Page (404)**

- **Session Expired**

---

## 🧩 Components (Used in Above Pages)

### 🔁 Shared Components
- `Header.jsx`
- `Footer.jsx`
- `Spinner.jsx`

### 🌦️ Weather Module Components
- `WeatherDisplay.jsx`
- `FavoriteCityCard.jsx`
- `FavoriteCitiesList.jsx`

### 💱 Currency Module Components
- `CurrencyDropDown.jsx`
- `CurrencyHistoryCard.jsx`
- `CurrencyHistoryList.jsx`

### 💸 Expense Module Components
- `AddExpenseForm.jsx`
- `ExpenseFilter.jsx`
- `ExpenseCard.jsx`
- `ExpenseList.jsx`

---

### 🧩 Extra Components
- `ToastContext.jsx` – for custom toast messages  
- `ProtectedRoutes.jsx` – to restrict access to authenticated routes

---

### ⚙️ Services
- `Axios.js`


# 👤 Author

- **Name:** Ghulam Muttaqa Shah  
- **Project:** Travel Companion – MERN Stack App

---

## 📄 License

This project is licensed under the **MIT License**.

> ⭐ **Feel free to star this repository if you found it helpful!**
