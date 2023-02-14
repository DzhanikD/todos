import './TasksFilter.css';

function TasksFilter({ statusFilter, filter }) {
  const buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];
  const newButtons = buttons.map(({ name, label }) => (
    <li key={name}>
      <button type="button" className={filter === name ? 'selected' : ''} onClick={() => statusFilter(name)}>
        {label}
      </button>
    </li>
  ));
  return <ul className="filters">{newButtons}</ul>;
}

export default TasksFilter;
