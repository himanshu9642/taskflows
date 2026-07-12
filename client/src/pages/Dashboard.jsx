import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Dashboard() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState({});
  const [editTaskData, setEditTaskData] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    getProjects();
  }, []);async function getProjects() {
    setLoading(true);
    setError("");
    try {
      const response = await API.get(`/projects/${user._id}`);
      setProjects(response.data);
      response.data.forEach((project) => {
        getTasks(project._id);
      });
    } catch (error) {
      console.log(error);
      setError("Failed to load projects. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function getTasks(projectId) {
    try {
      const response = await API.get(`/tasks/project/${projectId}`);
      setTasks((prev) => ({
        ...prev,
        [projectId]: response.data,
      }));
    } catch (error) {
      console.log(error);
      setError("Failed to load tasks.");
    }
  }async function createProject(e) {
    e.preventDefault();

    if (!title.trim()) {
      setError("Project name cannot be empty.");
      return;
    }

    try {
      const response = await API.post("/projects", {
        title: title,
        description: "",
        userId: user._id,
      });

      setMessage(response.data.message);
      setError("");
      setTitle("");
      getProjects();
    } catch (error) {
      console.log(error);
      setError("Failed to create project.");
    }
  }

  async function createTask(projectId) {
    if (!taskTitle.trim()) {
      setError("Task name cannot be empty.");
      return;
    }

    try {
      await API.post("/tasks", {
        title: taskTitle,
        description: "",
        project: projectId,
        priority: priority,
      });

      setTaskTitle("");
      setPriority("Medium");
      setError("");
      getTasks(projectId);
    } catch (error) {
      console.log(error);
      setError("Failed to create task.");
    }
  }async function updateTask(id, status) {
    try {
      await API.put(`/tasks/${id}`, { status: status });
      getProjects();
    } catch (error) {
      console.log(error);
      setError("Failed to update task.");
    }
  }

  function editTask(task) {
    setEditTaskData(task);
  }

  async function saveEditedTask() {
    try {
      await API.put(`/tasks/${editTaskData._id}`, {
        title: editTaskData.title,
        priority: editTaskData.priority,
        status: editTaskData.status,
      });

      setEditTaskData(null);
      getProjects();
    } catch (error) {
      console.log(error);
      setError("Failed to save changes.");
    }
  }

  async function deleteTask(id) {
    if (!window.confirm("Delete this task?")) return;
    try {
      await API.delete(`/tasks/${id}`);
      getProjects();
    } catch (error) {
      console.log(error);
      setError("Failed to delete task.");
    }
  }

  async function deleteProject(id) {
    if (!window.confirm("Delete this project and all its tasks?")) return;
    try {
      await API.delete(`/projects/${id}`);
      setProjects(projects.filter((project) => project._id !== id));
    } catch (error) {
      console.log(error);
      setError("Failed to delete project.");
    }
  }return (
    <div className="dashboard-container">
      <Navbar />

      <h1>TaskFlow Dashboard</h1>
      <h3>Welcome to your Project Management System</h3>

      {error && <p className="error-message">{error}</p>}
      {loading && <p>Loading...</p>}

      <div className="create-project-card">
        <form onSubmit={createProject}>
          <input
            type="text"
            placeholder="Project Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <br />
          <button type="submit">Create Project</button>
        </form>
        <p>{message}</p>
      </div>

      <hr />
      <h2>Your Projects</h2>

      <div className="projects-container">
        {projects.length === 0 && !loading && (
          <h3 className="no-project">
            No projects found. Create your first project 🚀
          </h3>
        )}{projects.map((project) => (
          <div className="project-card" key={project._id}>
            <div className="project-header">
              <h3>{project.title}</h3>
              <button className="delete-btn" onClick={() => deleteProject(project._id)}>
                Delete Project
              </button>
            </div>

            <p>{project.description || "No description"}</p>

            <input
              type="text"
              placeholder="Task name"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />

            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <button onClick={() => createTask(project._id)}>Add Task</button>

            <h4>Tasks:</h4>
            {tasks[project._id]?.map((task) => (
              <div className="task-item" key={task._id}>
                <p>
                  {task.status === "Completed" ? "✅" : "🔲"} {task.title}
                  <span className={task.status === "Completed" ? "status completed" : "status pending"}>
                    {task.status}
                  </span>
                  <span className={`priority ${task.priority?.toLowerCase()}`}>
                    {task.priority || "Medium"}
                  </span>
                </p>

                {task.status !== "Completed" && (
                  <button className="complete-btn" onClick={() => updateTask(task._id, "Completed")}>
                    Complete
                  </button>
                )}

                <button className="edit-btn" onClick={() => editTask(task)}>Edit</button>
                <button className="delete-btn" onClick={() => deleteTask(task._id)}>Delete</button>
              </div>
            ))}

            <hr />
          </div>
        ))}
      </div>

      {editTaskData && (
        <div className="edit-box">
          <h2>Edit Task</h2>
          <input
            type="text"
            value={editTaskData.title}
            onChange={(e) => setEditTaskData({ ...editTaskData, title: e.target.value })}
          />
          <select
            value={editTaskData.priority}
            onChange={(e) => setEditTaskData({ ...editTaskData, priority: e.target.value })}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button onClick={saveEditedTask}>Save</button>
          <button onClick={() => setEditTaskData(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;