import { useEffect, useState } from "react";
import api from "../../api/client";
import "./style.css";

function Profile() {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // 🔄 Load user profile
  useEffect(() => {
    api
      .get("/users/me")
      .then((res) => {
        setUser((prev) => ({
          ...prev,
          fullName: res.data.fullName,
          email: res.data.email,
          phone: res.data.phone,
        }));
      })
      .catch(() => setError("Failed to load profile"));
  }, []);

  // ✏️ Update profile info
  const updateProfile = async () => {
    setMessage("");
    setError("");

    try {
      await api.put("/users/update", {
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
      });
      setMessage("Profile updated successfully");
    } catch {
      setError("Profile update failed");
    }
  };

  // 🔐 Change password
  const changePassword = async () => {
    setMessage("");
    setError("");

    try {
      await api.put("/users/change-password", {
        currentPassword: user.currentPassword,
        newPassword: user.newPassword,
      });
      setMessage("Password changed successfully");
      setUser({ ...user, currentPassword: "", newPassword: "" });
    } catch {
      setError("Password change failed");
    }
  };

  return (
    <div className="profile-bg">
      <div className="profile-card">

        <h2 className="profile-title">My Profile</h2>

        {/* PROFILE INFO */}
        <div className="profile-section">
          <label>Full Name</label>
          <input
            value={user.fullName}
            onChange={(e) =>
              setUser({ ...user, fullName: e.target.value })
            }
          />

          <label>Email</label>
          <input
            value={user.email}
            onChange={(e) =>
              setUser({ ...user, email: e.target.value })
            }
          />

          <label>Phone</label>
          <input
            value={user.phone}
            onChange={(e) =>
              setUser({ ...user, phone: e.target.value })
            }
          />

          <button className="btn-primary" onClick={updateProfile}>
            Update Profile
          </button>
        </div>

        <hr className="divider" />

        {/* PASSWORD */}
        <div className="profile-section">
          <h3>Change Password</h3>

          <label>Current Password</label>
          <input
            type="password"
            value={user.currentPassword}
            onChange={(e) =>
              setUser({ ...user, currentPassword: e.target.value })
            }
          />

          <label>New Password</label>
          <input
            type="password"
            value={user.newPassword}
            onChange={(e) =>
              setUser({ ...user, newPassword: e.target.value })
            }
          />

          <button className="btn-danger" onClick={changePassword}>
            Change Password
          </button>
        </div>

        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default Profile;
