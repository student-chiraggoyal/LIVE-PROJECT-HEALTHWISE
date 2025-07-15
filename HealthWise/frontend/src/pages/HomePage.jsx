import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // import useAuth
import HomeHeader from "../components/HomeHeader";
import Footer from "../components/Footer";

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // get user from context

  const handleButtonClick = () => {
    if (user) {
      // Authenticated: go to quiz
      navigate("/quiz");
    } else {
      // Not logged in: redirect to login
      navigate("/login", { state: { fromAssessment: true } });
    }
  };

  return (
    <div className="bg-purple-50 min-h-screen flex flex-col">
      <HomeHeader />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-100 to-orange-100 py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between">
          {/* Text Content */}
          <div className="md:w-1/2 mt-10 md:mt-0 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-snug md:leading-tight mb-4">
              <span className="bg-gradient-to-r from-blue-700 via-rose-600 to-purple-800 text-transparent bg-clip-text">
                Pre-Diabetes
              </span>{" "}
              Risk <br className="hidden md:block" /> Prediction Tool
            </h1>
            <p className="text-gray-700 text-base md:text-lg mb-6">
              Forecast your risk of diabetes with a simple lifestyle quiz. Get
              personalized, AI-powered insights and health advice.
            </p>
            <button
              onClick={handleButtonClick}
              className="bg-red-400 hover:bg-red-500 text-white px-6 py-3 rounded-md text-base md:text-lg"
            >
              Start Assessment
            </button>
          </div>

          {/* Image */}
          <div className="md:w-1/2 mb-8 md:mb-0 flex justify-center">
            <img
              src="/Diabetes-hero.webp"
              alt="Diabetes Illustration"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-orange-600">
            Why Use Our Prediction Tool?
          </h2>
          <p className="text-gray-600 mb-12 text-lg">
            Our system transforms lifestyle data into clinical predictions,
            giving you early awareness and actionable health advice — without
            needing medical tests.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Instant Results",
                desc: "Complete a quick quiz and receive a diabetes risk prediction in seconds.",
              },
              {
                title: "No Lab Tests",
                desc: "Your lifestyle answers are enough for accurate estimation.",
              },
              {
                title: "Personalized Advice",
                desc: "Get actionable tips based on your unique habits and risk score.",
              },
              {
                title: "Mobile Friendly",
                desc: "Take the quiz from any device — fully responsive design.",
              },
              {
                title: "Privacy First",
                desc: "We do not store or share your answers. Your privacy is our priority.",
              },
              {
                title: "Scientifically Backed",
                desc: "Trained on verified datasets and continuously improved for accuracy.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-gray-200 p-6 rounded-lg shadow-md hover:shadow-lg transition border border-gray-200"
              >
                <h3 className="font-bold text-xl mb-2">{card.title}</h3>
                <p className="text-gray-600">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-12 bg-blue-50">
        <div className="max-w-4xl mx-auto text-center mb-6 px-4">
          <h2 className="text-3xl font-bold mb-3 text-gray-800">
            How does{" "}
            <span className="text-orange-600">
              Pre-Diabetes Risk Prediction
            </span>{" "}
            Tool Work?
          </h2>
          <p className="text-gray-600 text-lg">
            Our AI maps your lifestyle data to clinical features like glucose,
            insulin, and BMI — without needing lab reports.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img
              src="/diabetes-1.webp"
              alt="How It Works"
              className="w-full max-w-md mx-auto object-contain"
            />
          </div>

          <div className="md:w-1/2">
            <ul className="list-disc list-inside space-y-3 text-gray-700 text-lg">
              <li className="marker:text-orange-600">
                Answer questions about your lifestyle: sleep, activity, diet,
                hydration, and stress.
              </li>
              <li className="marker:text-orange-600">
                Model maps your answers to clinical indicators.
              </li>
              <li className="marker:text-orange-600">
                Predicts diabetes risk using AI with high accuracy.
              </li>
              <li className="marker:text-orange-600">
                Compare inferred values vs recommended norms.
              </li>
              <li className="marker:text-orange-600">
                Get personalized lifestyle recommendations.
              </li>
              <li className="marker:text-orange-600">
                100% lifestyle-data-driven — no lab tests needed.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-white">
        <div className="max-w-7xl w-full mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-blue-700 via-rose-600 to-purple-800 text-transparent bg-clip-text">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "What is this tool and how does it work?",
                a: "It’s a quiz-based diabetes prediction system powered by machine learning.",
              },
              {
                q: "Do I need medical test reports?",
                a: "No. It works entirely on lifestyle-based questions.",
              },
              {
                q: "Is this suitable for everyone?",
                a: "Yes — especially for those without regular lab access.",
              },
              {
                q: "How long does the quiz take?",
                a: "Usually less than 2 minutes.",
              },
              {
                q: "Is this tool free to use?",
                a: "Yes, it's completely free.",
              },
              {
                q: "How accurate is the prediction?",
                a: "The model is trained on clinical data with high accuracy.",
              },
              {
                q: "Do I need to create an account?",
                a: "No signup is required. It's anonymous.",
              },
              {
                q: "Can I use this on mobile?",
                a: "Yes, it’s fully mobile-responsive.",
              },
              {
                q: "What do I do after getting my results?",
                a: "You’ll get personalized advice based on your results.",
              },
              {
                q: "Is my data stored or shared?",
                a: "No, your inputs remain private and are not saved.",
              },
            ].map(({ q, a }) => (
              <div
                key={q}
                className="border border-gray-200 rounded-md p-5 shadow-sm bg-gradient-to-r from-blue-200 to-orange-200"
              >
                <h4 className="font-semibold text-lg mb-2">{q}</h4>
                <p className="text-gray-600">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
