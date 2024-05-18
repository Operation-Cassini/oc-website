// import React, { useState, useEffect } from 'react';
// import WordSelectionButton from './WordSelectionButton';
// import './MultiWordSelectionContainer.css';

// const MultiWordSelectionContainer = ({ rows, columns, buttonDimensions, onClick, words, pageNumber}) => {
//   const [selectedButtonIndices, setSelectedButtonIndices] = useState([]);
//   console.log(pageNumber);
//   useEffect(() => {
//     // Reset selected button index whenever the component is rendered
//     console.log("resetting")
//     setSelectedButtonIndices([]);
//   }, [pageNumber]);

//   const handleButtonClick = (index) => {
//     console.log("clicked a word!")
//     const indexIsSelected = selectedButtonIndices.includes(index);
//     let updatedIndices;
//     if (indexIsSelected) {
//         updatedIndices = selectedButtonIndices.filter((i) => i !== index);
//         setSelectedButtonIndices(updatedIndices);
//         onClick(null); // Pass null to parent component to signify deselection
//       // debugger;
//     } else {

//       console.log("we are setting the button index to be: ", index)
//       updatedIndices = [...selectedButtonIndices, index];
    
//       setSelectedButtonIndices(updatedIndices);
//     }

//     const selectedWords = updatedIndices.map((selectedIndex) => words[selectedIndex]);
//     // Pass the selected words to the parent component
    
//     onClick(selectedWords);
    
//   };
//   const containerStyle = {
//     display: 'grid',
//     gridTemplateColumns: `repeat(${columns}, 1fr)`,
//     gridTemplateRows: `repeat(${rows}, auto)`,
//     gap: '10px',
//   };

//   const generateButtons = () => {
//     let buttons = [];
//     for (let i = 0; i < rows; i++) {
//       for (let j = 0; j < columns; j++) {
//         const index = i + j*rows;
//         let word = words[index];
//         buttons.push(
//           <WordSelectionButton
//             key={index}
//             onClick={() => handleButtonClick(index)}
//             isSelected = {selectedButtonIndices.includes(index)}
//             style={{
//               width: buttonDimensions.width,
//               height: buttonDimensions.height
//             }}
//           >
//             {word}
//           </WordSelectionButton>
//         );
//       }
//     }
//     return buttons;
//   };

//   return (
//     <div className="word-selection-container" style={containerStyle}>
//       {generateButtons()}
//     </div>
//   );
// };

// export default MultiWordSelectionContainer;

import React, { useState, useEffect } from 'react';
import WordSelectionButton from './WordSelectionButton';
import './MultiWordSelectionContainer.css';

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
    <div className="word-selection-container" style={containerStyle}>
      {generateButtons()}
    </div>
  );
};

export default MultiWordSelectionContainer;
