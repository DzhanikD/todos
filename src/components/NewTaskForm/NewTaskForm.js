import React from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

class NewTaskForm extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
    };

    this.onValueChange = (e) => {
      this.setState({ value: e.target.value });
    };

    this.onSubmit = (e) => {
      const { value } = this.state;
      const { addItem } = this.props;
      e.preventDefault();
      if (value.length !== 0) {
        addItem(value);
        this.setState({ value: '' });
      }
    };
  }

  render() {
    const { value } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <input className="new-todo" placeholder="What needs to be done?" onChange={this.onValueChange} value={value} />
      </form>
    );
  }
}

NewTaskForm.defaultProps = { addItem: () => {} };
NewTaskForm.propTypes = { addItem: PropTypes.func };

export default NewTaskForm;
