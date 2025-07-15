import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage"; // contains its own Header & Footer
import Recommendation from "./pages/Recommendation";
import QuizPage from "./pages/QuizPage";
import ScrollToHashElement from "./components/ScrollToHashElement";

// ✅ Reusable ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <Routes>
      {/* ✅ Home page with its own Header and Footer */}
      <Route
        path="/"
        element={
          <>
            <ScrollToHashElement />
            <HomePage />
          </>
        }
      />

      {/* ✅ All other routes WITHOUT Header/Footer */}
      <Route
        path="/quiz"
        element={
          <ProtectedRoute>
            <ScrollToHashElement />
            <QuizPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <ScrollToHashElement />
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <ScrollToHashElement />
            <History />
          </ProtectedRoute>
        }
      />
      <Route path="/recommendations" element={<Recommendation />} />

      {/* Public Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Catch-all Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
