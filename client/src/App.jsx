import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DoctorDashboard from "./pages/DoctorDashboard";

export default function App() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      {/* main grows to push footer down */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={user ? <Navigate to={user.role === "doctor" ? "/doctor" : "/dashboard"} /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to={user.role === "doctor" ? "/doctor" : "/dashboard"} /> : <Register />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/doctor" element={user ? (user.role === "doctor" ? <DoctorDashboard /> : <Navigate to="/dashboard" />) : <Navigate to="/login" />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
