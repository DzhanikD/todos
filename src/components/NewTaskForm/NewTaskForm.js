import { useState } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

function NewTaskForm({ addItem }) {
  const [value, setValue] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const onValueChange = (e) => {
    setValue(e.target.value);
  };

  const onMinutesTime = (e) => {
    setMinutes(e.target.value);
  };

  const onSecondesTime = (e) => {
    setSeconds(e.target.value);
  };

  const converterSeconds = (a, b) => (+a * 60 + +b) * 1000;

  const onSubmit = (e) => {
    e.preventDefault();
    if (value.length !== 0) {
      addItem(value, converterSeconds(minutes, seconds));
      setValue('');
      setMinutes('');
      setSeconds('');
    }
  };

  return (
    <form onSubmit={onSubmit} className="new-todo-form">
      <input className="new-todo" placeholder="Task" onChange={onValueChange} value={value} />
      <input
        type="number"
        className="new-todo-form__timer"
        placeholder="Min"
        onChange={onMinutesTime}
        value={minutes}
      />
      <input
        type="number"
        className="new-todo-form__timer"
        placeholder="Sec"
        onChange={onSecondesTime}
        value={seconds}
      />
      <button type="submit" aria-label="submit" />
    </form>
  );
}

NewTaskForm.defaultProps = { addItem: () => {} };
NewTaskForm.propTypes = { addItem: PropTypes.func };

export default NewTaskForm;
