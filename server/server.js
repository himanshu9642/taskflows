const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Routes import
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("TaskFlow backend is running");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) =>
    console.log("MongoDB connection error:", error.message)
  );

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

// Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});