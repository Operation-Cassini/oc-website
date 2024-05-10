import React, { useState, useEffect } from 'react';
import WordSelectionButton from './WordSelectionButton';
import './WordSelectionContainer.css';

const WordSelectionContainer = ({ rows, columns, buttonDimensions, onClick, words }) => {
<<<<<<< HEAD
  // console.log(selectedButtonIndex);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);

  useEffect(() => {
    // Reset selected button index when new words are received
    setSelectedButtonIndex(null);
  });

  const handleButtonClick = (index) => {
    if (selectedButtonIndex === index) {
      // Deselect the button if it's already selected
      setSelectedButtonIndex(null);
      onClick(null); // Pass null to parent component to signify deselection
    } else {
      // Select the clicked button
      setSelectedButtonIndex(index);
      onClick(words[index]); // Pass the selected word to the parent component
    }
  };

=======
  console.log("right here")
  console.log(words)
>>>>>>> 0a9e422b8ffa362828426439fba97d64ea4ab370
  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, auto)`,
    gap: '10px',
  };

  const generateButtons = () => {
    let buttons = [];
    for (let i = 0; i < rows * columns; i = i + parseInt(columns)) {
<<<<<<< HEAD
      for (let j = 0; j < columns; j++) {
        const index = i + j;
        let word = words[index];
=======
      // let rowWords = words[i] || []; // Get the words for the current row
      // let rowWords = words[i];
      for (let j = 0; j < columns; j++) {
        // let word = rowWords[j] || ''; // Get the word for the current button
        let word = words[i+j];
>>>>>>> 0a9e422b8ffa362828426439fba97d64ea4ab370
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

