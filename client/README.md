# TaskFlow 🚀

A full-stack project and task management web app. Create projects, add tasks with priority levels, track progress, and manage everything from a clean dashboard.

**🔗 Live Demo:** https://taskflows-92h5-gules.vercel.app

---

## Features

- User authentication (Register & Login)
- Create, view, and delete projects
- Add, edit, complete, and delete tasks within each project
- Set task priority (High / Medium / Low)
- Track task status (Pending / Completed)
- Responsive dashboard with real-time updates

## Tech Stack

**Frontend**
- React (Vite)
- React Router
- Axios

**Backend**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

**Deployment**
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## Project Structure

```
taskflow/
├── src/              # React frontend
│   ├── pages/         # Login, Register, Dashboard
│   ├── components/    # Navbar and shared components
│   └── api.js          # Axios instance for API calls
├── server/           # Express backend
│   ├── models/         # Mongoose schemas (User, Project, Task)
│   ├── routes/         # API routes (auth, users, projects, tasks)
│   └── server.js        # Entry point
```

## Getting Started (Run Locally)

### 1. Clone the repository
```bash
git clone https://github.com/himanshu9642/taskflows.git
cd taskflow
```

### 2. Setup the backend
```bash
cd server
npm install
```

Create a `.env` file inside `server/` with:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start the server:
```bash
node server.js
```

### 3. Setup the frontend
Open a new terminal:
```bash
cd src
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/projects/:userId` | Get all projects for a user |
| POST | `/api/projects` | Create a new project |
| DELETE | `/api/projects/:id` | Delete a project |
| GET | `/api/tasks/project/:projectId` | Get tasks for a project |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

## Author

**Himanshu Tiwari**
GitHub: [@himanshu9642](https://github.com/himanshu9642)