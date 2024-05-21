import React, { useEffect, useState } from 'react';
import './MultiWordSelectionContainer.css';
import WordSelectionButton from './WordSelectionButton';

const MultiWordSelectionContainer = ({ rows, columns, buttonDimensions, onClick, words, styledWords, pageNumber}) => {
  const [selectedButtonIndices, setSelectedButtonIndices] = useState([]);

  useEffect(() => {
    // Reset selected button indices whenever the component is rendered
    setSelectedButtonIndices([]);
  }, [pageNumber]);

  const handleButtonClick = (index) => {
    const indexIsSelected = selectedButtonIndices.includes(index);
    let updatedIndices;

    if (indexIsSelected) {
      updatedIndices = selectedButtonIndices.filter((i) => i !== index);
    } else {
      updatedIndices = [...selectedButtonIndices, index];
    }

    setSelectedButtonIndices(updatedIndices);
    onClick(updatedIndices.map((i) => words[i])); // Pass updated selection to parent
  };
  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, auto)`, // Adjusted grid template columns
    gap: '5px',
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
        const index = i + j*rows;
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
        if (words.length > 21) {
          buttons.push(
            <WordSelectionButton
              key={i}
              onClick={() => handleButtonClick(i)}
              isSelected={selectedButtonIndices.includes(i)}
              style={{
                width: '220px',
                height: '20px',
                fontSize: '22px',
                paddingTop: '12px',
                paddingBottom: '12px',
                paddingLeft: '0px',
                paddingRight: '0px',
                ...styles // Apply styles here
              }}
            >
              {word}
            </WordSelectionButton>
          );
        } else {
          buttons.push(
            <WordSelectionButton
              key={i}
              onClick={() => handleButtonClick(i)}
              isSelected={selectedButtonIndices.includes(i)}
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
      <div className = "general-container">
        <div className="multi-selection-container" style={containerStyle}>
          {generateButtons()}
        </div>
      </div>
    );
  };
};

export default MultiWordSelectionContainer;
