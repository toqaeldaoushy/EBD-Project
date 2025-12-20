function CardItem({ card }) {
  return (
    <div>
      <p><strong>Brand:</strong> {card.brand}</p>
      <p><strong>Last 4 Digits:</strong> **** {card.last4}</p>
      <p><strong>Status:</strong> {card.status}</p>

      {card.status === "active" ? (
        <button>Lock Card</button>
      ) : (
        <button>Unlock Card</button>
      )}
    </div>
  );
}

export default CardItem;
