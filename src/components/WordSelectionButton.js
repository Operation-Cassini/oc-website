import React from 'react';
import './WordSelectionButton.css'; // Import CSS file for styling

const WordSelectionButton = ({ onClick, children, style }) => {
  return (
    <button className="text-button" onClick={onClick} style={style}>
      {children}
    </button>
  );
};

export default WordSelectionButton;
