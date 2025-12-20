import { Routes, Route, Navigate } from "react-router-dom";

// Auth pages (your feature)
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// Other team pages
import Profile from "./pages/Profile";
import DashboardPage from "./pages/DashboardPage";
import CardManagementPage from "./pages/CardManagementPage";

// Auth guard
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Default */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* AUTH ROUTES */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/cards" element={<CardManagementPage />} />

      {/* PROTECTED ROUTES */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
