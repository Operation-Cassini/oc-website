import React, { useEffect, useState } from 'react';
import './MultiWordSelectionContainer.css';
import WordSelectionButton from './WordSelectionButton';

const MultiWordSelectionContainer = ({ rows, columns, buttonDimensions, onClick, words, pageNumber }) => {
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

  const generateButtons = () => {
    let buttons = [];
    for (let i = 0; i < rows * columns; i++) {
      let word = words[i] || ''; // Get the word for the current button
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
              width: '120px',
              height: '50px',
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
    <div className="multi-selection-container" style={containerStyle}>
      {generateButtons()}
    </div>
  );
};

export default MultiWordSelectionContainer;
