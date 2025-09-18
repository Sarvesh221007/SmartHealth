import { useState } from "react";
import API from "../utils/api";
import { Menu } from "lucide-react"; // hamburger icon

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
    setSidebarOpen(false); // close sidebar on mobile after selecting
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
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden p-4 absolute top-2 left-2 z-20 text-gray-700"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu size={28} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white shadow p-6 transform transition-transform duration-300 z-10 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <h2 className="text-xl font-bold mb-4">Select Disease</h2>
        <ul className="space-y-2">
          {Object.keys(diseaseFields).map((disease) => (
            <li
              key={disease}
              onClick={() => handleDiseaseChange(disease)}
              className={`p-2 rounded cursor-pointer hover:bg-green-100 ${
                selectedDisease === disease ? "bg-green-200 font-bold" : ""
              }`}
            >
              {disease.charAt(0).toUpperCase() + disease.slice(1)}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:ml-0 mt-12 md:mt-0">
        <h2 className="text-2xl font-bold mb-4">
          {selectedDisease.charAt(0).toUpperCase() + selectedDisease.slice(1)} Prediction
        </h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          {diseaseFields[selectedDisease].map((key) => (
            <input
              key={key}
              name={key}
              type="number"
              step="any"
              placeholder={key}
              value={form[key]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          ))}
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
            Predict
          </button>
        </form>

        {result && (
          <div className="mt-6 p-4 bg-white rounded shadow">
            <h3 className="text-xl font-bold">Prediction Result</h3>
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
