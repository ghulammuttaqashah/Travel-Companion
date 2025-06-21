function CurrencyHistoryCard({ record, onDelete }) {
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
      <h3 className="text-xl font-bold">
        {record.amount} {record.fromCurrency} → {record.toCurrency}
      </h3>
      <p className="text-m font-medium">
        Result: {record.result} {record.toCurrency}
      </p>
      <p className="text-m font-semibold mt-1">
        Converted on: {formatDate(record.date)}
      </p>
      <button
        onClick={() => onDelete(record._id)}
        className="mt-3 cursor-pointer bg-red-600 text-[#E2F1E7] text-xl font-bold py-2 px-4 rounded-full hover:bg-red-700 transition"
      >
        Delete
      </button>
    </div>
  );
}

export default CurrencyHistoryCard;