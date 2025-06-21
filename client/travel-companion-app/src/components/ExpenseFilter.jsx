import { useState } from "react";
import axiosInstance from "../services/axios";
import { useToast } from "../components/ToastContext";

function ExpenseFilter({ onFilter }) {
  const [category, setCategory] = useState("");
  const [tripName, setTripName] = useState("");
  const { showToast } = useToast();

  const handleFilter = async () => {
    try {
      const params = {};
      if (category.trim()) params.category = category.trim();
      if (tripName.trim()) params.tripName = tripName.trim();

      const response = await axiosInstance.get("/expenses/filter", { params });
      onFilter(response.data);
      showToast("success", "Filter applied successfully.");
    } catch (error) {
      showToast("error", "Failed to filter expenses.");
    }
  };

  const handleClear = async () => {
    setCategory("");
    setTripName("");

    try {
      const response = await axiosInstance.get("/expenses");
      onFilter(response.data);
      showToast("info", "Filter cleared.");
    } catch (error) {
      showToast("error", "Failed to fetch expenses.");
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-6 mb-8 px-4">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full sm:w-1/3 px-4 py-2 rounded border font-bold border-gray-300 focus:outline-none bg-white text-[#243642]"
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Lodging">Lodging</option>
          <option value="Shopping">Shopping</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Flights">Flights</option>
          <option value="Fuel">Fuel</option>
          <option value="Utilities">Utilities</option>
          <option value="Miscellaneous">Miscellaneous</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="text"
          placeholder="Filter by Trip Name (e.g. Italy Trip)"
          value={tripName}
          onChange={(e) => setTripName(e.target.value)}
          className="w-full sm:w-1/3 px-4 py-2 rounded border border-gray-300 focus:outline-none text-[#243642]"
        />

        <div className="flex gap-3">
          <button
            onClick={handleFilter}
            className="bg-[#243642] cursor-pointer text-[#E2F1E7] font-bold text-xl px-4 py-2 rounded-full hover:bg-[#1c2b33] transition"
          >
            Apply Filter
          </button>
          <button
            onClick={handleClear}
            className="bg-[#629584] text-xl text-white font-bold px-4 py-2 rounded-full hover:bg-[#517b6a] transition cursor-pointer"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExpenseFilter;