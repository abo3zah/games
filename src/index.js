import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, HashRouter } from 'react-router-dom';
import './index.css';
import { TicTacToe } from './routes/tic-tac-toe.js';
import { NumbersOrganizer } from './routes/numbers-organizer.js';
import { LetterArranger } from './routes/letterArranger/letterArranger';
import App from './app.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <HashRouter>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/Tic-Tac-Toe' element={<TicTacToe />} />
                <Route
                    path='/Number-Organizer'
                    element={<NumbersOrganizer />}
                />
                <Route path='/Letter-Arranger' element={<LetterArranger />} />
            </Routes>
        </HashRouter>
    </React.StrictMode>
);
