import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

import Task from '../Task';
import './TaskList.css';

function TaskList({ todos, onDeleted, onToggleDone, editingItem, playTimer, pauseTimer, onkeyEsc }) {
  const elements = todos.map((el) => (
    <Task
      id={el.id}
      key={el.id}
      completed={el.completed}
      title={el.title}
      description={formatDistanceToNow(el.description)}
      onDeleted={onDeleted}
      onToggleDone={onToggleDone}
      editingItem={editingItem}
      time={el.time}
      playTimer={playTimer}
      pauseTimer={pauseTimer}
      timerID={el.timerID}
      onkeyEsc={onkeyEsc}
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
      title: PropTypes.string,
      completed: PropTypes.bool,
      description: PropTypes.instanceOf(Date),
    })
  ),
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  editingItem: PropTypes.func,
};

export default TaskList;
