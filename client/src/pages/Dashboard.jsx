import { useState } from "react";
import API from "../utils/api";

const diseaseFields = {
  diabetes: [
    "pregnancies",
    "glucose",
    "bloodPressure",
    "skinThickness",
    "insulin",
    "bmi",
    "diabetesPedigree",
    "age",
  ],
  heart: [
    "age",
    "sex",
    "cp",
    "trestbps",
    "chol",
    "fbs",
    "restecg",
    "thalach",
    "exang",
    "oldpeak",
    "slope",
    "ca",
    "thal",
  ],
  parkinsons: [
    "MDVP_Fo",
    "MDVP_Fhi",
    "MDVP_Flo",
    "MDVP_Jitter",
    "MDVP_Shimmer",
    "NHR",
    "HNR",
    "RPDE",
    "DFA",
    "spread1",
    "spread2",
    "D2",
    "PPE",
  ],
  cancer: [
    "radius_mean",
    "texture_mean",
    "perimeter_mean",
    "area_mean",
    "smoothness_mean",
    "compactness_mean",
    "concavity_mean",
    "concavePoints_mean",
    "symmetry_mean",
    "fractal_dimension_mean",
  ],
};

export default function Dashboard() {
  const [selectedDisease, setSelectedDisease] = useState("diabetes");
  const [form, setForm] = useState(
    Object.fromEntries(diseaseFields[selectedDisease].map((f) => [f, ""]))
  );
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // Update form when disease changes
  const handleDiseaseChange = (disease) => {
    setSelectedDisease(disease);
    setForm(Object.fromEntries(diseaseFields[disease].map((f) => [f, ""])));
    setResult(null);
    setError("");
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

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
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow p-6">
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

      {/* Main Dashboard */}
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">
          {selectedDisease.charAt(0).toUpperCase() + selectedDisease.slice(1)}{" "}
          Prediction
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
          <div className="mt-6 p-4 bg-gray-100 rounded shadow">
            <h3 className="text-xl font-bold">Prediction Result</h3>
            <p>
              <strong>Disease:</strong> {result.disease}
            </p>
            <p>
              <strong>Probability:</strong>{" "}
              {(result.probability * 100).toFixed(2)}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
