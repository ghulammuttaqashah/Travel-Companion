import Card from "../components/Card";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-20 gap-6">
        {/* Left Side */}
        <div className="md:w-1/2 flex flex-col justify-center">
          <h1 className="text-[#243642] text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Welcome to Travel Companion
          </h1>
          <p className="text-[#243642] text-lg md:text-2xl font-medium mb-8 w-[90%]">
            Your ultimate travel assistant! With easy access to a Currency Converter, Expense Tracker, and Weather Checker, this app ensures your travels are smooth, organized, and stress-free. Let us take care of the details, so you can focus on the adventure ahead.
          </p>
          <a
            href="https://www.linkedin.com/in/ghulam-muttaqa-shah/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-[#243642] text-[#E2F1E7] cursor-pointer px-8 py-3 text-lg md:text-xl rounded font-bold hover:bg-[#1b2a33] transition">
              Contact Us!
            </button>
          </a>
        </div>

        {/* Right Side (Hero Image) */}
        <div className="md:w-1/2">
          <img src="/images/Hero2.png" alt="Hero" className="w-[90%] mx-auto h-auto" />
        </div>
      </div>

      {/* Tools Section */}
      <h1 className="text-[#243642] text-4xl md:text-5xl font-bold ml-6 mb-8">Tools</h1>

      <div className="flex flex-wrap justify-around px-6 md:px-12 lg:px-20 xl:px-24 gap-y-6 pb-12">
        <Link to="/weather">
          <Card
            title={"Weather App"}
            image="/images/weather-forecast.png"
            description={
              "Get real-time weather updates and 5-day forecasts for any city. Save your favorite cities, view all saved locations, and delete them as needed."
            }
          />
        </Link>
        <Link to="/currency-converter">
          <Card
            title={"Currency Converter"}
            image="/images/change.png"
            description={
              "Convert currencies instantly with accurate exchange rates and view conversion history. Add and delete favorite currencies for quick access."
            }
          />
        </Link>
        <Link to="/expensetracker">
          <Card
            title={"Expense Tracker"}
            image="/images/expense.png"
            description={
              "Track and manage your travel expenses with ease. Add, edit, delete and view expenses by category or trip name to stay within your budget."
            }
          />
        </Link>
      </div>
    </>
  );
}

export default Home;
