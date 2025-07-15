import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { mapQuizToClinical } from "../utils/quizToClinical";
import { quizQuestions } from "../constants/quizQuestions";
import { predictionService } from "../services/supabaseClient";
import { motion } from "framer-motion";
import { Lightbulb, Activity, ShieldCheck, HeartPulse, Info, HelpCircle, User, Sun, Moon } from "lucide-react";

const QuizPage = () => {
  const navigate = useNavigate();
  const [quizAnswers, setQuizAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const unanswered = quizQuestions
      .filter((q) => !q.condition || q.condition(quizAnswers))
      .some((q) => !quizAnswers[q.id]);

    if (unanswered) {
      toast.error("Please answer all questions before submitting.");
      return;
    }

    const clinicalData = mapQuizToClinical(quizAnswers);
    setIsLoading(true);

    try {
      const result = await predictionService.submitPrediction(clinicalData);
      navigate("/dashboard", {
        state: {
          prediction: result,
          clinicalData: clinicalData,
        },
      });
    } catch (error) {
      console.error("Prediction error:", error);
      toast.error("Failed to fetch prediction. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-grow bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10 text-center"
        >
          <div className="flex justify-center items-center gap-3 mb-3">
            <HeartPulse className="w-8 h-8 text-purple-700" />
            <h1 className="text-4xl md:text-4xl font-bold text-gray-800 bg-gradient-to-r from-blue-700 via-rose-600 to-purple-800 text-transparent bg-clip-text">
              Lifestyle-Based Diabetes Risk Assessment
            </h1>
          </div>

          <h2 className="text-xl font-medium text-purple-700 mb-2">
            Predict your health through your habits
          </h2>

          <p className="text-gray-600 max-w-3xl mx-auto text-1lg">
            This interactive quiz estimates your diabetes risk by analyzing lifestyle patterns like activity, sleep, stress, and diet. Powered by a machine learning model trained on real medical data, it offers an easy, accessible, and non-invasive health check — without the need for lab tests.
          </p>
        </motion.div>

        {/* 3D Info Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="w-full rounded-2xl shadow-xl p-6 border border-purple-200 bg-gradient-to-r from-rose-300 to-white-200"
          >
            <div className="flex items-start gap-4">
              <Lightbulb className="text-purple-700 w-8 h-8 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  What is this quiz?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  This lifestyle quiz is designed to estimate important clinical metrics (such as glucose level, BMI, insulin, and more) based on your daily habits. It uses a machine learning model trained on real health data to predict your risk of developing diabetes — even without requiring lab test inputs.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="w-full rounded-2xl shadow-xl p-6 border border-indigo-200 bg-gradient-to-r from-indigo-200 to-white-200"
          >
            <div className="flex items-start gap-4">
              <Activity className="text-indigo-700 w-8 h-8 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  How does it work?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  By answering questions about your routine (e.g., diet, sleep, activity, stress, and family history), the system intelligently maps your lifestyle to clinically significant health indicators. This approach enables you to get a quick, accessible, and non-invasive assessment of your diabetes risk.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="md:col-span-2 w-full rounded-2xl shadow-xl p-6 border border-rose-200 bg-gradient-to-r from-orange-300 to-white-200"
          >
            <div className="flex items-start gap-4">
              <ShieldCheck className="text-rose-700 w-8 h-8 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Why is this important?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Early identification of risk factors allows you to take control of your health — through informed lifestyle changes, better habits, and preventive care. This quiz empowers you with knowledge that can lead to healthier long-term outcomes.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-md mb-6 text-sm">
          <strong className="font-semibold">*</strong> marked questions are mandatory.
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-xl border border-violet-800 p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quizQuestions.map((q, index) => {
              if (q.condition && !q.condition(quizAnswers)) return null;

              const icons = [Info, HelpCircle, User, Sun, Moon];
              const Icon = icons[index % icons.length];

              return (
                <div key={q.id}>
                  <label className="font-medium mb-2 text-gray-800 flex items-center gap-2">
                    <Icon className="w-5 h-5 text-orange-500" />
                    <span>
                      <span className="text-red-500 mr-1">*</span>
                      {q.question}
                    </span>
                  </label>
                  {q.inputType === "number" ? (
                    <input
                      type="number"
                      className="w-full rounded-md border border-grey-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      value={quizAnswers[q.id] || ""}
                      onChange={(e) =>
                        setQuizAnswers({
                          ...quizAnswers,
                          [q.id]: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <select
                      className="w-full rounded-md border border-grey-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      value={quizAnswers[q.id] || ""}
                      onChange={(e) =>
                        setQuizAnswers({
                          ...quizAnswers,
                          [q.id]: e.target.value,
                        })
                      }
                    >
                      <option value="">Select</option>
                      {q.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className={`btn btn-primary px-6 py-2 rounded-md font-semibold bg-orange-600 text-white hover:bg-orange-400 transition ${
                isLoading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Processing..." : "Get Prediction"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default QuizPage;
