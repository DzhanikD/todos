import './App.css';
import React from 'react';

import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';
import Footer from './components/Footer';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      todos: [],

      filter: 'all',
    };

    this.deleteItem = (id) => {
      this.setState(({ todos }) => {
        const result = todos.filter((el) => el.id !== id);
        return { todos: result };
      });
    };

    this.addItem = (text) => {
      const newItem = {
        id: crypto.randomUUID(),
        description: text,
        completed: false,
        created: new Date(),
      };
      this.setState(({ todos }) => {
        const newArr = [...todos, newItem];
        return { todos: newArr };
      });
    };

    this.onToggleDone = (id) => {
      this.setState(({ todos }) => {
        const idx = todos.findIndex((el) => el.id === id);
        const oldItem = todos[idx];
        const newItem = { ...oldItem, completed: !oldItem.completed };
        const newArray = [...todos.slice(0, idx), newItem, ...todos.slice(idx + 1)];
        return {
          todos: newArray,
        };
      });
    };

    this.editingItem = (text, id) => {
      this.setState(({ todos }) => {
        const idx = todos.findIndex((el) => el.id === id);
        const item = todos[idx];
        const newItem = { ...item, description: text };
        const newArray = [...todos.slice(0, idx), newItem, ...todos.slice(idx + 1)];

        return {
          todos: newArray,
        };
      });
    };

    this.statusFilter = (status) => {
      this.setState({ filter: status });
    };

    this.clearCompleted = () => {
      this.setState(({ todos }) => {
        const result = todos.filter((el) => !el.completed);
        return { todos: result };
      });
    };

    this.filter = () => {
      const { filter, todos } = this.state;
      switch (filter) {
        case 'all':
          return todos;
        case 'active':
          return todos.filter((el) => !el.completed);
        case 'completed':
          return todos.filter((el) => el.completed);
        default:
          return todos;
      }
    };
  }

  render() {
    const { filter, todos } = this.state;
    const completedCount = todos.filter((el) => !el.completed).length;
    const todoItemsShown = this.filter();
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm addItem={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            todos={todoItemsShown}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            editingItem={this.editingItem}
          />
          <Footer
            clearCompleted={this.clearCompleted}
            completedCount={completedCount}
            statusFilter={this.statusFilter}
            filter={filter}
          />
        </section>
      </section>
     
    );
  }
}

export default App;
