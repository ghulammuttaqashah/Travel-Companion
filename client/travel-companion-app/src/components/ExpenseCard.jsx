import { useState } from "react";

function ExpenseCard({ expense, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...expense });

  const formatDate = (isoString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(isoString).toLocaleDateString("en-US", options);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSubmitUpdate = () => {
    const payload = {
      ...editData,
      note: editData.note?.trim() || "N/A",
      tripName: editData.tripName?.trim() || "N/A",
    };

    onUpdate(expense._id, payload); // ⬅️ Send to parent
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(expense._id);
  };

  return (
    <div className="bg-[#243642] text-[#E2F1E7] p-5 rounded-2xl shadow-md">
      <div className="space-y-4">
        {isEditing ? (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-semibold mb-1">Amount (Rs)</label>
              <input
                type="number"
                name="amount"
                value={editData.amount}
                onChange={handleChange}
                className="w-full bg-white text-[#243642] px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Category</label>
              <input
                name="category"
                value={editData.category}
                onChange={handleChange}
                className="w-full bg-white text-[#243642] px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={editData.date.split("T")[0]}
                onChange={handleChange}
                className="w-full bg-white text-[#243642] px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Trip Name</label>
              <input
                name="tripName"
                value={editData.tripName}
                onChange={handleChange}
                className="w-full bg-white text-[#243642] px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Note</label>
              <input
                name="note"
                value={editData.note}
                onChange={handleChange}
                className="w-full bg-white text-[#243642] px-3 py-2 rounded"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            <h3 className="text-xl font-bold">Amount: Rs. {expense.amount}</h3>
            <p className="text-m font-medium">Category: {expense.category}</p>
            <p className="text-m">Date: {formatDate(expense.date)}</p>
            <p className="text-m">Trip: {expense.tripName || "N/A"}</p>
            <p className="text-m">Note: {expense.note || "N/A"}</p>
          </div>
        )}

        <div className="flex justify-end gap-3 mt-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSubmitUpdate}
                className="bg-[#629584] cursor-pointer text-white text-xl font-bold py-1 px-4 rounded-full hover:bg-[#4f7869] transition"
              >
                Update
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-red-500 text-white text-xl cursor-pointer font-bold py-1 px-4 rounded-full hover:bg-red-700 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-[#629584] text-white cursor-pointer text-xl font-bold py-1 px-4 rounded-full hover:bg-[#4f7869] transition"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white cursor-pointer text-xl font-bold py-1 px-4 rounded-full hover:bg-red-700 transition"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExpenseCard;
