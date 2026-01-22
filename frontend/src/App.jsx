import { useState, useEffect, useCallback } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterButtons from "./components/FilterButtons";
import { api } from "./services/api";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatingTaskId, setUpdatingTaskId] = useState(null);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  // Toggle dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Fetch tasks
  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await api.getTasks();
      setTasks(data);
    } catch (err) {
      setError(
        "Failed to fetch tasks. Make sure the backend server is running.",
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Add task
  const handleAddTask = async (taskData) => {
    try {
      setIsAdding(true);
      const newTask = await api.createTask(taskData);
      setTasks((prev) => [newTask, ...prev]);
    } catch (err) {
      throw err;
    } finally {
      setIsAdding(false);
    }
  };

  // Toggle complete
  const handleToggleComplete = async (id, completed) => {
    try {
      setUpdatingTaskId(id);
      const updatedTask = await api.updateTask(id, { completed });
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? updatedTask : task)),
      );
    } catch (err) {
      setError("Failed to update task.");
      console.error(err);
    } finally {
      setUpdatingTaskId(null);
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    try {
      setUpdatingTaskId(id);
      await api.deleteTask(id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      setError("Failed to delete task.");
      console.error(err);
    } finally {
      setUpdatingTaskId(null);
    }
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  // Task counts
  const taskCounts = {
    total: tasks.length,
    active: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  };

  return (
    <div className="min-h-screen bg-background transition-colors">
      {/* Task Form Modal */}
      <TaskForm
        onAddTask={handleAddTask}
        isLoading={isAdding}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Header */}
      <header className="bg-card border-b-2 border-border">
        <div className="max-w-3xl mx-auto px-4 py-4 md:py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-primary">
                Trimate
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage your tasks efficiently
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 border-2 border-border bg-card shadow-neo-sm 
                  hover:translate-x-px hover:translate-y-px hover:shadow-none 
                  transition-all"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <svg
                    className="w-5 h-5 text-secondary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-foreground"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-6 md:py-8">
        <div className="space-y-6">
          {/* Add Task Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full px-4 py-3 bg-primary text-primary-foreground font-semibold 
              border-2 border-border shadow-neo hover:translate-x-0.5 
              hover:translate-y-0.5 hover:shadow-neo-sm active:translate-x-1 
              active:translate-y-1 active:shadow-none transition-all
              flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add New Task
          </button>

          {/* Stats Bar */}
          <div className="bg-secondary border-2 border-border p-4 shadow-neo">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex gap-6">
                <div>
                  <p className="text-xs font-medium text-secondary-foreground uppercase tracking-wide">
                    Total
                  </p>
                  <p className="text-2xl font-bold text-secondary-foreground">
                    {taskCounts.total}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-secondary-foreground uppercase tracking-wide">
                    Active
                  </p>
                  <p className="text-2xl font-bold text-secondary-foreground">
                    {taskCounts.active}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-secondary-foreground uppercase tracking-wide">
                    Done
                  </p>
                  <p className="text-2xl font-bold text-secondary-foreground">
                    {taskCounts.completed}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full sm:w-32">
                <div className="h-3 bg-card border-2 border-border">
                  <div
                    className="h-full bg-accent transition-all duration-300"
                    style={{
                      width: `${taskCounts.total > 0 ? (taskCounts.completed / taskCounts.total) * 100 : 0}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-secondary-foreground mt-1 text-right">
                  {taskCounts.total > 0
                    ? Math.round(
                        (taskCounts.completed / taskCounts.total) * 100,
                      )
                    : 0}
                  % complete
                </p>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-primary text-primary-foreground border-2 border-border p-4 shadow-neo">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="font-medium">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="ml-auto hover:opacity-70"
                  aria-label="Dismiss error"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Filter Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-lg font-bold text-foreground">Your Tasks</h2>
            <FilterButtons
              currentFilter={filter}
              onFilterChange={setFilter}
              taskCounts={taskCounts}
            />
          </div>

          {/* Task List */}
          <TaskList
            tasks={filteredTasks}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDelete}
            isLoading={isLoading}
            updatingTaskId={updatingTaskId}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
