import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Weather from './pages/Weather';
import CurrencyConverter from './pages/CurrencyConverter';
import ExpenseTracker from './pages/ExpenseTracker';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import NotFound from "./pages/NotFound";
import SessionExpired from "./pages/SessionExpired";



function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/session-expired" element={<SessionExpired />} />

        {/* Protected Routes */}
        <Route path="/weather" element={<ProtectedRoute><Weather /></ProtectedRoute>} />
        <Route path="/currency-converter" element={<ProtectedRoute><CurrencyConverter /></ProtectedRoute>} />
        <Route path="/expensetracker" element={<ProtectedRoute><ExpenseTracker /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;