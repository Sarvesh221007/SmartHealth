import { useState } from "react";
import API from "../utils/api";
import { Menu, X } from "lucide-react"; // hamburger & close icons

const diseaseFields = {
  diabetes: ["pregnancies", "glucose", "bloodPressure", "skinThickness", "insulin", "bmi", "diabetesPedigree", "age"],
  heart: ["age", "sex", "cp", "trestbps", "chol", "fbs", "restecg", "thalach", "exang", "oldpeak", "slope", "ca", "thal"],
  parkinsons: ["MDVP_Fo", "MDVP_Fhi", "MDVP_Flo", "MDVP_Jitter", "MDVP_Shimmer", "NHR", "HNR", "RPDE", "DFA", "spread1", "spread2", "D2", "PPE"],
  cancer: ["radius_mean", "texture_mean", "perimeter_mean", "area_mean", "smoothness_mean", "compactness_mean", "concavity_mean", "concavePoints_mean", "symmetry_mean", "fractal_dimension_mean"],
};

export default function Dashboard() {
  const [selectedDisease, setSelectedDisease] = useState("diabetes");
  const [form, setForm] = useState(Object.fromEntries(diseaseFields["diabetes"].map((f) => [f, ""])));
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleDiseaseChange = (disease) => {
    setSelectedDisease(disease);
    setForm(Object.fromEntries(diseaseFields[disease].map((f) => [f, ""])));
    setResult(null);
    setError("");
    setSidebarOpen(false); // Close sidebar on mobile
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post(`/predict/${selectedDisease}`, form);
      setResult(data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Prediction failed");
      setResult(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white shadow-lg p-6 transform transition-transform duration-300 z-30
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Close Button on Mobile */}
        <div className="flex justify-between items-center md:hidden mb-4">
          <h2 className="text-xl font-bold">Select Disease</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <h2 className="hidden md:block text-xl font-bold mb-4">Select Disease</h2>

        <ul className="space-y-2">
          {Object.keys(diseaseFields).map((disease) => (
            <li
              key={disease}
              onClick={() => handleDiseaseChange(disease)}
              className={`p-2 rounded cursor-pointer hover:bg-green-100 transition
                ${selectedDisease === disease ? "bg-green-200 font-bold" : ""}`}
            >
              {disease.charAt(0).toUpperCase() + disease.slice(1)}
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Hamburger Button */}
      {!sidebarOpen && (
        <button
          className="md:hidden p-3 absolute top-4 left-4 z-40 text-gray-700 bg-white rounded-full shadow-md"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={28} />
        </button>
      )}

      {/* Main Content */}
      <div className="flex-1 p-6 md:ml-64 mt-12 md:mt-0 transition-all duration-300">
        <h2 className="text-2xl font-bold mb-4">
          {selectedDisease.charAt(0).toUpperCase() + selectedDisease.slice(1)} Prediction
        </h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
          {diseaseFields[selectedDisease].map((key) => (
            <input
              key={key}
              name={key}
              type="number"
              step="any"
              placeholder={key}
              value={form[key]}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
          ))}
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full">
            Predict
          </button>
        </form>

        {result && (
          <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">Prediction Result</h3>
            <p>
              <strong>Disease:</strong> {result.disease}
            </p>
            <p>
              <strong>Probability:</strong> {(result.probability * 100).toFixed(2)}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
