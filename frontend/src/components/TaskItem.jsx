import { useState } from "react";

function TaskItem({ task, onToggleComplete, onDelete, isUpdating }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    onDelete(task._id);
    setShowConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <div
        className={`bg-card border-2 border-border p-4 shadow-neo transition-all
          ${task.completed ? "opacity-75" : ""} 
          ${isUpdating ? "opacity-50 pointer-events-none" : ""}`}
      >
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <button
            onClick={() => onToggleComplete(task._id, !task.completed)}
            disabled={isUpdating}
            className={`shrink-0 w-6 h-6 mt-0.5 border-2 border-border flex items-center 
              justify-center transition-all hover:scale-110
              ${task.completed ? "bg-secondary" : "bg-background"}`}
            aria-label={
              task.completed ? "Mark as incomplete" : "Mark as complete"
            }
          >
            {task.completed && (
              <svg
                className="w-4 h-4 text-secondary-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </button>

          {/* Task Content */}
          <div className="flex-1 min-w-0">
            <h3
              className={`font-semibold text-card-foreground wrap-break-word
                ${task.completed ? "line-through text-muted-foreground" : ""}`}
            >
              {task.title}
            </h3>

            <p className="mt-2 text-xs text-muted-foreground">
              Created: {formatDate(task.createdAt)}
            </p>
          </div>

          {/* View Details Button */}
          <button
            onClick={() => setShowDetails(true)}
            disabled={isUpdating}
            className="shrink-0 p-2 text-muted-foreground hover:text-secondary 
              hover:bg-muted transition-colors border-2 border-transparent 
              hover:border-border"
            aria-label="View task details"
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
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </button>

          {/* Delete Button */}
          <button
            onClick={handleDeleteClick}
            disabled={isUpdating}
            className="shrink-0 p-2 text-muted-foreground hover:text-primary 
              hover:bg-muted transition-colors border-2 border-transparent 
              hover:border-border"
            aria-label="Delete task"
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* View Details Modal */}
      {showDetails && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowDetails(false)}
        >
          <div
            className="bg-card border-4 border-border p-6 shadow-neo-lg max-w-md w-full animate-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <span
                  className={`px-2 py-1 text-xs font-bold border-2 border-border
                    ${
                      task.completed
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-accent text-accent-foreground"
                    }`}
                >
                  {task.completed ? "COMPLETED" : "ACTIVE"}
                </span>
              </div>
              <button
                onClick={() => setShowDetails(false)}
                className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close"
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

            {/* Title */}
            <h3
              className={`text-xl font-bold text-card-foreground mb-4 wrap-break-word
              ${task.completed ? "line-through" : ""}`}
            >
              {task.title}
            </h3>

            {/* Description */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                Description
              </h4>
              <p className="text-foreground bg-muted p-3 border-2 border-border min-h-15 wrap-break-word">
                {task.description || "No description provided."}
              </p>
            </div>

            {/* Metadata */}
            <div className="space-y-2 text-sm border-t-2 border-border pt-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created:</span>
                <span className="text-foreground font-medium">
                  {formatDateTime(task.createdAt)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Updated:</span>
                <span className="text-foreground font-medium">
                  {formatDateTime(task.updatedAt)}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  onToggleComplete(task._id, !task.completed);
                  setShowDetails(false);
                }}
                className="flex-1 px-4 py-2 border-2 border-border bg-secondary text-secondary-foreground 
                  font-semibold shadow-neo hover:translate-x-0.5 hover:translate-y-0.5 
                  hover:shadow-none transition-all"
              >
                {task.completed ? "Mark Active" : "Mark Complete"}
              </button>
              <button
                onClick={() => setShowDetails(false)}
                className="px-4 py-2 border-2 border-border bg-background text-foreground 
                  font-semibold shadow-neo hover:translate-x-0.5 hover:translate-y-0.5 
                  hover:shadow-none transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showConfirm && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={handleCancelDelete}
        >
          <div
            className="bg-card border-4 border-border p-6 shadow-neo-lg max-w-sm w-full animate-in"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-card-foreground mb-2">
              Delete Task?
            </h3>
            <p className="text-muted-foreground mb-6">
              Are you sure you want to delete "{task.title}"? This action cannot
              be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 border-2 border-border bg-background text-foreground 
                  font-semibold shadow-neo hover:translate-x-0.5 hover:translate-y-0.5 
                  hover:shadow-none transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 border-2 border-border bg-primary text-primary-foreground 
                  font-semibold shadow-neo hover:translate-x-0.5 hover:translate-y-0.5 
                  hover:shadow-none transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TaskItem;
