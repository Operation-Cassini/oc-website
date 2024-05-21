import { default as React, useEffect } from 'react';
import './App.css';
import ConnectTheBoxes from './components/ConnectTheBoxes';
import FlashTextBoxes from './components/FlashTextBox';
import ImageSelection from './components/ImageSelection';
import Instruction from './components/Instruction';
import InstructionContainer from './components/InstructionContainer';
import MoneyPadContainer from './components/MoneyPadContainer';
import MultiWordSelectionContainer from './components/MultiWordSelectionContainer';
import NextButton from './components/NextButton';
import NumberSelectionContainer from './components/NumberSelectionContainer';
import StroopTextBox from './components/StroopTextBox';
import WordSelectionContainer from './components/WordSelectionContainer';

const Page = ({ content, correctAnswer, correctRequirement, to }) => {
  const buttonDimensions = { width: '100px', height: '50px' };

  const [selectedAnswer, setSelectedAnswer] = React.useState("-");
  const [error, setError] = React.useState(false);
  const [realAttempt, setRealAttempt] = React.useState(false);
  useEffect(() => {
    // Reset selected button index whenever the component is rendered
    console.log("resetting real attempt");
    setRealAttempt(false);
  }, [content['Page Number']]);

  const handleClick = (word) => {
    console.log('Selected word:', word);
    // Pass the selected word to the parent component
    if ((content['Type of Question'] === 'Word Selection') && correctRequirement === '-') {
      if(word !== "-") {
        setRealAttempt(true);
        console.log("realattempt setting to true");
      }
      else {
        setRealAttempt(false);
        console.log("realattempt setting to false");
      }
    }
    if (content['Type of Question'] === 'Multi Word Selection' && correctRequirement === '-') {
      const correctAnswers = correctAnswer.split(',').map(word => word.trim());
      console.log("new correct answer is", correctAnswers);
        // Sort both arrays to ensure the order doesn't matter
      const sortedCorrectAnswers = correctAnswers.sort();
      const sortedSelectedWords = word.sort();

      console.log("sorted correct answer", sortedCorrectAnswers);
      console.log("sorted selected answer", sortedSelectedWords);
      // Check if both arrays are equal

      if(word.length === correctAnswers.length) {
        setRealAttempt(true);
        console.log("real attempt setting to true");
      }
      else {
        setRealAttempt(false);
        console.log("real attempt setting to false");
      }
    // }

    }
    if ((content['Type of Question'] === 'Number Pad' || content['Type of Question'] === 'Money Number Pad') && correctRequirement === '-') {
      if(word.length === correctAnswer.length) {
        setRealAttempt(true);
        console.log("real attempt setting to true");
      }
      else {
        setRealAttempt(false);
        console.log("real attempt setting to false");
      }
    }
    setSelectedAnswer(word);
    setError(false);
  };
  return (
    <div>
      {/* <h1>Render Page</h1> */}
      {/* Render page title if it exists */}
      {/* {content['Page Title'] && <h1>{content['Page Title']}</h1>} */}

      {/* Render paragraph if it exists */}
      {content['Prompt'] && <Instruction text={content['Prompt']} className="instruction-box" />}


      {content['Type of Question'] === 'Instruction' && 
        (() => {
          console.log("the content is", content);
          // Extract prompts based on keys
          const prompts = Object.keys(content)
            .filter(key => key.startsWith('Prompt'))
            .map(key => content[key]);
          console.log("the prompts are", prompts);
          return (
            <InstructionContainer instructions={prompts}/>
          );
        })()
      }

      {content['Type of Question'] === 'Word Selection' && 
        (() => {
          let s = content['Word Bank'];
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
      {content['Type of Question'] === 'STROOP' &&
        (() => {
          console.log(content['Word Color']);
          console.log(content['Word']);
          let s = content['Word Bank'];
          let words = s.substring(1, s.length-1).split(",");
          words = words.map(str => str.trim());
          console.log("words: ", words);
          return (
            <div>
              <StroopTextBox textColor={content['Word Color']}>{content['Word']}</StroopTextBox>
              <WordSelectionContainer
                  rows={content['Dimensions'].split("x")[0]}
                  columns={content['Dimensions'].split("x")[1]}
                  buttonDimensions={buttonDimensions}
                  onClick={handleClick}
                  words={words}
                  pageNumber={content['Page Number']}
              />
            </div>
            
          );
        })()

      }
      {content['Type of Question'] === 'Image Selection' &&
        (() => {
          let s = content['File Path'];
          let filePaths = s.substring(1, s.length - 1).split(",");
          filePaths = filePaths.map(str => str.trim());

          return (
            <div>
              <img 
                src={content['Answer Img']} 
                alt="Answer Image" 
                style={{
                  display: 'block',  /* Make the image a block element to apply margin */
                  margin: 'auto',    /* Center horizontally */
                  marginTop: 'auto', /* Center vertically */
                  marginBottom: 'auto',
                  maxWidth: '220px',  /* Ensure the image fits within the container */
                  maxHeight: 'auto', 
                  paddingBottom: '20px',
                }} 
              />
              <ImageSelection 
                images={filePaths} 
                rows={content['Dimensions'].split("x")[0]}
                cols={content['Dimensions'].split("x")[1]}
                pageNumber={content['Page Number']}
              />
            </div>
          );
        })()
      }
      {content['Type of Question'] === 'Flashing Words' &&
        (() => {
          console.log("reading");
          let s = content['Words'];
          console.log("words: ", s);
          let words = s.substring(1, s.length-1).split(",");
          console.log("substring");
          words = words.map(str => str.trim());
          console.log("word final: ", words);
          return (
            <div>
              <FlashTextBoxes texts={words}/>
            </div>

          );
        })()

      }
      {content['Type of Question'] === 'Connect the Box' &&
        (() => {
          const s = content['Characters'];
          const positionsString = content['Position'];
          console.log("print positions string: ", positionsString);
          let characters = s.substring(1, s.length - 1).split(',').map(str => str.trim());
          console.log("characters: ", characters);
          let positions = positionsString.substring(1, positionsString.length - 1)
            .split('), (')
            .map(pos => {
              const [x, y] = pos.replace(/[()]/g, '').split(',').map(Number);
              return { x, y };
            });

            console.log("position: ", positions);
          return (
            <div>
              <ConnectTheBoxes characters={characters} positions={positions} pageNumber={content['Page Number']}/>
            </div>

          );
        })()

      }
    <div className = "next-flex">
      <NextButton
          to={to}
          correctAnswer={correctAnswer}
          selectedAnswer={selectedAnswer}
          realAttempt={realAttempt}
          errorMessage={content['Error Pop Ups'] ? content['Error Pop Ups'] : ""}
          error={error}
          setError={setError}
          pageNumber = {content['Page Number']}
        >
          NEXT
      </NextButton>
    </div>
    </div>
  );
};

export default Page;