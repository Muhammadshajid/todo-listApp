// src/TaskContext.js
import React, { createContext, useReducer, useEffect } from 'react';
import { format, parse } from 'date-fns';

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, action.payload];
    case 'REMOVE_TASK':
      return state.filter(task => task.id !== action.payload);
    case 'TOGGLE_TASK':
      return state.map(task =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
    case 'REORDER_TASKS':
      const { startIndex, endIndex } = action.payload;
      const reorderedTasks = [...state];
      const [removed] = reorderedTasks.splice(startIndex, 1);
      reorderedTasks.splice(endIndex, 0, removed);
      return reorderedTasks;
    case 'FILTER_BY_DUE_DATE':
      const dueDate = action.payload;
      return state.filter(task => {
        if (dueDate) {
          const taskDueDate = parse(task.dueDate, 'yyyy-MM-dd', new Date());
          return format(taskDueDate, 'yyyy-MM-dd') === format(dueDate, 'yyyy-MM-dd');
        }
        return true;
      });
    default:
      return state;
  }
};

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, [], () => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = task => {
    dispatch({ type: 'ADD_TASK', payload: task });
  };

  const removeTask = taskId => {
    dispatch({ type: 'REMOVE_TASK', payload: taskId });
  };

  const toggleTask = taskId => {
    dispatch({ type: 'TOGGLE_TASK', payload: taskId });
  };

  const reorderTasks = (startIndex, endIndex) => {
    dispatch({ type: 'REORDER_TASKS', payload: { startIndex, endIndex } });
  };

  const filterByDueDate = dueDate => {
    dispatch({ type: 'FILTER_BY_DUE_DATE', payload: dueDate });
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask, toggleTask, reorderTasks, filterByDueDate }}>
      {children}
    </TaskContext.Provider>
  );
};

export { TaskProvider, TaskContext };
