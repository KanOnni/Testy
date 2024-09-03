/* import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg' */
import './App.css'
import React from 'react';
import Home from './Pages/Home';
import Woman from '../src/Pages/Woman';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 




const App: React.FC = () => {
    return (
      <>
      <Router>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/woman" element={<Woman />} />

          {/* Add other routes here */}
        </Routes>
      </Router>
    </>
    );
};

export default App;

