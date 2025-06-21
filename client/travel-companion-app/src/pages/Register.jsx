import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../services/axios";
import { useToast } from "../components/ToastContext";
import Spinner from "../components/Spinner";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showToast("error", "Passwords do not match!");
      return;
    }

    setIsLoading(true);
    try {
      await axiosInstance.post("/auth/register", { name, email, password });
      showToast("success", "Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      showToast("error", err?.response?.data?.error || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const passwordsMatch = password === confirmPassword;

  return (
    <div className="flex items-center mt-15 mb-15 justify-center px-4">
      <div className="bg-[#2e4a57] text-[#E2F1E7] rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-5xl font-extrabold mb-8 text-center">Register</h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name Field */}
          <div>
            <label className="block text-lg font-semibold mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded bg-[#243642] text-[#E2F1E7] border border-[#629584] focus:outline-none focus:ring-2 focus:ring-[#629584]"
              placeholder="Enter your name"
              required
            />
          </div>

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
              placeholder="Create a password"
              required
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-lg font-semibold mb-2">Confirm Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 rounded bg-[#243642] text-[#E2F1E7] border border-[#629584] focus:outline-none focus:ring-2 focus:ring-[#629584]"
              placeholder="Confirm your password"
              required
            />
            {!passwordsMatch && confirmPassword.length > 0 && (
              <p className="text-red-400 font-bold text-xl mt-2">Passwords do not match</p>
            )}
          </div>

          {/* Show Password Checkbox */}
          <div className="mt-2 flex items-center">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="mr-2 accent-[#629584] w-4 h-4"
            />
            <label htmlFor="showPassword" className="text-sm text-[#E2F1E7] font-medium">
              Show Password
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-2xl py-3 rounded font-bold transition ${
              isLoading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-[#629584] hover:bg-[#4d7a6b] text-white"
            }`}
          >
            {isLoading ? <Spinner /> : "Register"}
          </button>
        </form>

        {/* Bottom Link */}
        <p className="text-lg text-center mt-8">
          Already have an account?{" "}
          <Link
            to="/login"
            className="underline text-[#E2F1E7] font-semibold hover:text-[#cbe4d5]"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;