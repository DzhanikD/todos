import React from 'react';
// import { format } from 'date-fns';
import './Task.css';

export default class Task extends React.Component {
  constructor() {
    super();

    this.state = {
      editing: false,
    };

    this.onClickEditing = () => {
      this.setState({ editing: true });
    };

    this.onValueChange = (e) => {
      const { editingItem, id } = this.props;
      editingItem(e.target.value, id);
    };

    this.onSubmit = (e) => {
      e.preventDefault();
      this.setState({ editing: false });
    };

    this.msToTime = (duration) => {
      // const milliseconds = parseInt((duration % 1000) / 100);
      let seconds = parseInt((duration / 1000) % 60, 10);
      let minutes = parseInt((duration / (1000 * 60)) % 60, 10);
      let hours = parseInt((duration / (1000 * 60 * 60)) % 24, 10);
    
      hours = (hours < 10) ? `0${  hours}` : hours;
      minutes = (minutes < 10) ? `0${  minutes}` : minutes;
      seconds = (seconds < 10) ? `0${  seconds}` : seconds;
    
      return `${hours  }:${  minutes  }:${  seconds  }`;
    };
  }

  render() {
    const { title, description, onDeleted, onToggleDone, completed, id, time, playTimer, pauseTimer, timerID} = this.props;
    const { editing } = this.state;


    let disabled = false;
    let classNames = '';
    let descriptions = 'description';

    if (time === 0) {
      descriptions += ' description-hidden';
    }

    if (completed) {
      classNames += 'completed';
      disabled = true;
    }
    if (editing) {
      classNames += ' editing';
    }

    if (time === 0) {
      // console.log(`эй ${time}`);
      disabled = true;
    }
    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" id={id} onChange={() => onToggleDone(id, timerID)} checked={completed} />
          <label htmlFor={id}>
            <span className="title">{title}</span>
            <span className={descriptions}>
              <button type='button' aria-label="play" className="icon icon-play" disabled = {disabled} onClick={() => playTimer(id, timerID)}/>
              <button type='button' aria-label="pause" className="icon icon-pause" disabled={disabled} onClick={() => pauseTimer(timerID, id) }/>
              <span className='time'>{this.msToTime(time)}</span>  
            </span>
            <span className="description">created {description}</span>
          </label>
          <button type="button" className="icon icon-edit" aria-label="editing" onClick={this.onClickEditing} />
          <button type="button" className="icon icon-destroy" aria-label="deleted" onClick={() => onDeleted(id, timerID)} />
        </div>
        <form onSubmit={this.onSubmit}>
          <input type="text" className="edit" value={title} onChange={this.onValueChange} />
        </form>
      </li>
    );
  }
}
