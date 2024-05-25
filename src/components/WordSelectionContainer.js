import React, { useState } from 'react';
import WordSelectionButton from './WordSelectionButton';
import './WordSelectionContainer.css';

const WordSelectionContainer = ({ rows, columns, buttonDimensions, onClick, words, styledWords, pageNumber }) => {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);

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

  // const containerStyle = {
  //   display: 'grid',
  //   gridTemplateColumns: `repeat(${columns}, auto)`, 
  //   gridTemplateRows: `repeat(${rows}, auto)`,
  //   gap: '5px',
  // };
  const longestWord = words.reduce((longest, current) => current.length > longest.length ? current : longest, "");
  console.log("longest word", longestWord);
  const longestWordWidth = longestWord.length;
  console.log("longest word width", longestWordWidth);

  // const containerStyle = {
  //   display: 'grid',
  //   gridTemplateColumns: `repeat(auto-fit, minmax(${longestWordWidth}px, 1fr))`,
  //   gridTemplateRows: `repeat(${rows}, auto)`,
  //   gap: '5px',
  // };

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, auto)`,
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
        if (words.length > 21) {
          buttons.push(
            <WordSelectionButton
              key={index}
              onClick={() => handleButtonClick(index)}
              isSelected={selectedButtonIndex === index}
              style={{
                width: longestWordWidth * 20 + 'px',
                height: '20px',
                fontSize: '22px',
                paddingTop: '12px',
                paddingBottom: '12px',
                paddingLeft: '0px',
                paddingRight: '0px',
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
              isSelected={selectedButtonIndex === index}
              style={{
                width: longestWordWidth * 35 + 'px',
                height: '50px',
                ...styles
              }}
            >
              {word}
            </WordSelectionButton>
          );
        }
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