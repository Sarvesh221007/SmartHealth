import { useState } from "react";
import API from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "patient" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/api/auth/register", form);
      const { data } = await API.post("/auth/login", { email: form.email, password: form.password });
      login(data);
      navigate(data.user.role === "doctor" ? "/doctor" : "/dashboard");
    } catch (err) {
      alert(err.response?.data?.error || "Error registering");
    }
  };

  const handleGoogleSignup = async (credentialResponse) => {
    try {
      const { data } = await API.post("/auth/google-login", { token: credentialResponse.credential });
      login(data);
      navigate(data.user.role === "doctor" ? "/doctor" : "/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Google signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200">
      {/* Background Image */}
      <img
        src="/bg.jpg" // make sure bg.jpg is in public folder
        alt="Medical Background"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />

      {/* Form Container */}
      <div className="relative w-full max-w-md p-8 bg-white backdrop-blur-sm bg-opacity-80 shadow-2xl rounded-2xl space-y-6">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            onChange={handleChange}
            required
          />
          <select
            name="role"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-800 transition transform hover:-translate-y-1"
          >
            Register
          </button>
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-gray-500">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSignup}
            onError={() => alert("Google signup failed")}
          />
        </div>

        <p className="text-center text-sm text-gray-700 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
