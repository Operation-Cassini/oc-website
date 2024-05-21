import React from 'react';
import './StroopTextBox.css';

const StroopTextBox = ({ children, textColor }) => {
  return (
    <>
      <div className="top-padding"></div>
      <div className="text-box" style={{ color: textColor }}>
        {children}
      </div>
    </>
  );
};

export default StroopTextBox;
