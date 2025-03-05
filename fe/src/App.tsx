import React from 'react';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from 'src/containers/Home';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
