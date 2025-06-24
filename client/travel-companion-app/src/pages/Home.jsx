import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/ToastContext";
import { useEffect, useState } from "react";
import axiosInstance from "../services/axios";

function Home() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    checkAuth();
  }, []);

  const handleProtectedClick = (path) => {
    if (isLoggedIn) {
      navigate(path);
    } else {
      showToast("error", "Please login to continue.");
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between px-4 sm:px-6 md:px-12 lg:px-20 py-12 gap-8">
        {/* Left Side */}
        <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
          <h1 className="text-[#243642] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
            Welcome to Travel Companion
          </h1>
          <p className="text-[#243642] text-base sm:text-lg md:text-xl lg:text-2xl font-medium mb-6 max-w-xl mx-auto md:mx-0">
            Your ultimate travel assistant! With easy access to a Currency Converter, Expense Tracker, and Weather Checker, this app ensures your travels are smooth, organized, and stress-free. Let us take care of the details, so you can focus on the adventure ahead.
          </p>
          <a
            href="https://www.linkedin.com/in/ghulam-muttaqa-shah/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <button className="bg-[#243642] text-[#E2F1E7] px-6 py-3 sm:px-8 sm:py-3.5 text-base sm:text-lg md:text-xl rounded font-bold hover:bg-[#1b2a33] transition duration-300">
              Contact Us!
            </button>
          </a>
        </div>

        {/* Right Side (Hero Image) */}
        <div className="w-full md:w-1/2">
          <img
            src="/images/Hero2.png"
            alt="Hero"
            className="w-full max-w-[400px] sm:max-w-[500px] md:max-w-full mx-auto h-auto object-contain"
          />
        </div>
      </div>

      {/* Tools Section */}
      <h1 className="text-[#243642] text-3xl sm:text-4xl md:text-5xl font-bold px-4 sm:px-6 md:px-12 lg:px-20 mb-8">
        Tools
      </h1>

      <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-6 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-24 pb-12">
        <div onClick={() => handleProtectedClick("/weather")} className="w-full sm:w-[300px] cursor-pointer">
          <Card
            title={"Weather App"}
            image="/images/weather-forecast.png"
            description={
              "Get real-time weather updates and 5-day forecasts for any city. Save your favorite cities, view all saved locations, and delete them as needed."
            }
          />
        </div>
        <div onClick={() => handleProtectedClick("/currency-converter")} className="w-full sm:w-[300px] cursor-pointer">
          <Card
            title={"Currency Converter"}
            image="/images/change.png"
            description={
              "Convert currencies instantly with accurate exchange rates and view conversion history. Add and delete favorite currencies for quick access."
            }
          />
        </div>
        <div onClick={() => handleProtectedClick("/expensetracker")} className="w-full sm:w-[300px] cursor-pointer">
          <Card
            title={"Expense Tracker"}
            image="/images/expense.png"
            description={
              "Track and manage your travel expenses with ease. Add, edit, delete and view expenses by category or trip name to stay within your budget."
            }
          />
        </div>
      </div>
    </>
  );
}

export default Home;