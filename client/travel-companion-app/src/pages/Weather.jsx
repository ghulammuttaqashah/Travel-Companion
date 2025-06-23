import { useState } from "react";
import WeatherDisplay from "../components/WeatherDisplay";
import FavoriteCitiesList from "../components/FavoriteCitiesList";
import Spinner from "../components/Spinner";

function Weather() {
  const [refreshFavorites, setRefreshFavorites] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleFavoriteAdded = () => {
    setRefreshFavorites((prev) => !prev);
  };

  return (
    <div className="app-container flex justify-center items-center min-h-screen px-4">
      {loading ? (
        <Spinner />
      ) : (
        <div className="w-full">
          <WeatherDisplay
            onFavoriteAdded={handleFavoriteAdded}
            setLoading={setLoading}
          />
          <FavoriteCitiesList
            refreshTrigger={refreshFavorites}
            setLoading={setLoading}
          />
        </div>
      )}
    </div>
  );
}

export default Weather;