import { useEffect, useState } from "react";
import api from "../../api/client";
import { getAvatarUrl } from "../../utils/avatar";
import "./style.css";

export default function RecipientList({ onSelect }) {
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipients = async () => {
      try {
        const res = await api.get("/users/recipients");
        setRecipients(res.data);
      } catch (err) {
        setError("Failed to load recipients");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipients();
  }, []);

  if (loading) return <p>Loading recipients...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <h3 style={{ marginBottom: "12px", color: "#fff" }}>
        Choose Recipient
      </h3>

      <div className="contacts-grid">
        {recipients.map((user) => (
          <div
            key={user._id}
            className="contact-item"
            onClick={() => onSelect(user)}
          >
            {/* 🎭 AVATAR */}
            <img
              src={getAvatarUrl(user.fullName || user.phone || user._id)}
              alt={user.fullName}
              className="avatar-img"
            />

            {/* NAME */}
            <div className="contact-name">
              {user.fullName || "Unknown User"}
            </div>

            {/* PHONE */}
            <small>{user.phone}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
