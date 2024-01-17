// src/App.js
import React, { useContext } from 'react';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import { TaskContext } from './components/TaskContext';
import './App.css';

function App() {
  const { filterByDueDate } = useContext(TaskContext);

  const handleDueDateChange = e => {
    const dueDate = e.target.value === '' ? null : new Date(e.target.value);
    filterByDueDate(dueDate);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <AddTaskForm />
      <label htmlFor="dueDate">Filter by Due Date:</label>
      <input type="date" id="dueDate" onChange={handleDueDateChange} />
      <TaskList />
    </div>
  );
}

export default App;
