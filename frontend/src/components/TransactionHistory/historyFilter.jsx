export default function HistoryFilter({
  setFilter,
  setSort,
  currentFilter,
  currentSort,
}) {
  return (
    <div className="history-filter">
      <div className="filter-group">
        <label htmlFor="type-filter">Type:</label>
        <select
          id="type-filter"
          value={currentFilter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Transactions</option>
          <option value="send">Sent</option>
          <option value="receive">Received</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sort-filter">Sort:</label>
        <select
          id="sort-filter"
          value={currentSort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>
    </div>
  );
}

