import './App.css';
import { useState } from 'react';

import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';
import Footer from './components/Footer';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  const deleteItem = (id, timerID) => {
    setTodos((oldTodos) => {
      const result = oldTodos.filter((el) => el.id !== id);
      return result;
    });
    clearInterval(timerID);
  };

  const addItem = (text, time) => {
    const newItem = {
      id: crypto.randomUUID(),
      title: text,
      completed: false,
      description: new Date(),
      time,
      timerID: null,
    };
    setTodos((oldtodos) => {
      const newArr = [...oldtodos, newItem];
      return newArr;
    });
  };

  const onToggleDone = (id, timerID) => {
    setTodos((oldTodos) => {
      clearInterval(timerID);
      const idx = oldTodos.findIndex((el) => el.id === id);
      const oldItem = oldTodos[idx];
      const newItem = { ...oldItem, completed: !oldItem.completed, timerID: null };
      const newArray = [...oldTodos.slice(0, idx), newItem, ...oldTodos.slice(idx + 1)];
      return newArray;
    });
  };

  const editingItem = (text, id) => {
    setTodos((oldTodos) => {
      const idx = oldTodos.findIndex((el) => el.id === id);
      const item = oldTodos[idx];
      const newItem = { ...item, title: text };
      const newArray = [...oldTodos.slice(0, idx), newItem, ...todos.slice(idx + 1)];
      return newArray;
    });
  };

  const statusFilter = (status) => {
    setFilter(status);
  };

  const clearCompleted = () => {
    setTodos((oldTodos) => {
      const result = oldTodos.filter((el) => !el.completed);
      return result;
    });
  };

  const filters = () => {
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

  const pauseTimer = (timerID, id) => {
    if (!timerID) return;
    clearInterval(timerID);
    setTodos((oldTodos) => {
      const idx = oldTodos.findIndex((el) => el.id === id);
      const item = oldTodos[idx];
      const newItem = { ...item, timerID: null };
      const newArray = [...oldTodos.slice(0, idx), newItem, ...oldTodos.slice(idx + 1)];
      return newArray;
    });
  };

  const countdown = (time, timerID) => {
    if (time > 0) {
      return time - 1000;
    }

    clearInterval(timerID);
    return time;
  };

  const updateTimer = (id) => {
    setTodos((oldTodos) => {
      const idx = oldTodos.findIndex((el) => el.id === id);
      const oldItem = oldTodos[idx];
      const newItemTime = countdown(oldTodos[idx].time, oldTodos[idx].timerID);
      const newItem = { ...oldItem, time: newItemTime };
      const newArray = [...oldTodos.slice(0, idx), newItem, ...oldTodos.slice(idx + 1)];
      return newArray;
    });
  };

  const playTimer = (id, timerID) => {
    if (timerID) return;
    const timer = setInterval(() => updateTimer(id), 1000);
    setTodos((oldTodos) => {
      const idx = oldTodos.findIndex((el) => el.id === id);
      const item = oldTodos[idx];
      const newItem = { ...item, timerID: timer };
      const newArray = [...oldTodos.slice(0, idx), newItem, ...oldTodos.slice(idx + 1)];
      return newArray;
    });
  };

  const completedCount = todos.filter((el) => !el.completed).length;
  const todoItemsShown = filters();
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm addItem={addItem} />
      </header>
      <TaskList
        todos={todoItemsShown}
        onDeleted={deleteItem}
        onToggleDone={onToggleDone}
        editingItem={editingItem}
        playTimer={playTimer}
        pauseTimer={pauseTimer}
      />
      <Footer
        clearCompleted={clearCompleted}
        completedCount={completedCount}
        statusFilter={statusFilter}
        filter={filter}
      />
    </section>
  );
}

export default App;
