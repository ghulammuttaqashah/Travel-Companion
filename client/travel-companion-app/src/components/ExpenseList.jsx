import Spinner from "./Spinner";
import ExpenseCard from "./ExpenseCard";

function ExpenseList({ expenses, loading, onDelete, onUpdate }) {
  return (
    <div className="w-full max-w-5xl mx-auto mt-12 mb-20 px-4">
      <h2 className="text-5xl font-bold text-[#243642] text-center mb-8">
        Expense Records
      </h2>

      {loading ? (
        <div className="flex justify-center mt-10">
          <Spinner />
        </div>
      ) : expenses.length === 0 ? (
        <p className="text-center text-[#243642] font-medium mt-10">
          No expenses found.
        </p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-6">
          {expenses.map((expense) => (
            <ExpenseCard
              key={expense._id}
              expense={expense}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ExpenseList;