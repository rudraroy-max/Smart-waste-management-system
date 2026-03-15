import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter here
import App from './App';
import './index.css';  // Your global styles

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>  {/* Wrap the whole app with BrowserRouter */}
    <App />
  </BrowserRouter>
);
