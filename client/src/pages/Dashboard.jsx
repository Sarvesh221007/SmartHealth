import { useState } from "react";
import API from "../utils/api";
import { Menu, X, Activity, Heart, Star, Crosshair } from "lucide-react";

const diseaseFields = {
  diabetes: ["Pregnancies", "Glucose", "Blood Pressure", "Skin Thickness", "Insulin", "BMI", "Diabetes Pedigree", "Age"],
  heart: ["Age", "Sex", "CP", "Trestbps", "Chol", "FBS", "RestECG", "Thalach", "Exang", "Oldpeak", "Slope", "CA", "Thal"],
  parkinsons: ["MDVP_Fo", "MDVP_Fhi", "MDVP_Flo", "MDVP_Jitter", "MDVP_Shimmer", "NHR", "HNR", "RPDE", "DFA", "Spread1", "Spread2", "D2", "PPE"],
  cancer: ["Radius Mean", "Texture Mean", "Perimeter Mean", "Area Mean", "Smoothness Mean", "Compactness Mean", "Concavity Mean", "Concave Points Mean", "Symmetry Mean", "Fractal Dimension Mean"],
};

const diseaseIcons = {
  diabetes: <Activity size={20} />,
  heart: <Heart size={20} />,
  parkinsons: <Star size={20} />,
  cancer: <Crosshair size={20} />,
};

export default function Dashboard() {
  const [selectedDisease, setSelectedDisease] = useState("diabetes");
  const [form, setForm] = useState(Object.fromEntries(diseaseFields["diabetes"].map(f => [f, ""])));
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleDiseaseChange = (disease) => {
    setSelectedDisease(disease);
    setForm(Object.fromEntries(diseaseFields[disease].map(f => [f, ""])));
    setResult(null);
    setError("");
    setSidebarOpen(false);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post(`/api/predict/${selectedDisease}`, form);
      setResult(data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Prediction failed");
      setResult(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white shadow-xl p-6 transform transition-transform duration-300 z-30
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        >
        <div className="flex justify-between items-center md:hidden mb-4">
          <h2 className="text-2xl font-bold">Diseases</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <h2 className="hidden md:block text-2xl font-bold mb-6">Diseases</h2>
        <ul className="space-y-3">
          {Object.keys(diseaseFields).map((disease) => (
            <li
              key={disease}
              onClick={() => handleDiseaseChange(disease)}
              className={`flex items-center gap-2 p-3 cursor-pointer rounded-lg transition-all duration-200 hover:bg-green-100
                ${selectedDisease === disease ? "bg-gradient-to-r from-green-400 to-green-500 text-white font-bold shadow-lg" : "text-gray-700"}`}
            >
              {diseaseIcons[disease]}
              <span className="capitalize">{disease}</span>
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
        {/* Tabs for medium and above screens */}
        <div className="hidden md:flex gap-4 mb-6 flex-wrap">
          {Object.keys(diseaseFields).map((disease) => (
            <button
              key={disease}
              onClick={() => handleDiseaseChange(disease)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all
                ${selectedDisease === disease ? "bg-green-600 text-white shadow-lg" : "bg-white text-gray-700 border border-gray-200 hover:bg-green-100"}`}
            >
              {diseaseIcons[disease]} <span className="capitalize">{disease}</span>
            </button>
          ))}
        </div>

        <h2 className="text-3xl font-bold mb-6">
          {selectedDisease.charAt(0).toUpperCase() + selectedDisease.slice(1)} Prediction
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {diseaseFields[selectedDisease].map((key) => (
              <div key={key} className="bg-white rounded-lg shadow p-4 flex flex-col">
                <label className="text-sm font-medium mb-1">{key}</label>
                <input
                  type="number"
                  step="any"
                  name={key}
                  value={form[key]}
                  onChange={handleChange}
                  placeholder={key}
                  className="p-2 border rounded focus:ring-2 focus:ring-green-400 outline-none w-full"
                  required
                />
              </div>
            ))}
          </div>
          <button className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition text-lg font-semibold w-full">
            Predict
          </button>
        </form>

        {result && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-lg animate-fade-in">
            <h3 className="text-2xl font-bold mb-4">Prediction Result</h3>
            <p className="mb-2">
              <strong>Disease:</strong> {result.disease}
            </p>
            <p className="mb-2">
              <strong>Probability:</strong>{" "}
              <span className={result.probability > 0.5 ? "text-red-600" : "text-green-600"}>
                {(result.probability * 100).toFixed(2)}%
              </span>
            </p>
            <div className="w-full bg-gray-200 h-4 rounded-full mt-2">
              <div
                className={`h-4 rounded-full ${result.probability > 0.5 ? "bg-red-600" : "bg-green-600"}`}
                style={{ width: `${(result.probability * 100).toFixed(0)}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
