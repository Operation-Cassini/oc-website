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
import WordSelectionButton from './WordSelectionButton';
import './MultiWordSelectionContainer.css';

const MultiWordSelectionContainer = ({ rows, columns, buttonDimensions, onClick, words, pageNumber}) => {
  // debugger;
  const [selectedButtonIndices, setSelectedButtonIndices] = useState([]);
  // debugger;
  console.log(pageNumber);
  useEffect(() => {
    // Reset selected button index whenever the component is rendered
    console.log("resetting")
    setSelectedButtonIndices([]);
    // debugger;
  }, [pageNumber]);

  const handleButtonClick = (index) => {
    console.log("clicked a word!")
    // console.log(selectedButtonIndex, index)
    const indexIsSelected = selectedButtonIndices.includes(index);
    let updatedIndices;
    if (indexIsSelected) {
      // Deselect the button if it's already selected
    //   onClick(null); // Pass null to parent component to signify deselection
    //   setSelectedButtonIndex(null);
        updatedIndices = selectedButtonIndices.filter((i) => i !== index);
        setSelectedButtonIndices(updatedIndices);
        onClick(null); // Pass null to parent component to signify deselection
      // debugger;
    } else {

      console.log("we are setting the button index to be: ", index)
      // Select the clicked button
    //   onClick(words[index]); // Pass the selected word to the parent component
    //   setSelectedButtonIndex(index);
    updatedIndices = [...selectedButtonIndices, index];
    
    setSelectedButtonIndices(updatedIndices);

    console.log("abccc")
    console.log(selectedButtonIndices);
      // debugger;
    }

    const selectedWords = updatedIndices.map((selectedIndex) => words[selectedIndex]);
    // Pass the selected words to the parent component
    
    onClick(selectedWords);
    
  };
  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, auto)`,
    gap: '10px',
  };

  const generateButtons = () => {
    let buttons = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const index = i + j*rows;
        // if (selectedButtonIndex === index) {
        //   console.log("They are equal");
        // }
        let word = words[index];
        buttons.push(
          <WordSelectionButton
            key={index}
            onClick={() => handleButtonClick(index)}
            isSelected = {selectedButtonIndices.includes(index)}
            style={{
              width: buttonDimensions.width,
              height: buttonDimensions.height,
            //   backgroundColor: selectedButtonIndex === index ? 'blue' : 'white',
            //   color: selectedButtonIndex === index ? 'white' : 'black',
            //   // You can add any additional styles here
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
    <div className="word-selection-container" style={containerStyle}>
      {generateButtons()}
    </div>
  );
};

export default MultiWordSelectionContainer;