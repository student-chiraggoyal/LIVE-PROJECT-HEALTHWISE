import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib
import os
import logging

logger = logging.getLogger(__name__)

MODEL_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'model')
MODEL_PATH = os.path.join(MODEL_DIR, 'diabetes_model.pkl')
SCALER_PATH = os.path.join(MODEL_DIR, 'scaler.pkl')
DATASET_PATH = os.path.join(MODEL_DIR, 'diabetes.csv')

FEATURE_MAPPING = {
    'pregnancies': 'Pregnancies',
    'glucose': 'Glucose',
    'bloodPressure': 'BloodPressure',
    'skinThickness': 'SkinThickness',
    'insulin': 'Insulin',
    'bmi': 'BMI',
    'diabetesPedigreeFunction': 'DiabetesPedigreeFunction',
    'age': 'Age'
}

FEATURE_NAMES = list(FEATURE_MAPPING.keys())

def train_model():
    try:

        if not os.path.exists(MODEL_DIR):
            os.makedirs(MODEL_DIR)
            
        if os.path.exists(MODEL_PATH) and os.path.exists(SCALER_PATH):
            logger.info("Model already exists, loading existing model")
            model = joblib.load(MODEL_PATH)
            scaler = joblib.load(SCALER_PATH)
            return model, scaler
            
        logger.info("Training new diabetes prediction model...")
        
        if os.path.exists(DATASET_PATH):
            logger.info(f"Loading dataset from {DATASET_PATH}")
            df = pd.read_csv(DATASET_PATH)
            
            X = df.drop('Outcome', axis=1)
            y = df['Outcome']
            
            X_train, X_test, y_train, y_test = train_test_split(
                X, y, test_size=0.2, random_state=42
            )
        else:
            logger.warning(f"Dataset not found at {DATASET_PATH}, using synthetic data")
        
        scaler = StandardScaler()
        X_train_scaled = scaler.fit_transform(X_train)
        X_test_scaled = scaler.transform(X_test)
        
        model = RandomForestClassifier(
            n_estimators=200, 
            max_depth=10,
            min_samples_split=5,
            random_state=42
        )
        model.fit(X_train_scaled, y_train)
        
        train_score = model.score(X_train_scaled, y_train)
        test_score = model.score(X_test_scaled, y_test)
        
        logger.info(f"Model trained. Accuracy: {test_score:.4f}")
        
        joblib.dump(model, MODEL_PATH)
        joblib.dump(scaler, SCALER_PATH)
        
        logger.info(f"Model and scaler saved")
        
        return model, scaler
        
    except Exception as e:
        logger.error(f"Error training model: {str(e)}")
        raise

def load_model():
    try:
        if not os.path.exists(MODEL_PATH) or not os.path.exists(SCALER_PATH):
            logger.info("Model not found, training new model...")
            return train_model()
        
        logger.info(f"Loading model from {MODEL_PATH}")
        model = joblib.load(MODEL_PATH)
        scaler = joblib.load(SCALER_PATH)
        
        return model, scaler
        
    except Exception as e:
        logger.error(f"Error loading model: {str(e)}")
        return train_model()

def preprocess_input(data):
    try:
        _, scaler = load_model()
        
        features = [data[feature] for feature in FEATURE_NAMES]
        
        features_array = np.array(features).reshape(1, -1)
        
        scaled_features = scaler.transform(features_array)
        
        return scaled_features
        
    except Exception as e:
        logger.error(f"Error preprocessing input: {str(e)}")
        raise

def predict(input_data):
    try:
        model, _ = load_model()
        input_features = preprocess_input(input_data)

        prediction_proba = model.predict_proba(input_features)[0][1]
        prediction_label = "Diabetic" if prediction_proba >= 0.5 else "Non-Diabetic"
        probability_percent = prediction_proba * 100  # Convert to %

        # Friendly custom message
        if prediction_label == "Diabetic":
            message = f"⚠️ The person is diabetic with a high probability of {probability_percent:.2f}%."
        else:
            message = f"✅ The person is not diabetic. However, risk of getting diabetes in the future is {probability_percent:.2f}%."

        return {
            "prediction": prediction_label,
            "probability": round(prediction_proba, 4),  # keep raw value (e.g. 0.1364)
            "message": message
        }

    except Exception as e:
        logger.error(f"Error making prediction: {str(e)}")
        raise
