import React from 'react';
import './NumberSelectionButton.css';

const NumberSelectionButton = ({ onClick, children, style, index }) => {
  const handleClick = () => {
    onClick(index); // Pass the index of the clicked button to the parent component
  };

  return (
    <button
      className={`number-button`}
      onClick={handleClick}
      style={style}
    >
      {children}
    </button>
  );
};

export default NumberSelectionButton;
