// Instruction.js

import React from 'react';
import './Instruction.css';

const Instruction = ({ text }) => {
  return (
      <div className="instruction-box">
        <p className="instruction-text">{text}</p>
      </div>
  );
};

export default Instruction;
