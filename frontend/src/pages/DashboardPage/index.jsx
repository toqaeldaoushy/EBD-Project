import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/client";
import "./style.css";

export default function DashboardPage() {
  const navigate = useNavigate();

  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        // ✅ Correct routes
        const balanceRes = await api.get("/balance/balance");
        const txRes = await api.get("/balance/recent-transactions");

        setBalance(balanceRes.data.balance);
        setTransactions(txRes.data);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  if (loading) {
    return <div className="dashboard-bg">Loading...</div>;
  }

  return (
    <div className="dashboard-bg">
      <div className="dashboard-shell">

        {/* HEADER */}
        <nav className="dashboard-navbar">
  <div className="nav-left">
    <span className="nav-logo">Cashly</span>
  </div>

  <div className="nav-center">
    <button onClick={() => navigate("/dashboard")}>Dashboard</button>
    <button onClick={() => navigate("/send")}>Send</button>
    <button onClick={() => navigate("/transactions")}>History</button>
    <button onClick={() => navigate("/card")}>Card</button>
    <button onClick={() => navigate("/profile")}>Profile</button>
  </div>

  <div className="nav-right">
    <button
      className="logout-btn"
      onClick={() => navigate("/login")}
    >
      Logout
    </button>
  </div>
</nav>


        {/* BALANCE */}
        <div className="dashboard-balance">
          <span>Total Balance</span>
          <h2>{balance} EGP</h2>

          <div className="balance-meta">
            <div>
              <small>Available</small>
              <p>{balance} EGP</p>
            </div>
            <div>
              <small>On Hold</small>
              <p>0 EGP</p>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="dashboard-actions">
          <button onClick={() => navigate("/send")}>Send</button>
          <button onClick={() => navigate("/transactions")}>History</button>
          <button onClick={() => navigate("/card")}>Card</button>
          <button onClick={() => navigate("/profile")}>Profile</button>
        </div>

        {/* TRANSACTIONS */}
        <div className="dashboard-section">
          <h3>Recent Activity</h3>

          {transactions.length === 0 && (
            <div className="transaction muted">
              <span>No transactions yet</span>
            </div>
          )}

          {transactions.map((tx) => (
            <div key={tx._id} className="transaction">
              <span>
                {tx.type === "send"
                  ? `Sent ${tx.amount} EGP`
                  : `Received ${tx.amount} EGP`}
              </span>

              <span
                className={tx.type === "send" ? "negative" : "positive"}
              >
                {tx.type === "send" ? "-" : "+"}
                {tx.amount} EGP
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
