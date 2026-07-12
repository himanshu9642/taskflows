import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api.js";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (err) {
      setMessage("Could not load projects");
    }
  };

  const fetchTasks = async (projectId) => {
    try {
      const res = await api.get(`/tasks/project/${projectId}`);
      setTasks(res.data);
    } catch (err) {
      setMessage("Could not load tasks");
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    try {
      const res = await api.post("/projects", { name: newProjectName });
      setProjects([res.data, ...projects]);
      setNewProjectName("");
    } catch (err) {
      setMessage("Could not create project");
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await api.delete(`/projects/${id}`);
      setProjects(projects.filter((p) => p._id !== id));
      if (selectedProject?._id === id) {
        setSelectedProject(null);
        setTasks([]);
      }
    } catch (err) {
      setMessage("Could not delete project");
    }
  };

  const handleSelectProject = (project) => {
    setSelectedProject(project);
    fetchTasks(project._id);
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim() || !selectedProject) return;
    try {
      const res = await api.post("/tasks", {
        title: newTaskTitle,
        project: selectedProject._id,
      });
      setTasks([res.data, ...tasks]);
      setNewTaskTitle("");
    } catch (err) {
      setMessage("Could not create task");
    }
  };

  const handleToggleStatus = async (task) => {
    const statusOrder = ["todo", "in-progress", "done"];
    const nextStatus =
      statusOrder[(statusOrder.indexOf(task.status) + 1) % statusOrder.length];
    try {
      const res = await api.put(`/tasks/${task._id}`, { status: nextStatus });
      setTasks(tasks.map((t) => (t._id === task._id ? res.data : t)));
    } catch (err) {
      setMessage("Could not update task");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      setMessage("Could not delete task");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome, {user.name || "User"}</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <p>{message}</p>

      <div className="dashboard-body">
        <div className="projects-panel">
          <h3>Your Projects</h3>
          <form onSubmit={handleCreateProject}>
            <input
              type="text"
              placeholder="New project name"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
            />
            <button type="submit">Add Project</button>
          </form>

          <ul>
            {projects.map((project) => (
              <li key={project._id}>
                <span
                  onClick={() => handleSelectProject(project)}
                  style={{
                    fontWeight:
                      selectedProject?._id === project._id ? "bold" : "normal",
                    cursor: "pointer",
                  }}
                >
                  {project.name}
                </span>
                <button onClick={() => handleDeleteProject(project._id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="tasks-panel">
          {selectedProject ? (
            <>
              <h3>Tasks in "{selectedProject.name}"</h3>
              <form onSubmit={handleCreateTask}>
                <input
                  type="text"
                  placeholder="New task title"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                />
                <button type="submit">Add Task</button>
              </form>

              <ul>
                {tasks.map((task) => (
                  <li key={task._id}>
                    <span>{task.title}</span>
                    <button onClick={() => handleToggleStatus(task)}>
                      {task.status}
                    </button>
                    <button onClick={() => handleDeleteTask(task._id)}>
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>Select a project to see its tasks.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
