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

    this.deleteItem = (id, timerID) => {
      this.setState(({ todos }) => {
        const result = todos.filter((el) => el.id !== id);
        return { todos: result };
      });
      clearInterval(timerID);
    };

    this.addItem = (text, time) => {
      const newItem = {
        id: crypto.randomUUID(),
        title: text,
        completed: false,
        description: new Date(),
        time,
        timerID: null,
      };
      this.setState(({ todos }) => {
        const newArr = [...todos, newItem];
        return { todos: newArr };
      });
    };

    this.onToggleDone = (id, timerID) => {
      this.setState(({ todos }) => {
        clearInterval(timerID);
        const idx = todos.findIndex((el) => el.id === id);
        const oldItem = todos[idx];
        const newItem = { ...oldItem, completed: !oldItem.completed, timerID: null };
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
        const newItem = { ...item, title: text };
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

    this.componentWillUnmount = () => {
      const { todos } = this.state;
      todos.forEach((todo) => {
        clearInterval(todo.timerID);
      });
    };

    this.playTimer = (id, timerID) => {
      if (timerID) return;
      this.timerID = setInterval(() => this.updateTimer(id), 1000);
      this.setState(({ todos }) => {
        const idx = todos.findIndex((el) => el.id === id);
        const item = todos[idx];
        const newItem = { ...item, timerID: this.timerID };
        const newArray = [...todos.slice(0, idx), newItem, ...todos.slice(idx + 1)];
        return {
          todos: newArray,
        };
      });
    };

    this.pauseTimer = (timerID, id) => {
      if (!timerID) return;
      clearInterval(timerID);
      this.setState(({ todos }) => {
        const idx = todos.findIndex((el) => el.id === id);
        const item = todos[idx];
        const newItem = { ...item, timerID: null };
        const newArray = [...todos.slice(0, idx), newItem, ...todos.slice(idx + 1)];
        return {
          todos: newArray,
        };
      });
    };

    this.countdown = (time, timerID) => {
      if (time > 0) {
        return time - 1000;
      }

      clearInterval(timerID);
      return time;
    };

    this.updateTimer = (id) => {
      this.setState(({ todos }) => {
        const idx = todos.findIndex((el) => el.id === id);
        const oldItem = todos[idx];
        const newItemTime = this.countdown(todos[idx].time, todos[idx].timerID);
        const newItem = { ...oldItem, time: newItemTime };
        const newArray = [...todos.slice(0, idx), newItem, ...todos.slice(idx + 1)];
        return {
          todos: newArray,
        };
      });
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

        <TaskList
          todos={todoItemsShown}
          onDeleted={this.deleteItem}
          onToggleDone={this.onToggleDone}
          editingItem={this.editingItem}
          playTimer={this.playTimer}
          pauseTimer={this.pauseTimer}
        />
        <Footer
          clearCompleted={this.clearCompleted}
          completedCount={completedCount}
          statusFilter={this.statusFilter}
          filter={filter}
        />
      </section>
    );
  }
}

export default App;
