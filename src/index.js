import React from 'react';
import ReactDOM from 'react-dom/client';  // React 18+ style
import './styles/App.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const root = ReactDOM.createRoot(document.getElementById('root')); // create root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

serviceWorker.register();
