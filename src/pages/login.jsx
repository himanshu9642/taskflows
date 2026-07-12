import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api.js";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login to TaskFlow</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <br />
        <br />

        <button type="submit">Login</button>
      </form>

      <p>{message}</p>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
