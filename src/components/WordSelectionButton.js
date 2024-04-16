// WordSelectionButton.js

import React from 'react';
import './WordSelectionButton.css'; // Import CSS file for styling

const WordSelectionButton = ({ onClick, children }) => {
  return (
    <button className="text-button" onClick={onClick}>
      {children}
    </button>
  );
};

export default WordSelectionButton;
