import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axiosInstance from "../services/axios";
import { useToast } from "../components/ToastContext";
import Spinner from "../components/Spinner";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/weather";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // ✅ No need to store token manually
      await axiosInstance.post("/auth/login", { email, password });

      showToast("success", "Login successful!");
      navigate(from);
    } catch (err) {
      showToast("error", err?.response?.data?.error || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-[#2e4a57] text-[#E2F1E7] rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-5xl font-extrabold mb-8 text-center">Login</h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div>
            <label className="block text-lg font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded bg-[#243642] text-[#E2F1E7] border border-[#629584] focus:outline-none focus:ring-2 focus:ring-[#629584]"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-lg font-semibold mb-2">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded bg-[#243642] text-[#E2F1E7] border border-[#629584] focus:outline-none focus:ring-2 focus:ring-[#629584]"
              placeholder="Enter your password"
              required
            />
            <div className="mt-3 flex items-center">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="mr-2 accent-[#629584] w-4 h-4"
              />
              <label htmlFor="showPassword" className="text-m text-[#E2F1E7] font-semibold">
                Show Password
              </label>
            </div>
          </div>

          {/* Submit Button with Spinner */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-2xl py-3 rounded font-bold transition ${
              isLoading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-[#629584] hover:bg-[#4d7a6b] text-white"
            }`}
          >
            {isLoading ? <Spinner /> : "Login"}
          </button>
        </form>

        <p className="text-lg text-center mt-8">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="underline text-[#E2F1E7] font-semibold hover:text-[#cbe4d5]"
          >
            Register as a User
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;