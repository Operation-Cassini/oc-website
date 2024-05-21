import React, { useEffect, useState } from 'react';
import NumberSelectionButton from './NumberSelectionButton';
import './NumberSelectionContainer.css';

const NumberSelectionContainer = ({ rows, columns, buttonDimensions, onClick, words, styledWords, pageNumber}) => {
  const [selectedNumbers, setSelectedNumbers] = useState('');

  console.log(pageNumber);
  useEffect(() => {
    // Reset selected button index whenever the component is rendered
    console.log("resetting")
    setSelectedNumbers('');
  }, [pageNumber]);
  const handleDelete = () => {
    console.log("here!")
    if (selectedNumbers.length > 0) {
        const updatedNumbers = selectedNumbers.slice(0, selectedNumbers.length - 1);
        console.log("this is the new number",updatedNumbers);
        setSelectedNumbers(updatedNumbers);
        onClick(updatedNumbers);
      }
  };
  const handleButtonClick = (index) => {
      const selectedNumber = words[index];
      console.log(selectedNumber);

      const updatedNumbers = selectedNumbers + selectedNumber;
      console.log(updatedNumbers);
      if (updatedNumbers.length !== 5) {
        setSelectedNumbers(updatedNumbers);
        onClick(updatedNumbers);
      }
  };
  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
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
    for (let i = 0; i < rows * columns; i = i + parseInt(columns)) {
      for (let j = 0; j < columns; j++) {
        const index = i + j;
        let word = words[index];
        let styles = {}; // Initialize an empty style object
        if (word !== undefined) {
          const styledWord = styledWords.find(item => item.content === word);
          if (styledWord && styledWord.style) {
            styledWord.style.forEach(style => {
              if (styleMap[style]) {
                styles = { ...styles, ...styleMap[style] };
              }
            });
          }
          buttons.push(
            <NumberSelectionButton
              key={index}
              onClick={() => handleButtonClick(index)}
              style={{
                width: buttonDimensions.width,
                height: buttonDimensions.height,
                ...styles // Apply styles here
              }}
            >
              {word}
            </NumberSelectionButton>
          );
      }
      }
    }
    return buttons;
  };

  return (
    <div className="general-container">
      <div className="number-line">
        <div className="selected-numbers">
          {selectedNumbers.split('').map((number, index) => (
          <span key={index} className="number">{number}</span>
          ))}
        </div>
        <div className="underscores">_ _ _ _</div>
      </div>
      
      <div className="number-selection-container" style={containerStyle}>
        {generateButtons()}
      </div>
      <button onClick={handleDelete} className="delete-button">DELETE</button>
  </div>
  );
  
};

export default NumberSelectionContainer;