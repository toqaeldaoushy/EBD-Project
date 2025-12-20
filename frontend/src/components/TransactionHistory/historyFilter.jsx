import React from "react";
const historyFilter = ({ setFilter, setSort }) => {
  return (
    <div>
      <button onClick={() => setFilter("all")}>All</button>
      <button onClick={() => setFilter("send")}>Sent</button>
      <button onClick={() => setFilter("receive")}>Received</button>

      <select onChange={(e) => setSort(e.target.value)}>
        <option value="desc">Newest First</option>
        <option value="asc">Oldest First</option>
      </select>
    </div>
  );
};

export default historyFilter;