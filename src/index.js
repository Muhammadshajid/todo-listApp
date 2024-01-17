// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { TaskProvider } from './components/TaskContext';
import store from './Store';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <TaskProvider>
        <App />
      </TaskProvider>
    </Provider>
  </React.StrictMode>,
);
