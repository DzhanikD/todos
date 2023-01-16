import PropTypes from 'prop-types';

import TasksFilter from '../TasksFilter';
import './Footer.css';

function Footer({ completedCount, statusFilter, filter, clearCompleted }) {
  return (
    <footer className="footer">
      <span className="todo-count">{completedCount} items left</span>
      <TasksFilter statusFilter={statusFilter} filter={filter} />
      <button type="button" className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  clearCompleted: () => {},
  completedCount: 0,
  statusFilter: () => {},
  filter: 'all',
};

Footer.propTypes = {
  clearCompleted: PropTypes.func,
  completedCount: PropTypes.number,
  statusFilter: PropTypes.func,
  filter: PropTypes.string,
};

export default Footer;
