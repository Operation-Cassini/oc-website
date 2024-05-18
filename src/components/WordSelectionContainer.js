import React, { useState } from 'react';
import WordSelectionButton from './WordSelectionButton';
import './WordSelectionContainer.css';

const WordSelectionContainer = ({ rows, columns, onClick, words }) => {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);

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

  const generateButtons = () => {
    let buttons = [];
    for (let i = 0; i < rows * columns; i++) {
      let word = words[i] || ''; // Get the word for the current button
      buttons.push(
        <WordSelectionButton
          key={i}
          index={i}
          onClick={handleButtonClick}
          isSelected={selectedButtonIndex === i}
          style={{
            width: '100px',
            height: '50px',
            flexBasis: `calc(100% / ${columns} - 10px)`, // Adjust the width of each button
          }}
        >
          {word}
        </WordSelectionButton>
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
