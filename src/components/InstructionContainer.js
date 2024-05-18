import React from 'react';
import Instruction from './Instruction'; 
import './InstructionContainer.css';

const InstructionContainer = ({ instructions }) => {
  return (
    <div className="instruction-container">
      {instructions.map((text, index) => (
        <Instruction key={index} text={text} className="instruction-box" />
      ))}
    </div>
  );
};

export default InstructionContainer;
