import { useState } from "react";
import API from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/api/api/auth/login", form);
      login(data);
      navigate(data.user.role === "doctor" ? "/doctor" : "/dashboard");
    } catch (err) {
      alert(err.response?.data?.error || "Error logging in");
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const { data } = await API.post("/auth/google-login", { token: credentialResponse.credential });
      login(data);
      navigate(data.user.role === "doctor" ? "/doctor" : "/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Google login failed");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Full background image */}
      <img
        src="/bg.jpg"
        alt="Medical Background"
        className="absolute inset-0 w-full h-full object-cover brightness-50"
      />

      {/* Overlay for darkening effect */}
      <div className="absolute inset-0 bg-opacity-30"></div>

      {/* Login box */}
      <div className="relative w-full max-w-md p-10 bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl space-y-6 z-10">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Welcome Back</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-800 transition transform hover:-translate-y-1"
          >
            Login
          </button>
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-gray-400">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="flex justify-center">
          <GoogleLogin onSuccess={handleGoogleLogin} onError={() => alert("Google login failed")} />
        </div>

        <p className="text-center text-sm text-gray-700 mt-4">
          New here?{" "}
          <Link to="/register" className="text-blue-600 font-medium hover:underline">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
