import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-[#243642] px-6 text-center">
      <h1 className="text-7xl font-extrabold mb-4">404</h1>
      <p className="text-2xl font-semibold mb-6">Page Not Found</p>
      <p className="text-lg mb-8">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link
        to="/"
        className="bg-[#243642] text-[#E2F1E7] px-6 py-3 rounded-lg font-semibold hover:bg-[#1c2e38] transition"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;