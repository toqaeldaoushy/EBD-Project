export default function HistoryCard({ transaction }) {
  const isReceived = transaction.type === "receive";

  return (
    <div className={`history-card ${isReceived ? "received" : "sent"}`}>
      <div className="card-header">
        <h3>{isReceived ? "Received from" : "Sent to"}</h3>
        <span className={`amount ${isReceived ? "positive" : "negative"}`}>
          {isReceived ? "+" : "-"}${transaction.amount}
        </span>
      </div>

      <p className="person-name">
        {isReceived ? transaction.senderName : transaction.receiverName}
      </p>

      <p className="description">{transaction.description}</p>

      <div className="card-footer">
        <span className="date">
          {new Date(transaction.date).toLocaleDateString()}
        </span>
        <span className="type">{transaction.type}</span>
      </div>
    </div>
  );
}
