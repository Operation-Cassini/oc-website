import React from 'react';
import NextButton from './components/NextButton'; // Import your NextButton component
import InstructionContainer from './components/InstructionContainer'; 
import WordSelectionContainer from './components/WordSelectionContainer';
import BlackBoarderTextBox from './components/BlackBoarderTextBox';
import './App.css';

const App = () => {
  const handleNext = () => {
    // Handle next button click event
  };
  const handleButtonClick = () => {

  }
  const instructions = [
    "This is an instruction. You can pass any text here.",
    "This is another instruction. You can pass any text here.",
    "This is another instruction. You can pass any text here."
  ];

  const words = [
    ['Button 1', 'Button 2', 'Button 3'],
    ['Button 4', 'Button 5', 'Button 6']
  ];


  return (
    <div>
      <h1>Your React App</h1>
      <InstructionContainer instructions={instructions} />
      <NextButton onClick={handleNext}>NEXT</NextButton>
      <WordSelectionContainer
        rows={2}
        columns={3}
        buttonDimensions={{ width: '200px', height: '50px' }}
        onClick={handleButtonClick}
        words={words}
      />
      <BlackBoarderTextBox>HELLO</BlackBoarderTextBox>
    </div>
  );
};

export default App;
