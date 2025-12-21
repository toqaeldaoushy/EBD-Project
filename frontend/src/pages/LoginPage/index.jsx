import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../../api/auth";
import { saveToken } from "../../utils/authStorage";
import "./style.css";
import logo from "../../assets/cashly-logo.png";


export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginApi({ email, password });
      saveToken(data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-bg">
      <div className="auth-shell">
        <div className="auth-left">
           
          <h1>Cashly</h1>
          <h2>Welcome to your digital wallet.</h2>
           <img src={logo} alt="Cashly Logo" className="cashly-logo" />

        </div>

        {/* ✅ Buttons only on ONE side (right side) */}
        <div className="auth-right">
          <div className="card">
            <h2>User Login</h2>
            <p className="sub">Welcome back.</p>

            <form onSubmit={onSubmit}>
              <label>Email</label>
              <input
                type="email"
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label>Password</label>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {error ? <div className="error">{error}</div> : null}

              <button className="btn" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="bottom-links">
              <span>New here?</span> <Link to="/register">Create Account</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
