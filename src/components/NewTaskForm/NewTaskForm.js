import React from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

class NewTaskForm extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      minutes: '',
      seconds: ''
    };

    this.onValueChange = (e) => {
      this.setState({ value: e.target.value });
    };

    this.onMinutesTime = (e) => {
      this.setState({minutes: e.target.value});
      
    };

    this.onSecondesTime = (e) => {
      this.setState({seconds: e.target.value});
    };

    this.converterSeconds = (a, b) => (+a * 60 +  +b) * 1000;

    this.onSubmit = (e) => {
      const { value, minutes, seconds } = this.state;
      const { addItem } = this.props;
      e.preventDefault();
      if (value.length !== 0) {
        addItem(value, this.converterSeconds(minutes, seconds));
        this.setState({ value: '', minutes: '', seconds: '' });
      }
    };
  }

  render() {
    const { value, minutes, seconds } = this.state;
    return (
      <form onSubmit={this.onSubmit} className="new-todo-form">
        <input className="new-todo" placeholder="Task" onChange={this.onValueChange} value={value}/>
        <input type="number" className="new-todo-form__timer" placeholder="Min" onChange={this.onMinutesTime} value={minutes}/>
        <input type="number" className="new-todo-form__timer" placeholder="Sec" onChange={this.onSecondesTime} value={seconds}/>
        <button type='submit' aria-label="submit"/>
      </form>
    );
  }
}

NewTaskForm.defaultProps = { addItem: () => {} };
NewTaskForm.propTypes = { addItem: PropTypes.func };

export default NewTaskForm;
