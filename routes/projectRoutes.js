import express from "express";
import Project from "../models/project.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// @route  GET /api/projects
router.get("/", protect, async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// @route  POST /api/projects
router.post("/", protect, async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    const project = await Project.create({
      name,
      description,
      owner: req.user.id,
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// @route  PUT /api/projects/:id
router.put("/:id", protect, async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      owner: req.user.id,
    });
    if (!project) return res.status(404).json({ message: "Project not found" });

    project.name = req.body.name ?? project.name;
    project.description = req.body.description ?? project.description;
    await project.save();

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// @route  DELETE /api/projects/:id
router.delete("/:id", protect, async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });
    if (!project) return res.status(404).json({ message: "Project not found" });

    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
