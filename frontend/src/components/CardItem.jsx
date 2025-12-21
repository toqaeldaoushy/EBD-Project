function CardItem({ card }) {
  return (
    <div className="card-item">
      <p><strong>Brand:</strong> {card.brand}</p>
      <p><strong>Card:</strong> **** {card.last4}</p>
      <p className={`card-status ${card.status}`}>
        Status: {card.status}
      </p>

      {card.status === "active" ? (
        <button className="card-button">
          Lock Card
        </button>
      ) : (
        <button className="card-button secondary">
          Unlock Card
        </button>
      )}
    </div>
  );
}

export default CardItem;


