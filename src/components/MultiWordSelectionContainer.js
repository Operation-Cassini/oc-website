import React, { useEffect, useState } from 'react';
import './MultiWordSelectionContainer.css';
import WordSelectionButton from './WordSelectionButton';

const MultiWordSelectionContainer = ({ rows, columns, buttonDimensions, onClick, words, styledWords, pageNumber}) => {
  const [selectedButtonIndices, setSelectedButtonIndices] = useState([]);
  useEffect(() => {
    // Reset selected button index whenever the component is rendered
    setSelectedButtonIndices([]);
  }, [pageNumber]);

  const handleButtonClick = (index) => {
    const indexIsSelected = selectedButtonIndices.includes(index);
    let updatedIndices;
    if (indexIsSelected) {
        updatedIndices = selectedButtonIndices.filter((i) => i !== index);
        setSelectedButtonIndices(updatedIndices);
        onClick(["-"]); // Pass null to parent component to signify deselection
    } else {
      updatedIndices = [...selectedButtonIndices, index];
      setSelectedButtonIndices(updatedIndices);
    }
    const selectedWords = updatedIndices.map((selectedIndex) => words[selectedIndex]);
    // Pass the selected words to the parent component
    onClick(selectedWords);
    
  };
  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, auto)`,
    gap: words.length > 21 ? '0.3vh' : '5px',
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
    for (let i = 0; i < rows ; i++) {
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
        if (index < words.length) {
          if (words.length > 21) {
            buttons.push(
              <WordSelectionButton
                key={index}
                onClick={() => handleButtonClick(index)}
                isSelected = {selectedButtonIndices.includes(index)}
                style={{
                  width: '11vw',
                  height: '0.4vh',
                  fontSize: '1.6vw',
                  paddingTop: '1.6vh',
                  paddingBottom: '1.8vh',
                  paddingLeft: '0px',
                  paddingRight: '0px',
                  borderWidth: '0.5vh',
                  ...styles
                }}
              >
                {word}
              </WordSelectionButton>
            );
          } else {
            buttons.push(
              <WordSelectionButton
                key={index}
                onClick={() => handleButtonClick(index)}
                isSelected = {selectedButtonIndices.includes(index)}
                style={{
                  width: '18vw',
                  height: '10vh',
                  ...styles
                }}
              >
                {word}
              </WordSelectionButton>
            )
          }
        } else {
          buttons.push(
            <div>
            </div>
          );
        }
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

export default MultiWordSelectionContainer;