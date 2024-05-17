import React from 'react';
import './NumberSelectionButton.css';

const NumberSelectionButton = ({ onClick, children, style, index }) => {
  const handleClick = () => {
    onClick(index); // Pass the index of the clicked button to the parent component
  };

  return (
    <button
      className={`text-button`}
      onClick={handleClick}
      style={style}
      // disabled={isSelected} // Disable button if it is already selected
    >
      {children}
    </button>
  );
};

export default NumberSelectionButton;

