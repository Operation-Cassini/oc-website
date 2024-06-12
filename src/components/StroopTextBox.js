import React from 'react';
import './StroopTextBox.css';

const StroopTextBox = ({ children, text}) => {
  return (
    <>
      <div className="extra-top-margin"></div>
      <div className="stroop-text-box">
        {text}
        {children}
      </div>
    </>
    
  );
};

export default StroopTextBox;