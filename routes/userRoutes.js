import express from "express";
import User from "../models/user.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// @route  GET /api/users/me
router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
