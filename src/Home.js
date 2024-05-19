import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NextButton from './components/NextButton'; // Import your NextButton component
import saturn from './saturn.png';
import './Home.css';

const Home = () => {
  const handleNext = () => {
    
  };

  return (
    <div className="container">
      <div className="SATURN-png">
        <img src={saturn} alt="saturn logo" />
      </div>
      <div className="start-button-container">
        <NextButton correctAnswer = "-" correctRequirement = "-" selectedAnswer = "-" to="/page/0">START</NextButton>
      </div>
    </div>

    
  );
};

export default Home;
