import { Link, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Layout = () => {
  const location = useLocation();
  const pathname = location?.pathname || "/";
  const { user, logout } = useAuth();

  const QuizHeader = () => (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-orange-600">
          @HealthWise
        </Link>

        <div className="flex items-center gap-6">
          <nav className="flex gap-4">
            <Link
              to="/"
              className={
                pathname === "/"
                  ? "text-orange-600 font-medium"
                  : "hover:text-primary"
              }
            >
              Home
            </Link>
            <Link
              to="/quiz"
              className={
                pathname === "/quiz"
                  ? "text-orange-600 font-medium"
                  : "hover:text-primary"
              }
            >
              Quiz
            </Link>
            <Link
              to="/dashboard"
              className={
                pathname === "/dashboard"
                  ? "text-orange-600 font-medium"
                  : "hover:text-primary"
              }
            >
              Dashboard
            </Link>
            <Link
              to="/history"
              className={
                pathname === "/history"
                  ? "text-orange-600 font-medium"
                  : "hover:text-primary"
              }
            >
              History
            </Link>
            <Link
              to="/recommendations"
              className={
                pathname === "/recommendations"
                  ? "text-orange-600 font-medium"
                  : "hover:text-primary"
              }
            >
              Recommendations
            </Link>
          </nav>

          {user && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 hidden md:inline">
                Welcome, {user.user_metadata?.full_name || user.email}
              </span>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-1.5 rounded text-sm hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Always show the main app header */}
      <QuizHeader />

      {/* Main content */}
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#003366] text-white py-4 text-center text-sm">
        HealthWise © 2025 - ML-Powered Diabetes Prediction
      </footer>
    </div>
  );
};

export default Layout;




// import { Outlet } from "react-router-dom";

// const Layout = () => {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Outlet />
//     </div>
//   );
// };

// export default Layout;
