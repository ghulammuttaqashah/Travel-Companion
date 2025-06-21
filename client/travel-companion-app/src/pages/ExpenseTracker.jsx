import { useEffect, useState } from "react";
import axiosInstance from "../services/axios";
import AddExpenseForm from "../components/AddExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseFilter from "../components/ExpenseFilter";
import { useToast } from "../components/ToastContext";

function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/expenses");
      setExpenses(res.data);
    } catch (error) {
      showToast("error", "Failed to fetch expenses.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this expense?");
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/expenses/${id}`);
      showToast("success", "Expense deleted successfully.");
      fetchExpenses();
    } catch (error) {
      showToast("error", "Failed to delete expense.");
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await axiosInstance.put(`/expenses/${id}`, updatedData);
      showToast("success", "Expense updated successfully.");
      fetchExpenses();
    } catch (error) {
      showToast("error", "Failed to update expense.");
    }
  };

  const handleFilteredExpenses = (filteredData) => {
    setExpenses(filteredData); // Filtered data from ExpenseFilter
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <>
      <AddExpenseForm onAdd={fetchExpenses} />
      <ExpenseFilter onFilter={handleFilteredExpenses} />
      <ExpenseList
        expenses={expenses}
        loading={loading}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
    </>
  );
}

export default ExpenseTracker;