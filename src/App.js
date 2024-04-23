import React from 'react';
import NextButton from './components/NextButton'; // Import your NextButton component
import saturn from './saturn.png';
import './App.css';

const App = () => {
  const handleNext = () => {
    // Handle next button click event
  };

  return (
    <div className="container">
      <div className="SATURN-png">
        <img src={saturn} alt="saturn logo" />
      </div>
      <div className="start-button-container">
        <NextButton>START</NextButton>
      </div>
    </div>
  );
};

export default App;