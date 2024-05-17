// // import React, { useState, useEffect } from 'react';
// // import WordSelectionButton from './WordSelectionButton';
// // import './WordSelectionContainer.css';

// // const WordSelectionContainer = ({ rows, columns, buttonDimensions, onClick, words }) => {
// //   // console.log(selectedButtonIndex);
// //   const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);

// //   useEffect(() => {
// //     // Reset selected button index when new words are received
// //     setSelectedButtonIndex(null);
// //   });

// //   const handleButtonClick = (index) => {
// //     if (selectedButtonIndex === index) {
// //       // Deselect the button if it's already selected
// //       setSelectedButtonIndex(null);
// //       onClick(null); // Pass null to parent component to signify deselection
// //     } else {
// //       // Select the clicked button
// //       setSelectedButtonIndex(index);
// //       onClick(words[index]); // Pass the selected word to the parent component
// //     }
// //   };

// //   const containerStyle = {
// //     display: 'grid',
// //     gridTemplateColumns: `repeat(${columns}, 1fr)`,
// //     gridTemplateRows: `repeat(${rows}, auto)`,
// //     gap: '10px',
// //   };

// //   const generateButtons = () => {
// //     let buttons = [];
// //     for (let i = 0; i < rows * columns; i = i + parseInt(columns)) {
// //       for (let j = 0; j < columns; j++) {
// //         const index = i + j;
// //         let word = words[index];
// //         buttons.push(
// //           <WordSelectionButton
// //             key={index}
// //             onClick={() => handleButtonClick(index)}
// //             style={{
// //               width: buttonDimensions.width,
// //               height: buttonDimensions.height,
// //               backgroundColor: selectedButtonIndex === index ? 'blue' : 'white',
// //               color: selectedButtonIndex === index ? 'white' : 'black',
// //               // You can add any additional styles here
// //             }}
// //             isSelected={selectedButtonIndex === index}
// //             index = {index}
// //           >
// //             {word}
// //           </WordSelectionButton>
// //         );
// //       }
// //     }
// //     return buttons;
// //   };

// //   return (
// //     <div className="word-selection-container" style={containerStyle}>
// //       {generateButtons()}
// //     </div>
// //   );
// // };

// // export default WordSelectionContainer;



// import React, { useState, useEffect } from 'react';
// import WordSelectionButton from './WordSelectionButton';
// import './WordSelectionContainer.css';

// const WordSelectionContainer = ({ rows, columns, buttonDimensions, onClick, words, pageNumber}) => {
//   const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);
//   console.log(pageNumber);
//   useEffect(() => {
//     // Reset selected button index whenever the component is rendered
//     setSelectedButtonIndex(null);
//   }, [pageNumber]);

//   const handleButtonClick = (index) => {
//     if (selectedButtonIndex === index) {
//       // Deselect the button if it's already selected
//       setSelectedButtonIndex(null);
//       onClick(null); // Pass null to parent component to signify deselection
//     } else {
//       // Select the clicked button
//       setSelectedButtonIndex(index);
//       onClick(words[index]); // Pass the selected word to the parent component
//     }
//   };

//   const containerStyle = {
//     display: 'grid',
//     gridTemplateColumns: `repeat(${columns}, 1fr)`,
//     gridTemplateRows: `repeat(${rows}, auto)`,
//     gap: '10px',
//   };

//   const generateButtons = () => {
//     let buttons = [];
//     for (let i = 0; i < rows * columns; i = i + parseInt(columns)) {
//       for (let j = 0; j < columns; j++) {
//         const index = i + j;
//         let word = words[index];
//         buttons.push(
//           <WordSelectionButton
//             key={index}
//             onClick={() => handleButtonClick(index)}
//             style={{
//               width: buttonDimensions.width,
//               height: buttonDimensions.height,
//               backgroundColor: selectedButtonIndex === index ? 'blue' : 'white',
//               color: selectedButtonIndex === index ? 'white' : 'black',
//               // You can add any additional styles here
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

// export default WordSelectionContainer;



// import React, { useState, useEffect } from 'react';
// import WordSelectionButton from './WordSelectionButton';
// import './WordSelectionContainer.css';

// const WordSelectionContainer = ({ rows, columns, buttonDimensions, onClick, words }) => {
//   // console.log(selectedButtonIndex);
//   const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);

//   useEffect(() => {
//     // Reset selected button index when new words are received
//     setSelectedButtonIndex(null);
//   });

//   const handleButtonClick = (index) => {
//     if (selectedButtonIndex === index) {
//       // Deselect the button if it's already selected
//       setSelectedButtonIndex(null);
//       onClick(null); // Pass null to parent component to signify deselection
//     } else {
//       // Select the clicked button
//       setSelectedButtonIndex(index);
//       onClick(words[index]); // Pass the selected word to the parent component
//     }
//   };

//   const containerStyle = {
//     display: 'grid',
//     gridTemplateColumns: `repeat(${columns}, 1fr)`,
//     gridTemplateRows: `repeat(${rows}, auto)`,
//     gap: '10px',
//   };

//   const generateButtons = () => {
//     let buttons = [];
//     for (let i = 0; i < rows * columns; i = i + parseInt(columns)) {
//       for (let j = 0; j < columns; j++) {
//         const index = i + j;
//         let word = words[index];
//         buttons.push(
//           <WordSelectionButton
//             key={index}
//             onClick={() => handleButtonClick(index)}
//             style={{
//               width: buttonDimensions.width,
//               height: buttonDimensions.height,
//               backgroundColor: selectedButtonIndex === index ? 'blue' : 'white',
//               color: selectedButtonIndex === index ? 'white' : 'black',
//               // You can add any additional styles here
//             }}
//             isSelected={selectedButtonIndex === index}
//             index = {index}
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

// export default WordSelectionContainer;



import React, { useState, useEffect } from 'react';
import NumberSelectionButton from './NumberSelectionButton';
import './NumberSelectionContainer.css';

const NumberSelectionContainer = ({ rows, columns, buttonDimensions, onClick, words, pageNumber}) => {
  console.log("herenumber");
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
      if (updatedNumbers.length !== 5) {
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
            <div className = "selected-numbers">
                {selectedNumbers.split('').map((number, index) => (
                <span key={index} className="number">{number}</span>
                ))}
            </div>
            
            <div className = "underscores">_ _ _ _</div>
        </div>
      <div className="number-selection-container" style={containerStyle}>
        {generateButtons()}
      </div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
  
};

export default NumberSelectionContainer;