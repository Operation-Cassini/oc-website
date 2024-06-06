import React from 'react';
import './WordSelectionButton.css';

const WordSelectionButton = ({ onClick, children, style, isSelected, index }) => {
  const handleClick = () => {
    onClick(index); // Pass the index of the clicked button to the parent component
  };
  
  return (
    <button
      className={`word-button ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
      style={style}
    >
      {children}
    </button>
  );
};

export default WordSelectionButton;
