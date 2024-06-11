import React from 'react';
import './Instruction.css';

const Instruction = ({ text, className, style }) => {
  return (
    <div className={className} style = {style}>
      {text}
    </div>
  );
};

export default Instruction;