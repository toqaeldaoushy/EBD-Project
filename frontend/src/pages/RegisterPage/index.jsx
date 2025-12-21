import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerApi } from "../../api/auth";
import "./style.css";
import logo from "../../assets/cashly-logo.png";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await registerApi({ fullName, phone, email, password });
      navigate("/login");
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-bg">
      <div className="auth-shell">
        <div className="auth-left">
          <h1>Cashly</h1>
          <p>Create your wallet account in seconds.</p>
          <img src={logo} alt="Cashly Logo" className="cashly-logo" />

        
        </div>

        <div className="auth-right">
          <div className="card">
            <h2>Create Account</h2>
            <p className="sub">Start using Cashly.</p>

            <form onSubmit={onSubmit}>
              <label>Full Name</label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                required
              />

              <label>Phone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01xxxxxxxxx"
                required
              />

              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
                required
              />

              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
              />

              {error ? <div className="error">{error}</div> : null}

              <button className="btn" disabled={loading}>
                {loading ? "Creating..." : "Register"}
              </button>
            </form>

            <div className="bottom-links">
              <span>Already have an account?</span> <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
