import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { useToast } from "../components/ToastContext";
import axiosInstance from "../services/axios";

function WeatherDisplay({ onFavoriteAdded }) {
  const [city, setCity] = useState("Karachi");
  const [data, setData] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // 👈 default to true
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  const { showToast } = useToast();
  const api_key = import.meta.env.VITE_WEATHER_API_KEY;

  const getWeather = async () => {
    if (!city) {
      alert("Please enter a city.");
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);
    setForecast(null);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 404) {
          alert("Please enter a correct city name.");
        } else {
          setError("API response " + response.status);
        }
        setLoading(false);
        return;
      }
      const result = await response.json();
      setData(result);

      const forecastResponse = await fetch(forecastUrl);
      if (!forecastResponse.ok) {
        setError("Unable to fetch forecast data.");
        setLoading(false);
        return;
      }
      const forecastResult = await forecastResponse.json();
      setForecast(forecastResult.list.filter((_, index) => index % 8 === 0));
    } catch (e) {
      setError("Unable to fetch weather data: " + e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getWeather();
  }, []);

  const getDayOfWeek = (date) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[new Date(date).getDay()];
  };

  const handleAddToFavorite = async () => {
    if (!data) {
      alert("Please search for a city first.");
      return;
    }

    const favoritePayload = {
      cityName: data.name,
      country: data.sys?.country || "",
      temperature: +(data.main.temp - 273.15).toFixed(0),
    };

    setFavoriteLoading(true);

    try {
      const response = await axiosInstance.post("/weather/favorites", favoritePayload);

      if (response.status === 200 || response.status === 201) {
        showToast("success", "City added to favorites!");
        if (onFavoriteAdded) onFavoriteAdded();
      } else {
        showToast("error", "Could not add to favorites. Try again.");
      }
    } catch (error) {
      const msg =
        error.response?.data?.message || "Something went wrong while adding to favorites.";
      showToast("error", msg);
    } finally {
      setFavoriteLoading(false);
    }
  };

  // ⛔ If loading is true and nothing rendered yet, show Spinner only
  if (loading && !data && !error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="border border-[#629584] rounded-2xl shadow-lg p-6 sm:p-8 text-center w-full max-w-2xl mt-10 mb-16 bg-white">
        <h1 className="text-5xl font-bold text-[#243642] mb-6">Weather App</h1>

        <div className="flex flex-wrap items-center justify-center mb-6 gap-4">
          <input
            type="text"
            placeholder="Enter City"
            className="w-[250px] h-[44px] text-center rounded-full border-2 border-[#243642] focus:outline-none text-base"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            onClick={getWeather}
            className="bg-[#243642] text-[#E2F1E7] cursor-pointer text-xl font-bold py-2.5 px-5 rounded-full hover:bg-[#1c2e38] transition"
          >
            Search
          </button>
          <button
            onClick={handleAddToFavorite}
            disabled={favoriteLoading}
            className={`bg-[#629584] cursor-pointer text-white text-xl font-bold py-2.5 px-5 rounded-full hover:bg-[#507668] transition flex items-center justify-center ${
              favoriteLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {favoriteLoading ? <Spinner /> : "Add to Favorite"}
          </button>
        </div>

        {loading && <Spinner />}
        {error && <p className="text-red-600 font-medium">{error}</p>}

        {data && (
          <div className="mb-6">
            <img
              src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt="Weather Icon"
              className="mx-auto"
            />
            <h2 className="text-3xl text-[#333333] font-bold">
              {(data.main.temp - 273.15).toFixed(0)} °C
            </h2>
            <h2 className="text-2xl text-[#333333] font-bold">{data.name}</h2>
            <p className="text-[#333333] text-xl ">{data.weather[0].description}</p>
          </div>
        )}

        {forecast && (
          <div>
            <h3 className="text-3xl font-bold text-[#243642] mt-8 mb-6">5 Day Weather Forecast</h3>
            <div className="flex justify-center flex-wrap gap-4">
              {forecast.map((day, index) => (
                <div
                  key={index}
                  className="border border-[#629584] rounded-xl p-4 w-[150px] bg-[#243642] text-[#E2F1E7] text-center shadow-md hover:scale-105 transition-transform"
                >
                  <img
                    src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                    alt="Weather Icon"
                    className="mx-auto w-[50px] h-[50px] mb-2"
                  />
                  <h5 className="text-base font-bold">{getDayOfWeek(day.dt_txt)}</h5>
                  <p className="text-base font-semibold">
                    {(day.main.temp - 273.15).toFixed(0)} °C
                  </p>
                  <p className="text-sm font-semibold">{day.weather[0].description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherDisplay;