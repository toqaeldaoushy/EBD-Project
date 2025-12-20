import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside>
      <h3>Dashboard</h3>
      <ul>
        <li><Link to="/dashboard">Home</Link></li>
        <li><Link to="/cards">Card Management</Link></li>
      </ul>
    </aside>
  );
}

export default Sidebar;
