import React, { useState, useEffect } from 'react';
import NumberSelectionButton from './NumberSelectionButton';
import './MoneyPadContainer.css';

const MoneyPadContainer = ({ rows, columns, buttonDimensions, onClick, words, pageNumber}) => {
    console.log("heremoney");
  // debugger;
//   const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);
  const [selectedNumbers, setSelectedNumbers] = useState('');

  // debugger;
  console.log(pageNumber);
  useEffect(() => {
    // Reset selected button index whenever the component is rendered
    console.log("resetting")
    setSelectedNumbers('');
    // debugger;
  }, [pageNumber]);
  const handleDelete = () => {
    console.log("here!")
    if (selectedNumbers.length > 0) {
        const updatedNumbers = selectedNumbers.slice(0, selectedNumbers.length - 1);
        console.log(updatedNumbers);
        setSelectedNumbers(updatedNumbers);
      }
  };
  const handleButtonClick = (index) => {
    // console.log("clicked a word!")
    // console.log(selectedNumbers, index)
    // if (selectedButtonIndex === index) {
    //   // Deselect the button if it's already selected
    //   onClick(null); // Pass null to parent component to signify deselection
    //   setSelectedButtonIndex(null);
    //   // debugger;
    // } else {
    //   console.log(words)
      const selectedNumber = words[index];
      console.log(selectedNumber);

      const updatedNumbers = selectedNumbers + selectedNumber;
      console.log(updatedNumbers);
      if (updatedNumbers.length !== 3) {
        setSelectedNumbers(updatedNumbers);
        onClick(updatedNumbers);
      }

    //   setSelectedNumbers(updatedNumbers);
    //   console.log("we are setting the button index to be: ", index)
      // Select the clicked button
    //   onClick(updatedNumbers); // Pass the selected word to the parent component
    //   setSelectedNumbers(index);
      // debugger;
    // }
  };
  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, auto)`,
    gap: '10px',
  };

  const generateButtons = () => {
    let buttons = [];
    for (let i = 0; i < rows * columns; i = i + parseInt(columns)) {
      for (let j = 0; j < columns; j++) {
        const index = i + j;
        let word = words[index];
        buttons.push(
          <NumberSelectionButton
            key={index}
            onClick={() => handleButtonClick(index)}
            style={{
              width: buttonDimensions.width,
              height: buttonDimensions.height
            //   backgroundColor: selectedButtonIndex === index ? 'blue' : 'white',
            //   color: selectedButtonIndex === index ? 'white' : 'black',
              // You can add any additional styles here
            }}
          >
            {word}
          </NumberSelectionButton>
        );
      }
    }
    return buttons;
  };

  return (
    <div>
        <div className="number-line">
            <div className = "selected-numbers">$
                {selectedNumbers.split('').map((number, index) => (
                <span key={index} className="number-money">{number}</span>
                ))}
            </div>
            
            <div className = "underscores-money">_ _</div>
        </div>
      <div className="number-selection-container" style={containerStyle}>
        {generateButtons()}
      </div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
  
};

export default MoneyPadContainer;