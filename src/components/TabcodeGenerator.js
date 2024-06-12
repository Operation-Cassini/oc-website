import React from 'react';
import Instruction from './Instruction';
import './TabcodeGenerator.css';

const TabcodeGenerator = ({ tabCode }) => {
  return (
    <div>
      <Instruction 
      text={"Save this number"}
      className = "instruction-box"/>
      <div className="tabcode-container">
        <p className="tabcode">{tabCode}</p>
      </div>
    </div>

  );
};

export default TabcodeGenerator;
