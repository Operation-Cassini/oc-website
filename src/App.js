import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NextButton from './components/NextButton'; // Import your NextButton component
import saturn from './saturn.png';
import Home from './Home';
import DumbPage from './DumbPage';

const App = () => {
  const handleNext = () => {
    
  };

  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/DumbPage" element={<DumbPage />} />
      </Routes>
    </Router>
    
  );
};

export default App;