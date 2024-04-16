import React from 'react';
import NextButton from './components/NextButton'; // Import your NextButton component
import Instruction from './components/Instruction';
import WordSelectionButton from './components/WordSelectionButton';
import './App.css';

const App = () => {
  const handleNext = () => {
    // Handle next button click event
  };

  return (
    <div>
      <h1>Your React App</h1>
      <div className="instruction-container"> {/* Apply the parent container styling */}
        <Instruction text="This is an instruction. You can pass any text here." className="instruction" />
        <Instruction text="This is another instruction. You can pass any text here." className="instruction" />
        <Instruction text="This is another instruction. You can pass any text here." className="instruction" />
      </div>
      <NextButton onClick={handleNext}>NEXT</NextButton>
      <WordSelectionButton>JAZZ</WordSelectionButton>
    </div>
  );
};

export default App;
