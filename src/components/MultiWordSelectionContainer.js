import React, { useEffect, useState } from 'react';
import './MultiWordSelectionContainer.css';
import WordSelectionButton from './WordSelectionButton';

const MultiWordSelectionContainer = ({ rows, columns, buttonDimensions, onClick, words, styledWords, pageNumber }) => {
  const [selectedButtonIndices, setSelectedButtonIndices] = useState([]);
  console.log(pageNumber);

  useEffect(() => {
    // Reset selected button index whenever the component is rendered
    console.log("resetting")
    setSelectedButtonIndices([]);
  }, [pageNumber]);

  const handleButtonClick = (index) => {
    console.log("clicked a word!")
    const indexIsSelected = selectedButtonIndices.includes(index);
    let updatedIndices;
    if (indexIsSelected) {
      updatedIndices = selectedButtonIndices.filter((i) => i !== index);
      setSelectedButtonIndices(updatedIndices);
      onClick(["-"]); // Pass null to parent component to signify deselection
    } else {
      console.log("we are setting the button index to be: ", index)
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
    gap:'5px',
    // margin: '0px',
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
        const index = i * columns + j;
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
        if(index < words.length){
          if(words.length > 21) {
            buttons.push(
              <WordSelectionButton
                key={index}
                onClick={() => handleButtonClick(index)}
                isSelected={selectedButtonIndices.includes(index)}
                className="multi-select-button"
                style={{
                  width: '100%', // Make the width relative to the container
                  height: '100%', // Make the height relative to the container
                  fontSize: '3.0vw', // Responsive font size
                  padding: '5%',
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
                isSelected={selectedButtonIndices.includes(index)}
                className="multi-select-button"
                style={{
                  width: '100%', // Make the width relative to the container
                  height: '100%', // Make the height relative to the container
                  fontSize: '3.0vw', // Responsive font size
                  paddingTop: '10%',
                  paddingBottom: '10%',
                  ...styles
                }}
              >
                {word}
              </WordSelectionButton>
            );
          }
        }
        else {
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
    <div className="multi-select-general-container">
      <div className="multi-selection-container-button" style={containerStyle}>
        {generateButtons()}
      </div>
    </div>
  );
};

export default MultiWordSelectionContainer;
