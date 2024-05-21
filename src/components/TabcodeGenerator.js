import React from 'react';
import './TabcodeGenerator.css';

const TabcodeGenerator = () => {
  const generateRandomNumber = () => {
    // Generate a random number between 100,000 and 999,999
    return Math.floor(Math.random() * 900000) + 100000;
  };

  const randomNumber = generateRandomNumber();

  return (
    <div className="random-number-container">
      <p className="random-number">{randomNumber}</p>
    </div>
  );
};

export default TabcodeGenerator;
