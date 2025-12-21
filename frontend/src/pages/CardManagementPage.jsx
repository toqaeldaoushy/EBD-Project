import Sidebar from "../components/Sidebar";
import { cards } from "../data/cards";
import CardItem from "../components/CardItem";

function CardManagementPage() {
  return (
    <div>
      <Sidebar />
      <h2>Card Management</h2>

      {cards.map(card => (
        <CardItem key={card._id} card={card} />
      ))}
    </div>
  );
}

export default CardManagementPage;