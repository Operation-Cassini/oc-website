import React, { useState, useEffect } from 'react';
import './WordSelectionContainer.css';
import WordSelectionButton from './WordSelectionButton';

const WordSelectionContainer = ({ rows, columns, buttonDimensions, onClick, words, pageNumber }) => {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);
  
  useEffect(() => {
    // Reset selected button index whenever the component is rendered
    setSelectedButtonIndex(null);
  }, [pageNumber]);

  const handleButtonClick = (index) => {
    if (selectedButtonIndex === index) {
      // Deselect the button if it's already selected
      onClick(null); // Pass null to parent component to signify deselection
      setSelectedButtonIndex(null);
    } else {
      // Select the clicked button
      onClick(words[index]); // Pass the selected word to the parent component
      setSelectedButtonIndex(index);
    }
  };

  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'flex-start',
  };

  const buttonContainerStyle = {
    flexBasis: `calc((100% / ${columns}) - 10px)`,
    boxSizing: 'border-box',
  };

  const generateButtons = () => {
    let buttons = [];
    for (let i = 0; i < rows * columns; i++) {
      let word = words[i] || ''; // Get the word for the current position, empty string if none
      buttons.push(
        <div
          key={i}
          className="word-selection-button"
          style={buttonContainerStyle}
        >
          <WordSelectionButton
            onClick={() => handleButtonClick(i)}
            isSelected={selectedButtonIndex === i}
            style={{
              width: buttonDimensions.width,
              height: buttonDimensions.height,
            }}
          >
            {word}
          </WordSelectionButton>
        </div>
      );
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
