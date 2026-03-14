import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
// registerSW is provided by vite-plugin-pwa at build time
import { registerSW } from 'virtual:pwa-register';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Register the PWA service worker for offline support and install capability.
// The updateSW callback can be used to prompt the user to refresh when a new
// version of the app is available.
registerSW({
  onNeedRefresh() {
    // New content available – could show a toast/prompt to the user here
    console.log('New content available, please refresh.');
  },
  onOfflineReady() {
    console.log('App is ready to work offline.');
  },
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
