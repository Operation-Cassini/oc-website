import React from 'react';
import './StroopTextBox.css';

const StroopTextBox = ({ children, text}) => {
  return (
    <>
      <div className="top-padding"></div>
      <div className="text-box">
        {text}
        {children}
      </div>
    </>
    
  );
};

export default StroopTextBox;