import WeatherDisplay from "../components/WeatherDisplay";
import FavoriteCitiesList from "../components/FavoriteCitiesList";
import { useState } from "react";

function Weather() {
  const [refreshFavorites, setRefreshFavorites] = useState(false);

  const handleFavoriteAdded = () => {
    setRefreshFavorites((prev) => !prev); // trigger refresh
  };

  return (
    <div className="app-container">
      <WeatherDisplay onFavoriteAdded={handleFavoriteAdded} />
      <FavoriteCitiesList refreshTrigger={refreshFavorites} />
    </div>
  );
}

export default Weather;