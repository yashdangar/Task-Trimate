import TaskItem from './TaskItem';

function TaskList({ tasks, onToggleComplete, onDelete, isLoading, updatingTaskId }) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-12 h-12 border-4 border-muted border-t-primary animate-spin"></div>
        <p className="mt-4 text-muted-foreground font-medium">Loading tasks...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="bg-card border-2 border-border p-8 md:p-12 shadow-neo text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-muted border-2 border-border flex items-center justify-center">
          <svg 
            className="w-8 h-8 text-muted-foreground" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
            />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-card-foreground mb-2">No tasks found</h3>
        <p className="text-muted-foreground">
          Add a new task above to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          isUpdating={updatingTaskId === task._id}
        />
      ))}
    </div>
  );
}

export default TaskList;
