import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header"; // Keep using the Quiz page header

const diabeticRecommendations = [
  "Monitor your blood sugar levels daily.",
  "Avoid sugary and processed foods.",
  "Maintain a low-carb, high-fiber diet.",
  "Exercise regularly (at least 30 minutes daily).",
  "Stay hydrated with water, not sugary drinks.",
  "Take prescribed medications regularly.",
  "Quit smoking and limit alcohol.",
  "Get regular checkups with your doctor.",
  "Manage stress with meditation or yoga.",
  "Get at least 7-8 hours of sleep.",
  "Track your carbohydrate intake.",
  "Limit salt to control blood pressure.",
  "Eat smaller, more frequent meals.",
  "Avoid skipping meals.",
  "Join a diabetes support group if needed.",
];

const nonDiabeticRecommendations = [
  "Maintain a healthy weight through balanced diet.",
  "Exercise at least 5 days a week.",
  "Limit added sugar and processed foods.",
  "Drink plenty of water.",
  "Avoid smoking and excessive alcohol.",
  "Get regular health screenings.",
  "Monitor your blood pressure and cholesterol.",
  "Eat more fiber-rich foods.",
  "Prioritize sleep (7–9 hours).",
  "Practice stress-reducing activities.",
  "Avoid skipping meals.",
  "Add more fruits and vegetables to your diet.",
  "Avoid prolonged sitting—take breaks.",
  "Cook at home more often than dining out.",
  "Track your progress using a health journal.",
];

const Recommendation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDiabetic } = location.state || { isDiabetic: false };

  const tips = isDiabetic
    ? diabeticRecommendations
    : nonDiabeticRecommendations;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tr from-blue-100 to-orange-100">
      {/* Header stays the same as in Quiz */}
      <Header />

      {/* Main content */}
      <main className="flex-grow">
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-orange-50 shadow rounded-lg">
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-700 via-rose-600 to-purple-800 text-transparent bg-clip-text text-center">
            Health Recommendations
          </h1>
          <p className="mb-6 text-gray-600 text-center py-2">
            Based on your result, here are some personalized tips:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            {tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-400 transition text-center"
            >
              Back to Home
            </button>
          </div>
        </div>
      </main>

      <footer className="mt-12 border-t border-gray-300 py-4 bg-[#003366]">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-white">
          HealthWise © 2025 - ML-Powered Diabetes Prediction
        </div>
      </footer>
    </div>
  );
};

export default Recommendation;
