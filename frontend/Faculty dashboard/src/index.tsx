import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Get the root element
const rootElement = document.getElementById('root');

if (rootElement) {
  // Create a root
  const root = createRoot(rootElement);
  
  // Render your app
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Failed to find the root element');
}