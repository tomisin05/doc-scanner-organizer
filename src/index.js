// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';  // Ensure you're importing from 'react-dom/client' for React 18+
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import './index.css';  // Import global styles if you have them

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
