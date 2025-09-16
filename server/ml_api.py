from flask import Flask, request, jsonify
import pickle, os
import numpy as np

app = Flask(__name__)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load models
models = {
    "diabetes": pickle.load(open(os.path.join(BASE_DIR, "ml_models/diabetes_model.pkl"), "rb")),
    "heart": pickle.load(open(os.path.join(BASE_DIR, "ml_models/heart_model.pkl"), "rb")),
    "parkinsons": pickle.load(open(os.path.join(BASE_DIR, "ml_models/parkinsons_model.pkl"), "rb")),
    "cancer": pickle.load(open(os.path.join(BASE_DIR, "ml_models/cancer_model.pkl"), "rb"))
}

expected_features = {
    "diabetes": ["pregnancies", "glucose", "bloodPressure", "skinThickness",
                 "insulin", "bmi", "diabetesPedigree", "age"],
    "heart": ["age","sex","cp","trestbps","chol","fbs",
              "restecg","thalach","exang","oldpeak","slope","ca","thal"],
    "parkinsons": ["f1","f2","f3","f4","f5","f6","f7","f8","f9","f10","f11","f12",
                   "f13","f14","f15","f16","f17","f18","f19","f20","f21","f22"],
    "cancer": ["f1","f2","f3","f4","f5","f6","f7","f8","f9","f10","f11","f12","f13","f14",
               "f15","f16","f17","f18","f19","f20","f21","f22","f23","f24","f25","f26","f27","f28","f29","f30"]
}



@app.route("/predict/<disease>", methods=["POST"])
def predict(disease):
    if disease not in models:
        return jsonify({"error": "Unknown disease"}), 400

    data = request.json
    print("DEBUG: Got JSON ->", data)
    print("DEBUG: Expected keys ->", expected_features[disease])

    try:
        features = [float(data[f]) for f in expected_features[disease]]
        features = np.array(features).reshape(1, -1)
    except Exception as e:
        return jsonify({"error": f"Invalid input: {str(e)}"}), 400

    model = models[disease]
    prediction = int(model.predict(features)[0])
    probability = float(model.predict_proba(features).max())

    return jsonify({
        "disease": disease.capitalize(),
        "class": prediction,
        "probability": probability
    })



if __name__ == "__main__":
    app.run(port=5001, debug=True)
