import React, { useEffect, useState } from 'react';
import './MoneyPadContainer.css';
import NumberSelectionButton from './NumberSelectionButton';
import { useTranslation } from 'react-i18next';

const MoneyPadContainer = ({ rows, columns, buttonDimensions, onClick, timeHandler, words, styledWords, pageNumber}) => {
  const [selectedNumbers, setSelectedNumbers] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    // Reset selected button index whenever the component is rendered
    setSelectedNumbers('');
  }, [pageNumber]);
  const handleDelete = () => {
    if (selectedNumbers.length > 0) {
        const updatedNumbers = selectedNumbers.slice(0, selectedNumbers.length - 1);
        setSelectedNumbers(updatedNumbers);
        onClick(updatedNumbers);
      }
    else {
      timeHandler();
    }
  };
  const handleButtonClick = (index) => {
      const selectedNumber = words[index];
      const updatedNumbers = selectedNumbers + selectedNumber;
      if (updatedNumbers.length !== 3) {
        setSelectedNumbers(updatedNumbers);
        onClick(updatedNumbers);
      } else {
        timeHandler();
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
    green: { color: '#00b500' },
    blue: { color: 'blue' },
    blueHighlight: { backgroundColor: '#85c7ff'},
    fadingBlueHighlight: {
      background: 'linear-gradient(to right, #0000ff, #0077ff, #00ccff, #66ffff)',
    },
    yellow: { color: '#d0bc2a' },
    brown: {color: '#964B00' }
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
      <div className="number-pad">
        <div className="number-line">
          <div className = "selected-numbers">&nbsp;&nbsp;&nbsp;$
              {selectedNumbers.split('').map((number, index) => (
              <span key={index} className="number-money">{number}</span>
              ))}
          </div>
          <div className = "underscores-money">_ _</div>
        </div>

        <div className="money-selection-container" style={containerStyle}>
          {generateButtons()}
        </div>
        <button onClick={handleDelete} className="delete-button">{t('delete')}</button>
      </div>
  </div>
  );

};

export default MoneyPadContainer;