import { useState } from "react";
import Sidebar from "../components/Sidebar";
import CardItem from "../components/CardItem";
import { cards as initialCards } from "../data/cards";
import "./CardManagementPage.css";

function CardManagementPage() {
  const [cards, setCards] = useState(initialCards);
  const [brand, setBrand] = useState("Visa");
  const [last4, setLast4] = useState("");

  const handleCreateCard = (e) => {
    e.preventDefault();

    if (last4.length !== 4) {
      alert("Card number must be 4 digits");
      return;
    }

    const newCard = {
      _id: Date.now().toString(),
      brand,
      last4,
      status: "active",
      createdAt: new Date().toISOString()
    };

    setCards([...cards, newCard]);
    setLast4("");
  };

  return (
    <div className="card-page">
      <Sidebar />
      <h2>Card Management</h2>

      {/* Create Card Section */}
      <form className="card-form" onSubmit={handleCreateCard}>
        <h3>Create New Card</h3>

        <label>
          Card Brand
          <select value={brand} onChange={(e) => setBrand(e.target.value)}>
            <option value="Visa">Visa</option>
            <option value="Mastercard">Mastercard</option>
          </select>
        </label>

        <label>
          Last 4 Digits
          <input
            type="text"
            maxLength="4"
            value={last4}
            onChange={(e) => setLast4(e.target.value)}
            placeholder="1234"
          />
        </label>

        <button className="card-button">Create Card</button>
      </form>

      {/* Cards List */}
      <div className="card-list">
        {cards.map(card => (
          <CardItem key={card._id} card={card} />
        ))}
      </div>
    </div>
  );
}

export default CardManagementPage;

