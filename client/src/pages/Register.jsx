import { useState } from "react";
import API from "../api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await API.post("/auth/register", {
        name: name,
        email: email,
        password: password,
      });

      const loginResponse = await API.post("/auth/login", {
        email: email,
        password: password,
      });

      localStorage.setItem("user", JSON.stringify(loginResponse.data.user));
      localStorage.setItem("userId", loginResponse.data.user._id);

      window.location.href = "/dashboard";

    } catch (error) {
      console.log(error);
      alert("Registration failed: " + (error.response?.data?.message || error.message));
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "60px auto", textAlign: "center" }}>
      <h1>Register Page</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <br />
        <br />

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

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default Register;