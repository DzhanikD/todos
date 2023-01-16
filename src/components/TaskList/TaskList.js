import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

import Task from '../Task';
import './TaskList.css';

function TaskList({ todos, onDeleted, onToggleDone, editingItem }) {
  const elements = todos.map((el) => (
    <Task
      id={el.id}
      key={el.id}
      completed={el.completed}
      description={el.description}
      created={formatDistanceToNow(el.created)}
      onDeleted={onDeleted}
      onToggleDone={onToggleDone}
      editingItem={editingItem}
    />
  ));
  return <ul className="todo-list">{elements}</ul>;
}

TaskList.defaultProps = {
  todos: [],
  onDeleted: () => {},
  onToggleDone: () => {},
  editingItem: () => {},
};
TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      description: PropTypes.string,
      completed: PropTypes.bool,
      created: PropTypes.instanceOf(Date),
    })
  ),
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  editingItem: PropTypes.func,
};

export default TaskList;
