import { useState, useEffect } from "react";

function TaskForm({ onAddTask, isLoading, isOpen, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await onAddTask({
        title: title.trim(),
        description: description.trim(),
      });
      setTitle("");
      setDescription("");
      setErrors({});
      onClose();
    } catch (error) {
      setErrors({ submit: "Failed to add task. Please try again." });
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div
        className="w-full max-w-md animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit} className="w-full">
          <div className="bg-card border-2 border-border p-4 md:p-6 shadow-neo-lg">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg md:text-xl font-bold text-card-foreground">
                Add New Task
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="p-1 text-muted-foreground hover:text-foreground 
                  hover:bg-muted transition-colors border-2 border-transparent 
                  hover:border-border"
                aria-label="Close modal"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {/* Title Input */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-card-foreground mb-1"
                >
                  Title <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter task title..."
                  disabled={isLoading}
                  autoFocus
                  className={`w-full px-3 py-2 border-2 bg-background text-foreground 
                    placeholder:text-muted-foreground focus:outline-none focus:ring-2 
                    focus:ring-ring focus:border-primary transition-all
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${errors.title ? "border-primary" : "border-input"}`}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-primary font-medium">
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Description Input */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-card-foreground mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter task description (optional)..."
                  rows={3}
                  disabled={isLoading}
                  className="w-full px-3 py-2 border-2 border-input bg-background text-foreground 
                    placeholder:text-muted-foreground focus:outline-none focus:ring-2 
                    focus:ring-ring focus:border-primary transition-all resize-none
                    disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* Error Message */}
              {errors.submit && (
                <p className="text-sm text-primary font-medium">
                  {errors.submit}
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isLoading}
                  className="flex-1 px-4 py-2.5 bg-muted text-muted-foreground 
                    font-semibold border-2 border-border shadow-neo-sm 
                    hover:translate-x-px hover:translate-y-px hover:shadow-none 
                    active:translate-x-0.5 active:translate-y-0.5 transition-all
                    disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground 
                    font-semibold border-2 border-border shadow-neo-sm 
                    hover:translate-x-px hover:translate-y-px hover:shadow-none 
                    active:translate-x-0.5 active:translate-y-0.5 transition-all
                    disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Adding...
                    </span>
                  ) : (
                    "Add Task"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;
