import React from 'react';

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
  }

  render() {
    const { description, created, onDeleted, onToggleDone, completed, id } = this.props;
    const { editing } = this.state;

    let classNames = '';
    if (completed) {
      classNames += 'completed';
    }
    if (editing) {
      classNames += ' editing';
    }
    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" id={id} onChange={() => onToggleDone(id)} checked={completed} />
          <label htmlFor={id}>
            <span className="description">{description}</span>
            <span className="created">created {created}</span>
          </label>
          <button type="button" className="icon icon-edit" aria-label="editing" onClick={this.onClickEditing} />
          <button type="button" className="icon icon-destroy" aria-label="deleted" onClick={() => onDeleted(id)} />
        </div>
        <form onSubmit={this.onSubmit}>
          <input type="text" className="edit" value={description} onChange={this.onValueChange} />
        </form>
      </li>
    );
  }
}
