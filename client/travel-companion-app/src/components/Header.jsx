import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useToast } from "../components/ToastContext";
import axiosInstance from "../services/axios";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.get("/auth/verify");
        if (res.status === 200) {
          setIsLoggedIn(true);
        }
      } catch (err) {
        setIsLoggedIn(false);
      }
    };

    checkAuth(); // Initial check
    const interval = setInterval(checkAuth, 15 * 60 * 1000); // Every 15 minutes

    return () => clearInterval(interval); // Clean up on unmount
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      setIsLoggedIn(false);

      if (location.pathname !== "/") {
        navigate("/login");
      }
    } catch (err) {
      showToast("error", "Logout failed");
    }
  };

  const handleProtectedNav = (path) => {
    if (isLoggedIn) {
      navigate(path);
    } else {
      showToast("error", "Please login to continue.");
    }
    setIsMenuOpen(false); // Close mobile menu if open
  };

  return (
    <header className="bg-[#243642] text-[#E2F1E7] px-6 py-5 flex items-center justify-between relative shadow-md w-full z-20">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold px-2 text-center sm:text-left">
        Travel Companion
      </h1>

      {/* Desktop Nav */}
      <ul className="hidden md:flex space-x-8 items-center text-xl font-semibold">
        <li><Link to="/" className="hover:text-white transition cursor-pointer">Home</Link></li>
        <li><button onClick={() => handleProtectedNav("/weather")} className="hover:text-white transition cursor-pointer">Weather</button></li>
        <li><button onClick={() => handleProtectedNav("/currency-converter")} className="hover:text-white transition cursor-pointer">Currency Converter</button></li>
        <li><button onClick={() => handleProtectedNav("/expensetracker")} className="hover:text-white transition cursor-pointer">Expense Tracker</button></li>

        {isLoggedIn ? (
          <li>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-5 py-2 cursor-pointer rounded hover:bg-red-700 transition text-lg font-medium"
            >
              Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">
                <button className="bg-white text-[#243642] px-5 py-2 rounded hover:bg-gray-200 transition text-lg font-medium cursor-pointer">
                  Login
                </button>
              </Link>
            </li>
            <li>
              <Link to="/register">
                <button className="bg-transparent border cursor-pointer border-white text-[#E2F1E7] px-5 py-2 rounded hover:bg-white hover:text-[#243642] transition text-lg font-medium">
                  Register
                </button>
              </Link>
            </li>
          </>
        )}
      </ul>

      {/* Mobile Menu Icon */}
      <div className="md:hidden text-4xl cursor-pointer" onClick={toggleMenu}>
        ☰
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <ul className="absolute top-full left-0 w-full bg-[#243642] text-[#E2F1E7] flex flex-col items-center space-y-6 py-6 md:hidden z-10 text-xl font-medium shadow-md border-t border-[#243642]">
          <li><Link to="/" onClick={toggleMenu} className="cursor-pointer">Home</Link></li>
          <li><button onClick={() => handleProtectedNav("/weather")} className="cursor-pointer">Weather</button></li>
          <li><button onClick={() => handleProtectedNav("/currency-converter")} className="cursor-pointer">Currency Converter</button></li>
          <li><button onClick={() => handleProtectedNav("/expensetracker")} className="cursor-pointer">Expense Tracker</button></li>

          {isLoggedIn ? (
            <li>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="bg-red-600 text-white cursor-pointer px-5 py-2 rounded hover:bg-red-700 transition text-lg font-medium"
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login" onClick={toggleMenu}>
                  <button className="bg-white text-[#243642] px-5 cursor-pointer py-2 rounded hover:bg-gray-200 transition text-lg font-medium">
                    Login
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/register" onClick={toggleMenu}>
                  <button className="bg-transparent border cursor-pointer border-white text-[#E2F1E7] px-5 py-2 rounded hover:bg-white hover:text-[#243642] transition text-lg font-medium">
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