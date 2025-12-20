import { useState, useEffect } from "react";
import HistoryCard from "../../components/TransactionHistory/historyCard.jsx";
import HistoryFilter from "../../components/TransactionHistory/historyFilter.jsx";
import "./history.css";
import logo from "../../assets/cashly-logo.png";


const TransactionHistoryPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("desc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("userId");

  const fetchTransactions = async () => {
    if (!userId) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/history/full/${userId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }

      const data = await response.json();
      setTransactions(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortTransactions = () => {
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
  };

  useEffect(() => {
    fetchTransactions();
  }, [userId]);

  useEffect(() => {
    filterAndSortTransactions();
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
              <HistoryCard key={tx.id} transaction={tx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistoryPage;