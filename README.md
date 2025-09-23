# 📌 Project Management Dashboard (MERN Stack)
![MERN Stack](https://img.shields.io/badge/Stack-MERN-brightgreen.svg)
![React](https://img.shields.io/badge/Frontend-React-61DAFB.svg?style=flat-square&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Runtime-Node.js-339933.svg?style=flat-square&logo=node.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC.svg?style=flat-square&logo=tailwind-css&logoColor=white)

A full-stack project management dashboard built with the **MERN stack** (MongoDB, Express,js, React, Node.js).
This application allows users to create and manage projects, add tasks, and organize them with a simple Kanban-style board for efficient task tracking.

---

## 📑 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Installation & Setup](#-installation--setup)
    - [Backend Setup](#backend-setup)
    - [Frontend Setup](#frontend-setup)
- [API Endpoints](#-api-endpoints)
- [Project Structure](#-project-structure)
- [Future Improvements](#-future-improvements)
- [Contact](#-contact)
- [License](#-license)

---

## 🚀 Features

-   **Dashboard View**: Displays all projects with a quick summary of their tasks (categorized into To Do, In Progress, Done).
-   **Project Details**: Dedicated page to view a project's description and manage its tasks in a visual Kanban-style board.
-   **CRUD Operations**:
    -   **Projects**: Create, update, and delete projects.
    -   **Tasks**: Create, update, and delete tasks within a project.
-   **Responsive UI**: Built with Tailwind CSS, ensuring a user-friendly experience across various screen sizes.
-   **User Feedback**: Provides intuitive toast notifications for successful actions and confirmation dialogs for critical operations.
-   **Robust Error Handling**: Includes a custom 404 page for unmatched routes and clear API error responses from the backend.

---

## 🛠️ Tech Stack

**Frontend:**
-   **React (Vite)**: A fast and lightweight library for building user interfaces.
-   **React Router DOM**: For declarative routing in the React application.
-   **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
-   **React Hot Toast**: For elegant and responsive toast notifications.
-   **Axios**: Promise-based HTTP client for making API requests.
-   **Custom React Hooks**: To encapsulate and reuse stateful logic.

**Backend:**
-   **Node.js + Express.js**: A robust JavaScript runtime and web framework for the server-side logic.
-   **MongoDB + Mongoose**: A NoSQL database and an elegant ODM for MongoDB in Node.js.
-   **dotenv**: To manage environment variables securely.
-   **CORS**: Middleware to enable Cross-Origin Resource Sharing.

---

## 📸 Screenshots
| Dashboard | Project Details |
|-----------|-----------------|
| ![Dashboard Screenshot](./frontend/public/screenshots/dashboard.png) | ![Project Details Screenshot](./frontend/public/screenshots/project_details.png) |

---

## ⚙️ Installation & Setup

Follow these steps to get the project up and running on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/Maisasul/mern-project-management.git
cd mern-project-management
```

### 2. Backend Setup
Navigate to the backend directory, install dependencies, and set up environment variables.
```bash
cd backend
npm install
```
Environment Variables (backend/.env):
Create a file named .env in the backend/ directory and add the following:
```env
PORT=5001
MONGO_URI=your_mongo_connection_string # e.g., mongodb+srv://user:pass@cluster.mongodb.net/mydatabase?retryWrites=true&w=majority
```
Run backend server:
```bash
npm run dev
```
Backend will run on http://localhost:5001

### 3. Frontend Setup
Navigate to the frontend directory, install dependencies, and set up environment variables.
```bash
cd ../frontend # Go back to root and then into frontend
npm install
```
Environment Variables (frontend/.env):
Create a file named .env in the frontend/ directory and add the following:
```env
VITE_API_URL=http://localhost:5001/api # Ensure this matches your backend PORT
```
Run frontend server:
```bash
npm run dev
```
Frontend will run on http://localhost:5173

## 🌐 API Endpoints
### 📂 Projects
| Method | Endpoint            | Description                             |
| ------ | ------------------- | --------------------------------------- |
| GET    | `/api/projects`     | Get all projects with task summary      |
| GET    | `/api/projects/:id` | Get a single project with grouped tasks |
| POST   | `/api/projects`     | Create a new project                    |
| PUT    | `/api/projects/:id` | Update an existing project              |
| DELETE | `/api/projects/:id` | Delete a project and its tasks          |

### 📂 Tasks
| Method | Endpoint                        | Description                          |
| ------ | ------------------------------- | ------------------------------------ |
| GET    | `/api/tasks/project/:projectId` | Get all tasks for a specific project |
| GET    | `/api/tasks/:id`                | Get a single task by ID              |
| POST   | `/api/tasks/project/:projectId` | Create a new task within a project   |
| PUT    | `/api/tasks/:id`                | Update an existing task              |
| DELETE | `/api/tasks/:id`                | Delete a task                        |

## 📂 Project Structure
```bash
project-management-dashboard/
│── backend/
│   ├── config/         # Database connection
│   ├── controllers/    # Project & Task controllers
│   ├── middlewares/    # Error handling middleware
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API routes
│   ├── utils/          # Helper functions (validation, etc.)
│   └── server.js       # App entry point
│
│── frontend/
│   ├── src/
│   │   ├── api/         # API calls
│   │   ├── assets/      # Images & icons
│   │   ├── components/  # Reusable UI components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── pages/       # Dashboard, Project Details
│   │   ├── App.jsx      # Root app component
│   │   └── main.jsx     # React entry point
│   └── vite.config.js
│   └── tailwind.config.js
│
└── README.md
```

## 🔮 Future Improvements
-   **Authentication & Authorization:** Implement user registration, login, and protected routes to manage access to projects and tasks.
-   **Drag & Drop:** Add interactive drag-and-drop functionality for tasks within and between Kanban columns.
-   **Search & Filter:** Introduce search capabilities for projects and tasks, along with filtering options by status, priority, or other criteria.
-   **Deployment:** Provide instructions and configurations for deploying the full-stack application to production environments (e.g., Render, Vercel for frontend, Cyclic.sh or similar for backend).
-   **Task Prioritization:** Enhance tasks with priority levels (e.g., High, Medium, Low).
-   **User Collaboration:** Extend functionality to allow multiple users to collaborate on projects.

## 📞 Contact
Maisa Al-Hashmi
🔗 LinkedIn www.linkedin.com/in/maisa-alhashmi-b4206723a
    GitHub https://github.com/Maisasul

## 📄 License
Distributed under the MIT License. See the LICENSE file in the repository for more information.
