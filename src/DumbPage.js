// import React from 'react';
// import { Link } from 'react-router-dom';
// import './App.css';
// import WordSelectionContainer from './components/WordSelectionContainer';
// import Instruction from './components/Instruction';
// import NextButton from './components/NextButton';

// const Page = ({ content }) => {
//   const buttonDimensions = { width: '100px', height: '50px' };
//   const handleClick = (word) => {
//     console.log('Selected word:', word);
//   };
  
//   return (
//     <div>
//       <h1>Render Page</h1>
//       {/* Render page title if it exists */}
//       {content['Page Title'] && <h1>{content['Page Title']}</h1>}

//       {/* Render paragraph if it exists */}
//       {content['Prompt'] && <Instruction text={content['Prompt']} />}

//       {/* Render image if it exists */}
//       {content['Word Bank'] && 
//         (() => {
//           let s = content['Word Bank'];
//           s = s.replace(/\s+/g, '');
//           const words = s.substring(1, s.length-1).split(",");
//           return (
//             <WordSelectionContainer
//                 rows={content['Dimensions'].split("x")[0]}
//                 columns={content['Dimensions'].split("x")[1]}
//                 buttonDimensions={buttonDimensions}
//                 onClick={handleClick}
//                 words={words}
//                 pageNumber={content['Page Number']}
//             />
//           );
//         })()
//       }
//     </div>
//   );
// };

// export default Page;

import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import WordSelectionContainer from './components/WordSelectionContainer';
import Instruction from './components/Instruction';
import NextButton from './components/NextButton';
import NumberSelectionContainer from './components/NumberSelectionContainer'
import MoneyPadContainer from './components/MoneyPadContainer'
import MultiWordSelectionContainer from './components/MultiWordSelectionContainer';
const Page = ({ content, correctAnswer, to }) => {
  // console.log(content)
  // console.log(onSelectAnswer)
  const buttonDimensions = { width: '100px', height: '50px' };

  const [selectedAnswer, setSelectedAnswer] = React.useState(null);

  // Function to handle clicking on a word
  const handleClick = (word) => {
    console.log('Selected word:', word);
    // Pass the selected word to the parent component
    setSelectedAnswer(word);
    console.log("here, we selected", word)
    // debugger;
    // onSelectAnswer(word);
  };
  // const handleSelectAnswer = useCallback((selectedAnswer) => {
  //   setSelectedAnswer(selectedAnswer);
  //   console.log("here, we selected", selectedAnswer)
  //   debugger;
  // }, []);
  // debugger;
  return (
    <div>
      <h1>Render Page</h1>
      {/* Render page title if it exists */}
      {content['Page Title'] && <h1>{content['Page Title']}</h1>}

      {/* Render paragraph if it exists */}
      {content['Prompt'] && <Instruction text={content['Prompt']} />}

      {/* Render image if it exists */}
      {content['Type of Question'] === 'Word Selection' && 
        (() => {
          let s = content['Word Bank'];
          // s = s.replace(/\s+/g, '');
          let words = s.substring(1, s.length-1).split(",");
          words = words.map(str => str.trim());

          return (
            <WordSelectionContainer
                rows={content['Dimensions'].split("x")[0]}
                columns={content['Dimensions'].split("x")[1]}
                buttonDimensions={buttonDimensions}
                onClick={handleClick}
                words={words}
                pageNumber={content['Page Number']}
            />
          );
        })()
      }
      {content['Type of Question'] === 'Multi Word Selection' && 
        (() => {
          let s = content['Word Bank'];
          // s = s.replace(/\s+/g, '');
          let words = s.substring(1, s.length-1).split(",");
          words = words.map(str => str.trim());

          return (
            <MultiWordSelectionContainer
                rows={content['Dimensions'].split("x")[0]}
                columns={content['Dimensions'].split("x")[1]}
                buttonDimensions={buttonDimensions}
                onClick={handleClick}
                words={words}
                pageNumber={content['Page Number']}
            />
          );
        })()
      }
      {content['Type of Question'] === 'Number Pad' &&
        (() => {
          let s = content['Number Sequence'];
          // s = s.replace(/\s+/g, '');
          // const words = s.substring(1, s.length-1).split(",");
          let words = s.substring(1, s.length-1).split(",");
          words = words.map(str => str.trim());

          console.log(words)
          return (
            <NumberSelectionContainer
              rows={content['Dimensions'].split("x")[0]}
              columns={content['Dimensions'].split("x")[1]}
              buttonDimensions={buttonDimensions}
              onClick={handleClick}
              words={words}
              pageNumber={content['Page Number']}
            />
          );
        })()

      }
      {content['Type of Question'] === 'Money Number Pad' &&
        (() => {
          let s = content['Number Sequence'];
          // s = s.replace(/\s+/g, '');
          // const words = s.substring(1, s.length-1).split(",");
          let words = s.substring(1, s.length-1).split(",");
          words = words.map(str => str.trim());
          console.log(words)
          return (
            <MoneyPadContainer
              rows={content['Dimensions'].split("x")[0]}
              columns={content['Dimensions'].split("x")[1]}
              buttonDimensions={buttonDimensions}
              onClick={handleClick}
              words={words}
              pageNumber={content['Page Number']}
            />
          );
        })()

      }
      <NextButton
          to={to}
          correctAnswer={correctAnswer}
          selectedAnswer={selectedAnswer}
          pageNumber = {content['Page Number']}
        >
          NEXT
      </NextButton>
    </div>
  );
};

export default Page;