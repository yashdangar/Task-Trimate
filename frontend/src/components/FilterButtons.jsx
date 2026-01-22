function FilterButtons({ currentFilter, onFilterChange, taskCounts }) {
  const filters = [
    { value: 'all', label: 'All', count: taskCounts.total },
    { value: 'active', label: 'Active', count: taskCounts.active },
    { value: 'completed', label: 'Completed', count: taskCounts.completed },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`px-4 py-2 font-medium border-2 border-border transition-all
            ${currentFilter === filter.value
              ? 'bg-accent text-accent-foreground shadow-neo translate-x-0 translate-y-0'
              : 'bg-card text-card-foreground shadow-neo hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-neo-sm'
            }
            active:translate-x-1 active:translate-y-1 active:shadow-none`}
        >
          {filter.label}
          <span className={`ml-2 px-2 py-0.5 text-xs font-bold border border-border
            ${currentFilter === filter.value 
              ? 'bg-accent-foreground text-accent' 
              : 'bg-muted text-muted-foreground'}`}
          >
            {filter.count}
          </span>
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;
