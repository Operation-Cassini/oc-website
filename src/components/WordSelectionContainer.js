import React, { useEffect, useState } from 'react';
import WordSelectionButton from './WordSelectionButton';
import './WordSelectionContainer.css';

const WordSelectionContainer = ({ rows, columns, buttonDimensions, onClick, words, styledWords, pageNumber }) => {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);
  useEffect(() => {
    // Reset selected button index whenever the component is rendered
    setSelectedButtonIndex(null);
  }, [pageNumber]);

  const handleButtonClick = (index) => {
    if (selectedButtonIndex === index) {
      // Deselect the button if it's already selected
      onClick("-"); // Pass null to parent component to signify deselection
      setSelectedButtonIndex(null);
    } else {
      // Select the clicked button
      onClick(words[index]); // Pass the selected word to the parent component
      setSelectedButtonIndex(index);
    }
  };

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, auto)`, // Adjusted grid template columns
    gridTemplateRows: `repeat(${rows}, auto)`,
    gap: '10px',
  };

  const styleMap = {
    underline: { textDecoration: 'underline' },
    italic: { fontStyle: 'italic' },
    red: { color: 'red' },
    green: { color: 'green' },
    blue: { color: 'blue' }
  };
  const generateButtons = () => {
    let buttons = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const index = i + j * rows;
        let word = words[index];
        let styles = {}; // Initialize an empty style object
        
        // Check if the word is styled
        const styledWord = styledWords.find(item => item.content === word);
        if (styledWord && styledWord.style) {
          styledWord.style.forEach(style => {
            if (styleMap[style]) {
              styles = { ...styles, ...styleMap[style] };
            }
          });
        }
        
        buttons.push(
          <WordSelectionButton
            key={index}
            onClick={() => handleButtonClick(index)}
            isSelected={selectedButtonIndex === index}
            style={{
              width: buttonDimensions.width,
              height: buttonDimensions.height,
              ...styles // Apply styles here
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
    <div className="general-container">
      <div className="word-selection-container" style={containerStyle}>
        {generateButtons()}
      </div>
    </div>

  );
};

export default WordSelectionContainer;
