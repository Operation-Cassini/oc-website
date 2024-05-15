import React, { useState, useEffect } from 'react';
import WordSelectionButton from './WordSelectionButton';
import './WordSelectionContainer.css';

const WordSelectionContainer = ({ rows, columns, buttonDimensions, onClick, words, pageNumber}) => {
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
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, auto)`,
    gap: '10px',
  };

  const generateButtons = () => {
    let buttons = [];
    for (let i = 0; i < rows * columns; i = i + parseInt(columns)) {
      for (let j = 0; j < columns; j++) {
        const index = i + j;
        let word = words[index];
        buttons.push(
          <WordSelectionButton
            key={index}
            onClick={() => handleButtonClick(index)}
            style={{
              width: buttonDimensions.width,
              height: buttonDimensions.height,
              backgroundColor: selectedButtonIndex === index ? 'blue' : 'white',
              color: selectedButtonIndex === index ? 'white' : 'black',
              // You can add any additional styles here
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