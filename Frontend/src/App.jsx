import './App.css'
import React from 'react';
import Home from './Pages/Home';
import Woman from './Pages/Woman'
import Shop from './Pages/Shop'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 

const App = () => {
    return (
      <>
      <Router>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/woman" element={<Woman />} />
          <Route path="/shop" element={<Shop />} />
          
          {/* Add other routes here */}
        </Routes>   
      </Router>
    </>    
    );
};

export default App;