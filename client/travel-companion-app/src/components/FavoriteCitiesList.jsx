import { useEffect, useState } from "react";
import axiosInstance from "../services/axios";
import { useToast } from "./ToastContext";
import FavoriteCityCard from "./FavoriteCityCard";

function FavoriteCitiesList({ refreshTrigger }) {
  const [favorites, setFavorites] = useState([]);
  const { showToast } = useToast();

  const getFavorites = async () => {
    try {
      const res = await axiosInstance.get("/weather/favorites", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setFavorites(res.data);
    } catch (error) {
      showToast("error", "Failed to fetch favorites.");
    }
  };

  useEffect(() => {
    getFavorites();
  }, [refreshTrigger]);

  const handleDelete = async (cityId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this city from favorites?");
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/weather/favorites/${cityId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      showToast("success", "City removed from favorites.");
      getFavorites();
    } catch (error) {
      showToast("error", "Failed to delete favorite.");
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto text-center mb-10">
      <h2 className="text-4xl mb-10 font-bold text-[#243642]">Your Favorite Cities</h2>

      {favorites.length === 0 ? (
        <p className="text-lg text-[#243642] font-semibold">No favorite cities to display.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 px-4">
          {[...favorites].reverse().map((city) => (
  <FavoriteCityCard key={city._id} city={city} onDelete={handleDelete} />
))}
        </div>
      )}
    </div>
  );
}

export default FavoriteCitiesList;