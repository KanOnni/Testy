import './App.css';
import React from 'react';
import Home from './Pages/Home';
import Woman from './Pages/Woman';
import Shop from './Pages/Shop';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 

const App = () => {
    return (
      <>
      <Router>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/woman" element={<Woman />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          {/* Add other routes here */}
        </Routes>   
      </Router>
    </>    
    );
};

export default App;