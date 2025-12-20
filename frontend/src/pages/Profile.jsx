import { useEffect, useState } from "react";
import api from "../api/client";

function Profile() {
  const [user, setUser] = useState({});
  const [message, setMessage] = useState("");

  // Load user profile
  useEffect(() => {
    api.get("/users/me")
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        setMessage("Error loading profile");
      });
  }, []);

  // Update profile info
  const updateProfile = () => {
    api.put("/users/update", {
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
    })
      .then(() => setMessage("Profile updated"))
      .catch(() => setMessage("Update failed"));
  };

  // Change password
  const changePassword = () => {
    api.put("/users/change-password", {
      currentPassword: user.currentPassword,
      newPassword: user.newPassword,
    })
      .then(() => setMessage("Password changed"))
      .catch(() => setMessage("Password change failed"));
  };

  return (
    <div>
      <h2>User Profile</h2>

      <input
        placeholder="Full Name"
        value={user.fullName || ""}
        onChange={(e) =>
          setUser({ ...user, fullName: e.target.value })
        }
      />

      <input
        placeholder="Email"
        value={user.email || ""}
        onChange={(e) =>
          setUser({ ...user, email: e.target.value })
        }
      />

      <input
        placeholder="Phone"
        value={user.phone || ""}
        onChange={(e) =>
          setUser({ ...user, phone: e.target.value })
        }
      />

      <button onClick={updateProfile}>Update Profile</button>

      <hr />

      <h3>Change Password</h3>

      <input
        type="password"
        placeholder="Current Password"
        onChange={(e) =>
          setUser({ ...user, currentPassword: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="New Password"
        onChange={(e) =>
          setUser({ ...user, newPassword: e.target.value })
        }
      />

      <button onClick={changePassword}>Change Password</button>

      <p>{message}</p>
    </div>
  );
}

export default Profile;

