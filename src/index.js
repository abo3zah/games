import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import { TicTacToe } from './routes/tic-tac-toe.js'
import { NumbersOrganizer } from './routes/numbers-organizer.js'
import App from './app.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Tic-Tac-Toe" element={<TicTacToe />} />
        <Route path="/Number-Organizer" element={<NumbersOrganizer />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
