import React from 'react';
import './WordSelectionButton.css';

const WordSelectionButton = ({ onClick, children, style, isSelected, index }) => {
  const handleClick = () => {
    onClick(index);
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
