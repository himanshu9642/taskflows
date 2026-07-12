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
if (!response.data.user) {
setMessage("Backend se user data nahi aa raha");
return;
}
localStorage.setItem("user", JSON.stringify(response.data.user));
localStorage.setItem("userId", response.data.user._id);
alert("Login successful");
window.location.href = "/dashboard";
} catch (error) {
setMessage(error.response?.data?.message || "Login failed");
}
}
return (
<div style={{ maxWidth: "400px", margin: "60px auto", textAlign: "center" }}>
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
<p style={{ marginTop: "20px", fontSize: "16px" }}>
Don't have an account?{" "}
<a href="/register" style={{ color: "#7C3AED", fontWeight: "bold" }}>
Register
</a>
</p>
</div>
);
}
export default Login;