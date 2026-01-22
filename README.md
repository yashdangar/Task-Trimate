# Task TriMate

A full-stack task management application built with React and Node.js.

## Tech Stack

- **Frontend**: React, Vite, CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB

## Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yashdangar/Task-Trimate.git
cd Task-Trimate
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory with your configuration:

```env
PORT=5000
MONGODB_URL=mongodb://localhost:27017/task-trimate
```

Start the backend server:

```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal, navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Project Structure

```
task-trimate/
├── backend/
│   ├── config/
│   │   └── db.js           # Database configuration
│   ├── middleware/
│   │   ├── errorHandler.js # Error handling middleware
│   │   └── validation.js   # Request validation
│   ├── models/
│   │   └── Task.js         # Task model schema
│   ├── routes/
│   │   └── taskRoutes.js   # API routes for tasks
│   ├── server.js           # Express server entry point
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── FilterButtons.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskItem.jsx
│   │   │   └── TaskList.jsx
│   │   ├── services/
│   │   │   └── api.js      # API service functions
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

## Available Scripts

### Backend

| Command | Description |
|---------|-------------|
| `npm start` | Start the server |
| `npm run dev` | Start the server with nodemon (hot reload) |

### Frontend

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |
