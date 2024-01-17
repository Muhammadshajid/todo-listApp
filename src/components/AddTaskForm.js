// src/components/AddTaskForm.js
import React, { useState, useContext } from 'react';
import { TaskContext } from './TaskContext';

const AddTaskForm = () => {
  const { addTask } = useContext(TaskContext);
  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      addTask({ id: Date.now(), title: newTask, completed: false, dueDate });
      setNewTask('');
      setDueDate('');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter task..."
        value={newTask}
        onChange={e => setNewTask(e.target.value)}
      />
      <input
        type="date"
        placeholder="Due Date"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default AddTaskForm;
