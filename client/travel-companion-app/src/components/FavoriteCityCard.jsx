function FavoriteCityCard({ city, onDelete }) {
  // Helper to format the date
  const formatDate = (isoString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Date(isoString).toLocaleString("en-US", options);
  };

  return (
    <div className="bg-[#243642] text-[#E2F1E7] p-5 rounded-2xl shadow-md flex flex-col items-center">
      <h3 className="text-xl font-bold">{city.cityName}</h3>
      <p className="text-base font-medium">{city.country} — {city.temperature} °C</p>
      <p className="text-m font-semibold mt-1">Added on: {formatDate(city.createdAt)}</p>
      <button
        onClick={() => onDelete(city._id)}
        className="mt-3 bg-red-600 text-[#E2F1E7] text-xl cursor-pointer font-bold py-2 px-4 rounded-full hover:bg-red-700 transition"
      >
        Delete
      </button>
    </div>
  );
}

export default FavoriteCityCard;