import React from 'react';
import WordSelectionButton from './WordSelectionButton';
import './WordSelectionContainer.css';

const WordSelectionContainer = ({ rows, columns, buttonDimensions, onClick, words }) => {
  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`, // Convert to regular property
    gridTemplateRows: `repeat(${rows}, auto)`, // Convert to regular property
    gap: '10px', // Adjust the gap between buttons
  };

  const generateButtons = () => {
    let buttons = [];
    for (let i = 0; i < rows; i++) {
      let rowWords = words[i] || []; // Get the words for the current row
      for (let j = 0; j < columns; j++) {
        let word = rowWords[j] || ''; // Get the word for the current button
        buttons.push(
          <WordSelectionButton
            key={`${i}-${j}`}
            onClick={onClick}
            style={{
              width: buttonDimensions.width,
              height: buttonDimensions.height
            }}
          >
            {word}
          </WordSelectionButton>
        );
      }
    }
    return buttons;
  };

  return (
    <div className="word-selection-container" style={containerStyle}>
      {generateButtons()}
    </div>
  );
};

export default WordSelectionContainer;
