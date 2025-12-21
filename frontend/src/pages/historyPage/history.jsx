import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HistoryCard from "../../components/TransactionHistory/historycard.jsx";
import HistoryFilter from "../../components/TransactionHistory/historyFilter.jsx";
import api from "../../api/client";
import { getToken } from "../../utils/authStorage";
import "./history.css";
import logo from "../../assets/cashly-logo.png";

const TransactionHistoryPage = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("desc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Helper function to decode JWT and extract userId
  const extractUserIdFromToken = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const decoded = JSON.parse(jsonPayload);
      return decoded.id || decoded.userId || decoded._id;
    } catch (err) {
      console.error("Error decoding token:", err);
      return null;
    }
  };

  useEffect(() => {
    // ✅ Get token using getToken() - matches your login page
    const token = getToken();
    
    if (!token) {
      setError("User not logged in");
      setLoading(false);
      navigate("/login", { replace: true });
      return;
    }

    // ✅ Extract userId from the token JWT payload
    const userId = extractUserIdFromToken(token);
    
    if (!userId) {
      setError("Invalid token");
      setLoading(false);
      navigate("/login", { replace: true });
      return;
    }

    // ✅ Fetch transactions
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // api client will automatically add the Bearer token from getToken()
        const response = await api.get(`/history/full/${userId}`);
        
        setTransactions(response.data || []);
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError(err.response?.data?.message || err.message || "Failed to fetch transactions");
        
        if (err.response?.status === 401) {
          navigate("/login", { replace: true });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [navigate]);

  // ✅ Filter and sort transactions
  useEffect(() => {
    let filtered = [...transactions];

    if (filter !== "all") {
      filtered = filtered.filter((tx) => tx.type === filter);
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sort === "asc" ? dateA - dateB : dateB - dateA;
    });

    setFilteredTransactions(filtered);
  }, [transactions, filter, sort]);

  return (
    <div className="history-shell">
      {/* LEFT SIDE */}
      <div className="history-left">
        <img src={logo} alt="Cashly Logo" className="cashly-logo" />
        <h1>Transaction History</h1>
        <p>View all your transactions in one place</p>
      </div>

      {/* RIGHT SIDE */}
      <div className="history-right">
        <div className="history-header">
          <h2>Your Transactions</h2>
          <p className="history-subtitle">Manage and review your activity</p>
        </div>

        <HistoryFilter
          setFilter={setFilter}
          setSort={setSort}
          currentFilter={filter}
          currentSort={sort}
        />

        {loading && (
          <div className="state-message">
            <p>Loading transactions...</p>
          </div>
        )}

        {error && (
          <div className="state-message error">
            <p>Error: {error}</p>
          </div>
        )}

        {!loading && !error && filteredTransactions.length === 0 && (
          <div className="state-message">
            <p>No transactions found</p>
          </div>
        )}

        {!loading && !error && filteredTransactions.length > 0 && (
          <div className="cards-container">
            {filteredTransactions.map((tx) => (
              <HistoryCard key={tx._id} transaction={tx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistoryPage; 