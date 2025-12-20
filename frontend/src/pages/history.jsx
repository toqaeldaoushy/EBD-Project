import React, { useState } from "react";
import { transactions } from "../data/history";
import historyCard from "../components/historyCard.jsx";
import historyFilter from "../components/historyFilterjsx";

const TransactionHistoryPage = () => {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("desc");

  const filtered = transactions
    .filter(tx => filter === "all" || tx.type === filter)
    .sort((a, b) =>
      sort === "asc"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date)
    );

  return (
    <div>
      <h1>Transaction History</h1>
      <historyFilter setFilter={setFilter} setSort={setSort} />

      {filtered.map(tx => (
        <historyCard key={tx.id} transaction={tx} />
      ))}
    </div>
  );
};

export default TransactionHistoryPage;