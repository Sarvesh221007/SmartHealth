import numpy as np
from sklearn.ensemble import RandomForestClassifier
import pickle
import os

os.makedirs("ml_models", exist_ok=True)

def save_model(X, y, filename):
    model = RandomForestClassifier()
    model.fit(X, y)
    with open(filename, "wb") as f:
        pickle.dump(model, f)
    print(f"✅ Saved {filename}")

# Diabetes (8 features)
X = np.random.rand(500, 8) * 100
y = np.random.randint(0, 2, 500)
save_model(X, y, "ml_models/diabetes_model.pkl")

# Heart (13 features)
X = np.random.rand(500, 13) * 100
y = np.random.randint(0, 2, 500)
save_model(X, y, "ml_models/heart_model.pkl")

# Parkinsons (22 features)
X = np.random.rand(500, 22) * 100
y = np.random.randint(0, 2, 500)
save_model(X, y, "ml_models/parkinsons_model.pkl")

# Cancer (30 features)
X = np.random.rand(500, 30) * 100
y = np.random.randint(0, 2, 500)
save_model(X, y, "ml_models/cancer_model.pkl")

print("🎉 All dummy models created successfully!")
