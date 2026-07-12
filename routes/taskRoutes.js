import express from "express";
import Task from "../models/task.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// @route  GET /api/tasks/project/:projectId
router.get("/project/:projectId", protect, async (req, res) => {
  try {
    const tasks = await Task.find({
      project: req.params.projectId,
      owner: req.user.id,
    }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// @route  POST /api/tasks
router.post("/", protect, async (req, res) => {
  try {
    const { title, description, status, project } = req.body;
    if (!title || !project) {
      return res.status(400).json({ message: "Title and project are required" });
    }

    const task = await Task.create({
      title,
      description,
      status,
      project,
      owner: req.user.id,
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// @route  PUT /api/tasks/:id
router.put("/:id", protect, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user.id });
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.title = req.body.title ?? task.title;
    task.description = req.body.description ?? task.description;
    task.status = req.body.status ?? task.status;
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// @route  DELETE /api/tasks/:id
router.delete("/:id", protect, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
