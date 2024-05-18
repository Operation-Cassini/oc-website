import React from 'react';
import './Instruction.css';

const Instruction = ({ text, className }) => {
  return (
    <div className={className}>
      {text}
    </div>
  );
};

export default Instruction;
