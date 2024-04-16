// NextButton.js

import React from 'react';
import './NextButton.css'; // Import CSS file for styling

const NextButton = ({ onClick, children }) => {
  return (
    <button className="next-button" onClick={onClick}>
      {children}
    </button>
  );
};

export default NextButton;
