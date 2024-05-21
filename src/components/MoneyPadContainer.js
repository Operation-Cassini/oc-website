import React, { useEffect, useState } from 'react';
import './MoneyPadContainer.css';
import NumberSelectionButton from './NumberSelectionButton';

const MoneyPadContainer = ({ rows, columns, buttonDimensions, onClick, words, styledWords, pageNumber}) => {
  const [selectedNumbers, setSelectedNumbers] = useState('');

  useEffect(() => {
    // Reset selected button index whenever the component is rendered
    console.log("resetting")
    setSelectedNumbers('');
  }, [pageNumber]);
  const handleDelete = () => {
    console.log("here!")
    if (selectedNumbers.length > 0) {
        const updatedNumbers = selectedNumbers.slice(0, selectedNumbers.length - 1);
        console.log(updatedNumbers);
        setSelectedNumbers(updatedNumbers);
        onClick(updatedNumbers);
      }
  };
  const handleButtonClick = (index) => {
      const selectedNumber = words[index];
      console.log(selectedNumber);

      const updatedNumbers = selectedNumbers + selectedNumber;
      console.log(updatedNumbers);
      if (updatedNumbers.length !== 3) {
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
    <div className = "general-container">
        <div className="number-line">
          {/* <div className="dollar-sign">$</div> */}
            <div className = "selected-numbers">$
                {selectedNumbers.split('').map((number, index) => (
                <span key={index} className="number-money">{number}</span>
                ))}
            </div>   
        </div>
        <div className = "underscores-money">_ _</div>
      <div className="money-selection-container" style={containerStyle}>
        {generateButtons()}
      </div>
      <button className = "delete-button" onClick={handleDelete}>Delete</button>
    </div>
  );
  
};

export default MoneyPadContainer;