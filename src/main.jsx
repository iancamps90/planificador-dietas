import React from 'react';
import ReactDOM from 'react-dom/client';  // Sólo una vez
import './index.css';
import App from './App';
import { DietProvider } from "./context/DietContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DietProvider>
      <App />
    </DietProvider>
  </React.StrictMode>
);

