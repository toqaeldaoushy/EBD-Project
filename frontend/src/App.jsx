import { Routes, Route, Navigate } from "react-router-dom";

// Auth pages (your feature)
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// Other team pages
import Profile from "./pages/profilePage/Profile";
import DashboardPage from "./pages/DashboardPage";
import CardManagementPage from "./pages/CardManagementPage/CardManagementPage";
import TransactionHistoryPage from "./pages/historyPage/history";
import SendMoney from "./pages/SendMoney/SendMoney";

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
      <Route path="/history" element={<TransactionHistoryPage />} />
      <Route path="/send-money" element={<SendMoney />} />
      <Route path="/profile" element={<Profile />} />

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
      <Route
      path="/send-money"
      element={
        <ProtectedRoute>
          <SendMoney />
        </ProtectedRoute>
      }
    />
        <Route
        path="/cards"
        element={ 
          <ProtectedRoute>
            <CardManagementPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <TransactionHistoryPage />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
