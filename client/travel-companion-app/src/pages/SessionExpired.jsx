import { Link } from "react-router-dom";

function SessionExpired() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-[#243642] px-6 text-center">
      <h1 className="text-6xl font-extrabold mb-4">Session Expired</h1>
      <p className="text-2xl font-semibold mb-6">Please log in again</p>
      <p className="text-lg mb-8">
        Your session has expired for security reasons. You need to log in again to continue.
      </p>
      <div className="flex gap-4">
        <Link
          to="/login"
          className="bg-[#243642] text-[#E2F1E7] px-6 py-3 rounded-lg font-semibold hover:bg-[#1c2e38] transition"
        >
          Go to Login
        </Link>
        <Link
          to="/"
          className="border border-[#243642] text-[#243642] px-6 py-3 rounded-lg font-semibold hover:bg-[#243642] hover:text-[#E2F1E7] transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default SessionExpired;