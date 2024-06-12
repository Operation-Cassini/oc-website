import React from 'react';
import './BlackBoarderTextBox.css';

const BlackBoarderTextBox = ({ children }) => {
  return (
      <div className="text-box">
        {children}
      </div>
  );
};

export default BlackBoarderTextBox;