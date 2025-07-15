import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Legend,
} from "recharts";

const recommendedValues = {
  glucose: 100,
  bloodPressure: 80,
  skinThickness: 20,
  insulin: 85,
  bmi: 25,
  diabetesPedigreeFunction: 0.5,
};

const units = {
  glucose: "mg/dL",
  bloodPressure: "mm Hg",
  bmi: "kg/m²",
  skinThickness: "mm",
  insulin: "mu U/ml",
  diabetesPedigreeFunction: "",
};

const formatLabel = (key) =>
  key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const prediction = location?.state?.prediction;
  const clinicalData = location?.state?.clinicalData;
  const pathname = location?.pathname;

  if (!prediction || !clinicalData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            No prediction data found.
          </h2>
          <button
            className="btn btn-primary mt-4"
            onClick={() => navigate("/quiz")}
          >
            Take Assessment
          </button>
        </div>
      </div>
    );
  }

  const chartData = Object.keys(recommendedValues).map((key) => ({
    name: key,
    actual: clinicalData[key] ?? 0,
    recommended: recommendedValues[key],
  }));

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation Tabs */}
      <div className="bg-gradient-to-r from-blue-100 to-orange-100 border-gray-300 py-4 px-6 flex items-center justify-between rounded-3xl text-xl font-semibold text-[#003366]">
        <div className="flex gap-9">
          <button
            onClick={() => navigate("/dashboard")}
            className={`hover:underline ${
              pathname === "/dashboard" ? "text-orange-600" : ""
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate("/history")}
            className={`hover:underline ${
              pathname === "/history" ? "text-orange-600" : ""
            }`}
          >
            History
          </button>
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-700 via-rose-600 to-purple-800 text-transparent bg-clip-text">
            Your Health Overview
          </h2>
        </div>
      </div>

      <main className="flex-grow px-4 py-8 max-w-5xl mx-auto">
        {/* Assessment Result */}
        <div
          className={`p-6 mb-8 rounded-xl shadow-md border-l-4 ${
            prediction.prediction === "Diabetic"
              ? "bg-red-50 border-danger"
              : "bg-green-50 border-secondary"
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Your Assessment Result
              </h2>
              <p className="text-3xl font-bold mt-2 mb-3 text-gray-900">
                {prediction.prediction === "Diabetic" ? "High Risk" : "Low Risk"}
              </p>
              <p className="text-gray-700">{prediction.message}</p>
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => navigate("/quiz")}
                  className="btn btn-primary"
                >
                  New Assessment
                </button>
                <button
                  onClick={() => navigate("/recommendation")}
                  className="btn bg-green-600 text-white hover:bg-green-700"
                >
                  Get Recommendations
                </button>
              </div>
            </div>
            <div
              className={`text-white rounded-full h-20 w-20 flex items-center justify-center text-2xl font-bold ${
                prediction.prediction === "Diabetic"
                  ? "bg-danger"
                  : "bg-secondary"
              }`}
            >
              {Math.round(prediction.probability * 100)}%
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-bold mb-4">
            Actual vs Recommended Clinical Features
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Blue bars show your predicted clinical metrics. Green bars are
            healthy recommended ranges.
          </p>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              layout="vertical"
              data={chartData}
              margin={{ top: 10, right: 30, left: 50, bottom: 10 }}
            >
              <XAxis type="number" domain={[0, "auto"]} />
              <YAxis
                type="category"
                dataKey="name"
                width={160}
                tickFormatter={formatLabel}
              />
              <Tooltip
                formatter={(val, name) => [
                  `${Number(val).toFixed(1)} ${units[name] || ""}`,
                  name,
                ]}
              />
              <Legend />
              <Bar dataKey="actual" fill="#3182ce" name="Actual">
                <LabelList
                  dataKey="actual"
                  position="right"
                  formatter={(val, entry) => {
                    const key = entry?.name || "";
                    return `${Number(val).toFixed(1)} ${units[key] || ""}`;
                  }}
                />
              </Bar>
              <Bar dataKey="recommended" fill="#82ca9d" name="Recommended" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Interpretation Table */}
        <div className="mt-8 bg-gradient-to-r from-blue-100 via-green-100 to-gray-100 p-6 rounded-xl shadow">
          <h4 className="text-md font-semibold mb-3">Interpretation Table</h4>
          <div className="overflow-hidden rounded-xl border border-gray-600">
            <table className="min-w-full table-auto text-sm text-left">
              <thead>
                <tr>
                  <th className="p-2 border border-gray-400 rounded-3xl">Metric</th>
                  <th className="p-2 border border-gray-400">Your Value</th>
                  <th className="p-2 border border-gray-400">Recommended</th>
                  <th className="p-2 border border-gray-400">Units</th>
                </tr>
              </thead>
              <tbody>
                {chartData.map((item) => (
                  <tr key={item.name}>
                    <td className="p-2 border border-gray-400">{formatLabel(item.name)}</td>
                    <td className="p-2 border border-gray-400">{item.actual.toFixed(1)}</td>
                    <td className="p-2 border border-gray-400">{item.recommended}</td>
                    <td className="p-2 border border-gray-400">{units[item.name]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-primary">
            <h2 className="font-bold text-lg mb-2">What is Diabetes?</h2>
            <p className="text-gray-700">
              Diabetes is a chronic health condition that affects how your body
              turns food into energy. With diabetes, your body either doesn't
              make enough insulin or can't use it properly.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-secondary">
            <h2 className="font-bold text-lg mb-2">About Our Prediction Model</h2>
            <p className="text-gray-700">
              Our model predicts diabetes risk by converting lifestyle data into
              clinical insights. It is intended for awareness and early
              self-assessment, not a medical diagnosis.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
