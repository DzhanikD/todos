import { useEffect, useRef, useState } from 'react';
import './Task.css';
import cn from 'classnames';

function Task({
  title,
  description,
  onDeleted,
  onToggleDone,
  completed,
  id,
  time,
  playTimer,
  pauseTimer,
  timerID,
  editingItem,
}) {
  const textInput = useRef();

  const [editing, setEditing] = useState(false);
  const [oldValue, setOldValue] = useState('');

  useEffect(() => {
    textInput.current.focus();
  });

  const onClickEditing = () => {
    setEditing(true);
    setOldValue(title);
  };

  const onValueChange = (e) => {
    editingItem(e.target.value, id);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setEditing(false);
  };

  const onkeyEsc = (e) => {
    if (e.code === 'Escape') {
      setEditing(false);
      editingItem(oldValue, id);
    }
  };

  const msToTime = (duration) => {
    let seconds = parseInt((duration / 1000) % 60, 10);
    let minutes = parseInt((duration / (1000 * 60)) % 60, 10);
    let hours = parseInt((duration / (1000 * 60 * 60)) % 24, 10);

    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${hours}:${minutes}:${seconds}`;
  };

  let disabled = false;

  const descriptions = cn('description', {
    'description-hidden': time === 0,
  });

  const classNames = cn({
    completed,
    editing,
  });

  if (completed) {
    disabled = true;
  }

  if (time === 0) {
    disabled = true;
  }
  return (
    <li className={classNames}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          id={id}
          onChange={() => onToggleDone(id, timerID)}
          checked={completed}
        />
        <label htmlFor={id}>
          <span className="title">{title}</span>
          <span className={descriptions}>
            <button
              type="button"
              aria-label="play"
              className="icon icon-play"
              disabled={disabled}
              onClick={() => playTimer(id, timerID)}
            />
            <button
              type="button"
              aria-label="pause"
              className="icon icon-pause"
              disabled={disabled}
              onClick={() => pauseTimer(timerID, id)}
            />
            <span className="time">{msToTime(time)}</span>
          </span>
          <span className="description">created {description}</span>
        </label>
        <button type="button" className="icon icon-edit" aria-label="editing" onClick={onClickEditing} />
        <button
          type="button"
          className="icon icon-destroy"
          aria-label="deleted"
          onClick={() => onDeleted(id, timerID)}
        />
      </div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className="edit"
          ref={textInput}
          value={title}
          onChange={(e) => onValueChange(e)}
          onKeyDown={(e) => onkeyEsc(e)}
        />
      </form>
    </li>
  );
}

export default Task;
