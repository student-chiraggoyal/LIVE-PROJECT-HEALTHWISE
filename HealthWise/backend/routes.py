from flask import Blueprint, request, jsonify
import logging
from utils.diabetes_model import predict

logger = logging.getLogger(__name__)

prediction_api = Blueprint('prediction_api', __name__)

@prediction_api.route('/predict', methods=['POST'])
def predict_diabetes():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "Request body is empty"}), 400

        logger.info("Received prediction request")

        required_fields = [
            'pregnancies', 'glucose', 'bloodPressure',
            'skinThickness', 'insulin', 'bmi',
            'diabetesPedigreeFunction', 'age'
        ]

        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400

        result = predict(data)

        # Construct a friendly message
        probability = float(result["probability"])
        label = result["prediction"]

        if label == "Diabetic":
            message = f"❌ The person is diabetic with a probability of {probability * 100:.2f}%."
        else:
            message = f"✅ The person is not diabetic. However, there is a {probability * 100:.2f}% risk of developing diabetes in the future."

        logger.info(f"Prediction made: {label} with probability {probability:.2f}")

        # Return full response
        return jsonify({
            "prediction": label,
            "probability": probability,
            "message": message
        }), 200

    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500
