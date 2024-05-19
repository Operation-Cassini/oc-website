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
    gap: '10px',
  };

  const generateButtons = () => {
    let buttons = [];
    for (let i = 0; i < rows * columns; i++) {
      let word = words[i] || ''; // Get the word for the current button
      buttons.push(
        <WordSelectionButton
            key={i}
            onClick={() => handleButtonClick(i)}
            isSelected={selectedButtonIndices.includes(i)}
            style={{
              width: '100px',
              height: '50px',
              flexBasis: `calc(100% / ${columns} - 10px)`, // Adjust the width of each button
            }}
          >
            {word}
          </WordSelectionButton>
      );
    }
    // for (let i = 0; i < rows; i++) {
    //   for (let j = 0; j < columns; j++) {
    //     const index = i * columns + j;
    //     let word = words[index];
    //     buttons.push(
    //       <WordSelectionButton
    //         key={index}
    //         onClick={() => handleButtonClick(index)}
    //         isSelected={selectedButtonIndices.includes(index)}
    //         style={{
    //           width: '100px',
    //           height: '50px',
    //         }}
    //       >
    //         {word}
    //       </WordSelectionButton>
    //     );
    //   }
    // }
    return buttons;
  };

  return (
    <div className="multi-selection-container" style={containerStyle}>
      {generateButtons()}
    </div>
  );
};

export default MultiWordSelectionContainer;
