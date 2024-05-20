import React from 'react';
import './App.css';
import ImageSelection from './components/ImageSelection';
import Instruction from './components/Instruction';
import InstructionContainer from './components/InstructionContainer';
import MoneyPadContainer from './components/MoneyPadContainer';
import MultiWordSelectionContainer from './components/MultiWordSelectionContainer';
import NextButton from './components/NextButton';
import NumberSelectionContainer from './components/NumberSelectionContainer';
import StroopTextBox from './components/StroopTextBox';
import WordSelectionContainer from './components/WordSelectionContainer';

const Page = ({ content, correctAnswer, to }) => {
  const buttonDimensions = { width: '100px', height: '50px' };

  const [selectedAnswer, setSelectedAnswer] = React.useState("-");
  const [error, setError] = React.useState(false);

  // Function to handle clicking on a word
  const handleClick = (word) => {
    console.log('Selected word:', word);
    // Pass the selected word to the parent component
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
          // Extract prompts based on keys
          const prompts = Object.keys(content)
            .filter(key => key.startsWith('Prompt'))
            .map(key => content[key]);

          return (
            <InstructionContainer instructions={prompts} />
          );
        })()
      }

      {content['Type of Question'] === 'Word Selection' && 
        (() => {
          let s = content['Word Bank'];
          let words = s.substring(1, s.length-1).split(",");
          words = words.map(str => str.trim());

          return (
            <div>
                <WordSelectionContainer
                    rows={content['Dimensions'].split("x")[0]}
                    columns={content['Dimensions'].split("x")[1]}
                    onClick={handleClick}
                    words={words}
                    pageNumber={content['Page Number']}
                />
            </div>
          );
        })()
      }
      {content['Type of Question'] === 'Multi Word Selection' && 
        (() => {
          let s = content['Word Bank'];
          let words = s.substring(1, s.length-1).split(",");
          words = words.map(str => str.trim());

          return (
            <div>
              <MultiWordSelectionContainer
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
                  maxWidth: '100%',  /* Ensure the image fits within the container */
                  maxHeight: '100%', 
                  paddingBottom: '20px',
                }} 
              />
              <ImageSelection 
                images={filePaths} 
                rows={content['Dimensions'].split("x")[0]}
                cols={content['Dimensions'].split("x")[1]}
              />
            </div>
          );
        })()
      }
    <div className = "next-flex">
      <NextButton
          to={to}
          correctAnswer={correctAnswer}
          selectedAnswer={selectedAnswer}
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