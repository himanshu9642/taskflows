import { useState } from "react";
import API from "../api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await API.post("/auth/login", {
        email: email,
        password: password,
      });

      console.log("FULL RESPONSE:", response.data);

      if (!response.data.user) {
        setMessage("Backend se user data nahi aa raha");
        return;
      }

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      localStorage.setItem(
        "userId",
        response.data.user._id
      );

      console.log(
        "SAVED USER:",
        localStorage.getItem("user")
      );

      alert("Login successful");

      window.location.href = "/dashboard";

    } catch (error) {
      console.log("LOGIN ERROR:", error);

      setMessage(
        error.response?.data?.message || "Login failed"
      );
    }
  }

  return (
    
    <div>
      <h1>Login Page</h1>

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

        <button type="submit">
          Login
        </button>

      </form>

      <p>{message}</p>

    </div>
  );
}

export default Login;