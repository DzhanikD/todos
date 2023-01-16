import React from 'react';
import './TasksFilter.css';

export default class TasksFilter extends React.Component {
  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  render() {
    const { statusFilter, filter } = this.props;
    const buttons = this.buttons.map(({ name, label }) => (
      <button type="button" className={filter === name ? 'selected' : ''} onClick={() => statusFilter(name)} key={name}>
        {label}
      </button>
    ));
    return (
      <ul className="filters">
        <li>{buttons}</li>
      </ul>
    );
  }
}
