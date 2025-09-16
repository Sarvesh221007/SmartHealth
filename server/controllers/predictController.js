const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

// Flask ML server URL
const PYTHON_API = "http://127.0.0.1:5001";

// Define expected features for each disease
const expected_features = {
  diabetes: ["age", "bmi", "glucose", "insulin", "bloodPressure", "skinThickness", "diabetesPedigreeFunction", "sex"],
  heart: ["age", "sex", "cp", "trestbps", "chol", "fbs", "restecg", "thalach", "exang", "oldpeak", "slope"],
  parkinsons: ["mdvpFo", "mdvpFhi", "mdvpFlo", "jitterPercent", "shimmer", "nhr", "hnr", "rpde", "dfa", "spread1", "spread2", "d2"],
  cancer: ["radiusMean", "textureMean", "perimeterMean", "areaMean", "smoothnessMean"]
};

// Helper: Validate input fields
const validateInput = (disease, body) => {
  const missing = expected_features[disease].filter(f => !(f in body));
  if (missing.length) return `Missing fields: ${missing.join(", ")}`;
  return null;
};

const callPythonAPI = async (disease, req, res) => {
  const request_id = uuidv4(); // Unique ID per request
  console.log(`[${request_id}] Incoming request for ${disease}:`, req.body);

  // Input validation
  const error = validateInput(disease, req.body);
  if (error) {
    console.warn(`[${request_id}] Validation failed: ${error}`);
    return res.status(400).json({
      status: "error",
      message: error,
      timestamp: new Date().toISOString(),
      request_id
    });
  }

  try {
    const { data } = await axios.post(`${PYTHON_API}/predict/${disease}`, req.body);

    console.log(`[${request_id}] Prediction response:`, data);

    // Unified API format
    return res.json({
      status: "success",
      disease,
      prediction: data.prediction,
      probability: data.probability,
      timestamp: new Date().toISOString(),
      request_id
    });
  } catch (err) {
    console.error(`[${request_id}] Prediction failed:`, err.message);
    return res.status(500).json({
      status: "error",
      message: err.response?.data?.error || "Prediction failed",
      timestamp: new Date().toISOString(),
      request_id
    });
  }
};

// Export controllers
exports.predictDiabetes = (req, res) => callPythonAPI("diabetes", req, res);
exports.predictHeart = (req, res) => callPythonAPI("heart", req, res);
exports.predictParkinsons = (req, res) => callPythonAPI("parkinsons", req, res);
exports.predictCancer = (req, res) => callPythonAPI("cancer", req, res);
