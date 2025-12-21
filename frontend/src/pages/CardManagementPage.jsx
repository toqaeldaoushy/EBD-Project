import Sidebar from "../components/Sidebar";
import { cards } from "../data/cards";
import CardItem from "../components/CardItem";
import "./CardManagementPage.css";

function CardManagementPage() {
  return (
    <div className="card-page">
      <Sidebar />
      <h2>Card Management</h2>

      <div className="card-list">
        {cards.map(card => (
          <CardItem key={card._id} card={card} />
        ))}
      </div>
    </div>
  );
}

export default CardManagementPage;
