import React from 'react';
import './NumberSelectionButton.css';

const NumberSelectionButton = ({ onClick, children, style, index }) => {
  const handleClick = () => {
    onClick(index);
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
