import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useToast } from "../components/ToastContext";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast(); // ✅ Use toast

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // ✅ Update login state on route change
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    showToast("success", "Logout successful!");

    // ✅ Stay on homepage if user is on "/", otherwise navigate to login
    if (location.pathname !== "/") {
      navigate("/login");
    }
  };

  return (
    <header className="bg-[#243642] text-[#E2F1E7] px-6 py-5 flex items-center justify-between relative shadow-md">
      <h1 className="text-4xl font-extrabold ml-10">Travel Companion</h1>

      {/* Desktop Nav */}
      <ul className="hidden md:flex space-x-8 items-center text-xl font-semibold">
        <li><Link to="/" className="hover:text-white transition">Home</Link></li>
        <li><Link to="/weather" className="hover:text-white transition">Weather</Link></li>
        <li><Link to="/currency-converter" className="hover:text-white transition">Currency Converter</Link></li>
        <li><Link to="/expensetracker" className="hover:text-white transition">Expense Tracker</Link></li>

        {isLoggedIn ? (
          <li>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 transition text-lg font-medium"
            >
              Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">
                <button className="bg-white text-[#243642] px-5 py-2 rounded hover:bg-gray-200 transition text-lg font-medium">
                  Login
                </button>
              </Link>
            </li>
            <li>
              <Link to="/register">
                <button className="bg-transparent border border-white text-[#E2F1E7] px-5 py-2 rounded hover:bg-white hover:text-[#243642] transition text-lg font-medium">
                  Register
                </button>
              </Link>
            </li>
          </>
        )}
      </ul>

      {/* Mobile Menu Icon */}
      <div className="md:hidden text-4xl cursor-pointer" onClick={toggleMenu}>☰</div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <ul className="absolute top-20 left-0 w-full bg-[#243642] text-[#E2F1E7] flex flex-col items-center space-y-6 py-6 md:hidden z-10 text-xl font-medium">
          <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/weather" onClick={toggleMenu}>Weather</Link></li>
          <li><Link to="/currency-converter" onClick={toggleMenu}>Currency Converter</Link></li>
          <li><Link to="/expensetracker" onClick={toggleMenu}>Expense Tracker</Link></li>

          {isLoggedIn ? (
            <li>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 transition text-lg font-medium"
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login" onClick={toggleMenu}>
                  <button className="bg-white text-[#243642] px-5 py-2 rounded hover:bg-gray-200 transition text-lg font-medium">
                    Login
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/register" onClick={toggleMenu}>
                  <button className="bg-transparent border border-white text-[#E2F1E7] px-5 py-2 rounded hover:bg-white hover:text-[#243642] transition text-lg font-medium">
                    Register
                  </button>
                </Link>
              </li>
            </>
          )}
        </ul>
      )}
    </header>
  );
}

export default Header;