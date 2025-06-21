import axiosInstance from "../services/axios";
import { useToast } from "../components/ToastContext";
import Spinner from "../components/Spinner";
import CurrencyHistoryCard from "../components/CurrencyHistoryCard";

function CurrencyHistoryList({ history, loading, fetchHistory }) {
  const { showToast } = useToast();

  const handleDelete = async (recordId) => {
    const confirmDelete = confirm("Are you sure you want to delete this record?");
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/currency/${recordId}`);
      showToast("success", "Record removed from history.");
      fetchHistory(); // ✅ Re-fetch after delete
    } catch (err) {
      showToast("error", "Failed to delete record.");
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-12 mb-20 px-4">
      <h2 className="text-5xl font-bold text-[#243642] text-center mb-8">
        Conversion History
      </h2>

      {loading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : history.length === 0 ? (
        <p className="text-center text-[#243642] font-medium">
          No conversion history available.
        </p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {history.map((record) => (
            <CurrencyHistoryCard key={record._id} record={record} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CurrencyHistoryList;