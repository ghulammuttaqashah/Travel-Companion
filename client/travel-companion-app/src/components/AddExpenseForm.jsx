import { useState } from "react";
import axiosInstance from "../services/axios";
import { useToast } from "./ToastContext";

function AddExpenseForm({ onAdd }) {
  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    amount: "",
    category: "",
    date: today,
    note: "",
    tripName: "",
  });

  const { showToast } = useToast();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.amount || !form.category) {
      showToast("error", "Amount and Category are required.");
      return;
    }

    // Convert amount to number and fill default values
    const payload = {
      ...form,
      amount: Number(form.amount),
      note: form.note.trim() === "" ? "N/A" : form.note,
      tripName: form.tripName.trim() === "" ? "N/A" : form.tripName,
      date: form.date.trim() === "" ? today : form.date,
    };

    try {
      await axiosInstance.post("/expenses", payload);
      showToast("success", "Expense added successfully!");
      onAdd(); // Refresh the list
      setForm({ amount: "", category: "", date: today, note: "", tripName: "" });
    } catch (error) {
      console.error("Add Expense Error:", error.response?.data || error.message);
      showToast("error", "Failed to add expense.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md mb-8 mt-5"
    >
      <h1 className="text-6xl font-extrabold text-[#243642] mb-2 text-center">
        Expense Tracker
      </h1>
      <h2 className="text-2xl sm:text-3xl font-bold text-[#243642] mt-4 mb-4 text-center">
        Add New Expense
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          className="border border-[#243642] rounded-lg px-4 py-2 focus:outline-none"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border border-[#243642] font-bold rounded-lg px-4 py-2 focus:outline-none bg-white"
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
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border border-[#243642] font-bold rounded-lg px-4 py-2 focus:outline-none"
        />

        <input
          type="text"
          name="tripName"
          placeholder="Trip Name (Optional, e.g. Italy Trip)"
          value={form.tripName}
          onChange={handleChange}
          className="border border-[#243642] rounded-lg px-4 py-2 focus:outline-none"
        />

        <textarea
          name="note"
          placeholder="Note (Optional)"
          value={form.note}
          onChange={handleChange}
          rows="2"
          className="col-span-1 sm:col-span-2 border border-[#243642] rounded-lg px-4 py-2 focus:outline-none resize-none"
        />
      </div>

      <div className="text-center mt-6">
        <button
          type="submit"
          className="bg-[#243642] text-[#E2F1E7] font-bold text-2xl py-2 px-6 rounded-full hover:bg-[#1c2b33] transition cursor-pointer"
        >
          Add Expense
        </button>
      </div>
    </form>
  );
}

export default AddExpenseForm;