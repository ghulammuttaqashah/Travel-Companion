import { useEffect, useState } from "react";
import CurrencyDropDown from "../components/CurrencyDropDown";
import { useToast } from "../components/ToastContext";
import axiosInstance from "../services/axios";
import CurrencyHistoryList from "../components/CurrencyHistoryList";
import Spinner from "../components/Spinner";

function CurrencyConverter() {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("PKR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [rotated, setRotated] = useState(false);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false); // 👈 new state

  const { showToast } = useToast();
  const API_KEY = import.meta.env.VITE_EXCHANGE_API_KEY;

  const fetchCurrencies = async () => {
    try {
      const res = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`);
      const data = await res.json();
      if (data.result === "success") {
        setCurrencies(Object.keys(data.conversion_rates));
      } else {
        throw new Error("Failed to fetch currencies.");
      }
    } catch (error) {
      showToast("error", `Error fetching currencies: ${error.message}`);
    }
  };

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/currency");
      setHistory(res.data);
    } catch (err) {
      showToast("error", "Failed to load currency history.");
    }
    setLoading(false);
  };

  const convertCurrency = async () => {
    try {
      const res = await fetch(
        `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}/${amount}`
      );
      const data = await res.json();
      if (data.result === "success") {
        setConvertedAmount(data.conversion_result);
      } else {
        throw new Error("Failed to convert currency.");
      }
    } catch (error) {
      showToast("error", `Error converting currency: ${error.message}`);
    }
  };

  const addToHistory = async () => {
    if (!convertedAmount) {
      showToast("error", "Please convert first.");
      return;
    }

    setAddLoading(true); // 👈 show spinner on button

    try {
      const payload = {
        fromCurrency,
        toCurrency,
        amount: Number(amount),
        result: convertedAmount,
      };

      await axiosInstance.post("/currency", payload);
      showToast("success", "Conversion saved to history!");
      fetchHistory();
    } catch (error) {
      showToast("error", "Failed to save conversion.");
    } finally {
      setAddLoading(false); // 👈 hide spinner
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setRotated(true);
    setTimeout(() => setRotated(false), 300);
  };

  useEffect(() => {
    fetchCurrencies();
    fetchHistory();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="flex justify-center items-center mt-20 mb-24 px-4">
            <div className="bg-white border border-[#629584] rounded-2xl shadow-lg p-10 w-full max-w-xl">
              <h2 className="text-5xl font-extrabold text-[#243642] text-center mb-8">
                Currency Converter
              </h2>

              <div className="flex items-center justify-center gap-6 mb-8">
                <CurrencyDropDown
                  currencies={currencies}
                  title="From"
                  currency={fromCurrency}
                  setCurrency={setFromCurrency}
                />
                <img
                  onClick={swapCurrencies}
                  src="/images/arrow.png"
                  alt="swap"
                  width="36"
                  height="36"
                  className={`cursor-pointer transform mt-6 transition-transform duration-300 ${rotated ? "rotate-180" : ""}`}
                />
                <CurrencyDropDown
                  currencies={currencies}
                  title="To"
                  currency={toCurrency}
                  setCurrency={setToCurrency}
                />
              </div>

              <div className="mb-6">
                <label htmlFor="amount" className="block text-[#243642] text-lg font-semibold mb-2">
                  Amount:
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full border border-[#629584] rounded-md px-4 py-2 shadow-sm text-lg"
                />
              </div>

              <div className="flex justify-center gap-6 mt-6">
                <button
                  onClick={convertCurrency}
                  className="bg-[#243642] cursor-pointer text-[#E2F1E7] font-bold py-2 px-6 rounded-full hover:bg-[#1e2e38] transition text-2xl"
                >
                  Convert
                </button>
                <button
                  onClick={addToHistory}
                  disabled={addLoading}
                  className={`bg-[#629584] cursor-pointer text-white font-bold py-2 px-6 rounded-full hover:bg-[#517b6a] transition text-2xl flex items-center justify-center ${
                    addLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {addLoading ? <Spinner /> : "Add to History"}
                </button>
              </div>

              <div className="mt-6 text-right text-[#243642] font-bold text-2xl">
                Converted Amount: {convertedAmount ? `${convertedAmount} ${toCurrency}` : "N/A"}
              </div>
            </div>
          </div>

          <CurrencyHistoryList history={history} loading={loading} fetchHistory={fetchHistory} />
        </>
      )}
    </>
  );
}

export default CurrencyConverter;