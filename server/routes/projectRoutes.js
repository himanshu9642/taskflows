const express = require("express");
const router = express.Router();

const Project = require("../models/project");


// Create Project
router.post("/", async (req, res) => {
  try {
    const { title, description, userId } = req.body;

    const project = await Project.create({
      title,
      description,
      userId,
    });

    res.status(201).json({
      message: "Project created successfully",
      project,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// Get User Projects
router.get("/:userId", async (req, res) => {
  try {
    const projects = await Project.find({
      userId: req.params.userId,
    });

    res.status(200).json(projects);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


module.exports = router;