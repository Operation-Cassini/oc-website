import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import WordSelectionContainer from './components/WordSelectionContainer';
import Instruction from './components/Instruction';
import NextButton from './components/NextButton';
import NumberSelectionContainer from './components/NumberSelectionContainer'
const Page = ({ content, correctAnswer, to }) => {
  const buttonDimensions = { width: '100px', height: '50px' };

  const [selectedAnswer, setSelectedAnswer] = React.useState(null);

  // Function to handle clicking on a word
  const handleClick = (word) => {
    // Pass the selected word to the parent component
    setSelectedAnswer(word);
  };
  return (
    <div>
      <h1>Render Page</h1>
      {/* Render page title if it exists */}
      {content['Page Title'] && <h1>{content['Page Title']}</h1>}

      {/* Render paragraph if it exists */}
      {content['Prompt'] && <Instruction text={content['Prompt']} />}

      {/* Render image if it exists */}
      {content['Word Bank'] && 
        (() => {
          let s = content['Word Bank'];
          s = s.replace(/\s+/g, '');
          const words = s.substring(1, s.length-1).split(",");
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
      {content['Number Sequence'] &&
        (() => {
          let s = content['Number Sequence'];
          s = s.replace(/\s+/g, '');
          const words = s.substring(1, s.length-1).split(",");
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
      <NextButton
          to={to}
          correctAnswer={correctAnswer}
          selectedAnswer={selectedAnswer}
        >
          NEXT
      </NextButton>
    </div>
  );
};

export default Page;