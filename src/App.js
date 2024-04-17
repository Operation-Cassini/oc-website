import React from 'react';
import NextButton from './components/NextButton'; // Import your NextButton component
import InstructionContainer from './components/InstructionContainer'; 
import WordSelectionButton from './components/WordSelectionButton';
import './App.css';

const App = () => {
  const handleNext = () => {
    // Handle next button click event
  };
  const instructions = [
    "This is an instruction. You can pass any text here.",
    "This is another instruction. You can pass any text here.",
    "This is another instruction. You can pass any text here."
  ];


  return (
    <div>
      <h1>Your React App</h1>
      <InstructionContainer instructions={instructions} />
      <NextButton onClick={handleNext}>NEXT</NextButton>
      <WordSelectionButton>JAZZ</WordSelectionButton>
    </div>
  );
};

export default App;
