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

  const [lastClickTime, setLastClickTime] = React.useState(Date.now());

  useEffect(() => {
    // Reset selected button index whenever the component is rendered
    console.log("resetting real attempt");
    setRealAttempt(false);
  }, [content['Page Number']]);
  
  const timerHandler = () => {
    const currentTime = Date.now();
    if (lastClickTime !== null) {
      const timeDifference = currentTime - lastClickTime;
      console.log(`Time between clicks: ${timeDifference} ms`);
    }
    setLastClickTime(currentTime);
  }

  const handleClick = (word) => {
    timerHandler();
    console.log('Selected word:', word);
    // Pass the selected word to the parent component
    if ((content['Type of Question'][0]['content'] === 'Word Selection') && correctRequirement === '-') {
      if(word !== "-") {
        setRealAttempt(true);
        console.log("realattempt setting to true");
      }
      else {
        setRealAttempt(false);
        console.log("realattempt setting to false");
      }
    }
    if ((content['Type of Question'][0]['content'] === 'Multi Word Selection' || content['Type of Question'][0]['content'] === 'Image Selection') && correctRequirement === '-') {
      const correctAnswers = correctAnswer.split(',').map(word => word.trim());
      console.log("new correct answer is", correctAnswers);
        // Sort both arrays to ensure the order doesn't matter
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
    if ((content['Type of Question'][0]['content'] === 'Number Pad' || content['Type of Question'][0]['content'] === 'Money Number Pad') && correctRequirement === '-') {
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

  function renderStyledContent(content) {
    if (!content || content.length === 0) return null;
  
    return content.map((part, index) => {
      const styleMap = {
        underline: { textDecoration: 'underline' },
        italic: { fontStyle: 'italic' },
        red: { color: 'red' },
        green: { color: 'green' },
        blue: { color: 'blue' }
      };
  
      const styles = part.style ? part.style.split(' ').map(s => styleMap[s]).reduce((acc, cur) => ({ ...acc, ...cur }), {}) : {};
  
      return (
        <span key={index} style={styles}>
          {Array.isArray(part.content) ? renderStyledContent(part.content) : part.content}
        </span>
      );
    });
  }

  const splitErrorMessages = (errorMessage) => {
    // Initialize an array to store individual error messages
    const errorMessages = [];
    // Initialize a variable to store the current error message
    let currentErrorMessage = [];
    errorMessages.push(errorMessage[0].content);
    // Iterate through each part of the errorMessage
    errorMessage.forEach((part) => {
      // Check if the part is a boundary marker
      if (part.boundary === 'start') {
        // Start of a new error message, reset the currentErrorMessage array
        currentErrorMessage = [];
      } else if (part.boundary === 'end') {
        // End of the current error message, push it to the errorMessages array
        errorMessages.push(currentErrorMessage);
      } else {
        // Regular error message part, add it to the currentErrorMessage array
        currentErrorMessage.push(part);
      }
    });
  
    return errorMessages;
  };

  function flattenContent(content) {
    if (!Array.isArray(content)) {
      return content;
    }
  
    return content.map(part => {
      if (Array.isArray(part.content)) {
        return flattenContent(part.content);
      }
      return part.content;
    }).join('');
  }


  function flatteningContent(content) {
    // Check if content is an array
    if (Array.isArray(content)) {
      // Initialize an empty string to store the flattened content
      let flattenedContent = '';
  
      // Iterate over each element in the content array
      content.forEach(element => {
        // Check if the element has a content property
        if (element.content) {
          // If it does, recursively flatten its content
          flattenedContent += flatteningContent(element.content);
        } else {
          // If not, directly concatenate the element (in case it's a plain string)
          flattenedContent += element;
        }
      });
  
      // Return the flattened content
      return flattenedContent;
    } else {
      // If content is not an array, return it as is
      return content;
    }
  }
  function flattenStyles(word) {
    let styles = [];
  
    function extractStyles(part) {
      if (Array.isArray(part.content)) {
        part.content.forEach(innerPart => {
          extractStyles(innerPart);
        });
      }
      if (part.style) {
        styles.push(part.style);
      }
    }
  
    extractStyles(word);
  
    return styles;
  }
  let wordBank = flattenContent(content['Word Bank']);
  let wordsFlash = flattenContent(content['Words']);
  let numberSequence = flattenContent(content['Number Sequence'])

  let errorMessageArray = splitErrorMessages(content['Error Pop Ups']);
  const renderedErrorMessages = [];
  errorMessageArray.forEach((error, index) => {
    // Skip rendering the first element if it contains the count of elements
    if (index !== 0) {
      const renderedError = renderStyledContent(error);
      renderedErrorMessages.push(renderedError);
      console.log("Rendered error message:", renderedError);
    }
    else {
      renderedErrorMessages.push(error);
    }
  });
  console.log("the rendered error messages are", renderedErrorMessages);
  // console.log("error MEssage array!!", errorMessageArray);
  // console.log("rendered style content of error pop ups", renderStyledContent(content['Error Pop Ups']));
  return (
    <div>
      {/* <h1>Render Page</h1> */}
      {/* Render page title if it exists */}
      {/* {renderStyledContent(content['Page Title']) && <h1>{renderStyledContent(content['Page Title'])}</h1>} */}

      {/* Render paragraph if it exists */}
      {renderStyledContent(content['Prompt']) && <Instruction text={renderStyledContent(content['Prompt'])} className = "instruction-box" />}

      {content['Type of Question'][0]['content'] === 'Instruction' && 
        (() => {
          // Extract prompts based on keys
          const prompts = Object.keys(content)
          .filter(key => key.startsWith('Prompt'))
          .map(key => content[key]);
          return (
            <><div className="top-padding"></div>
            <InstructionContainer instructions={prompts} /></>
          );
        })()
      }

      {content['Type of Question'][0]['content'] === 'Word Selection' && 
        (() => {
          let s = wordBank
          let words = s.substring(1, s.length-1).split(",");
          words = words.map(str => str.trim());
          let styledWords = content['Word Bank'].filter(word => word.style);
          let styledWordsWithStyle = styledWords.map(word => {
            return {
              content: flatteningContent(word.content),
              style: flattenStyles(word)
            };
          });
          return (
            <WordSelectionContainer
              rows={content['Dimensions'][0]['content'].split("x")[0]}
              columns={content['Dimensions'][0]['content'].split("x")[1]}
              buttonDimensions={buttonDimensions}
              onClick={handleClick}
              words={words}
              styledWords={styledWordsWithStyle}
              pageNumber={content['Page Number'][0]['content']}
            />
          );
        })()
      }
      {content['Type of Question'][0]['content'] === 'Multi Word Selection' && 
        (() => {
          console.log(content['Error Pop Ups']);
          let s = wordBank
          let words = s.substring(1, s.length-1).split(",");
          words = words.map(str => str.trim());
          let styledWords = content['Word Bank'].filter(word => word.style);
          let styledWordsWithStyle = styledWords.map(word => {
            return {
              content: flatteningContent(word.content),
              style: flattenStyles(word)
            };
          });

          return (
            <MultiWordSelectionContainer
              rows={content['Dimensions'][0]['content'].split("x")[0]}
              columns={content['Dimensions'][0]['content'].split("x")[1]}
              buttonDimensions={buttonDimensions}
              onClick={handleClick}
              words={words}
              styledWords={styledWordsWithStyle}
              pageNumber={content['Page Number'][0]['content']}
            />
          );
        })()
      }
      {content['Type of Question'][0]['content'] === 'Number Pad' &&
        (() => {
          let s = numberSequence
          let words = s.substring(1, s.length-1).split(",");
          words = words.map(str => str.trim());
          let styledWords = content['Number Sequence'].filter(word => word.style);
          let styledWordsWithStyle = styledWords.map(word => {
            return {
              content: flatteningContent(word.content),
              style: flattenStyles(word)
            };
          });

          return (
            <NumberSelectionContainer
              rows={content['Dimensions'][0]['content'].split("x")[0]}
              columns={content['Dimensions'][0]['content'].split("x")[1]}
              buttonDimensions={buttonDimensions}
              onClick={handleClick}
              timeHandler={timerHandler}
              words={words}
              styledWords={styledWordsWithStyle}
              pageNumber={content['Page Number'][0]['content']}
            />
          );
        })()

      }
      {content['Type of Question'][0]['content'] === 'Money Number Pad' &&
        (() => {
          let s = numberSequence
          let words = s.substring(1, s.length-1).split(",");
          words = words.map(str => str.trim());
          let styledWords = content['Number Sequence'].filter(word => word.style);
          let styledWordsWithStyle = styledWords.map(word => {
            return {
              content: flatteningContent(word.content),
              style: flattenStyles(word)
            };
          });

          return (
            <MoneyPadContainer
              rows={content['Dimensions'][0]['content'].split("x")[0]}
              columns={content['Dimensions'][0]['content'].split("x")[1]}
              buttonDimensions={buttonDimensions}
              onClick={handleClick}
              timeHandler={timerHandler}
              words={words}
              styledWords={styledWordsWithStyle}
              pageNumber={content['Page Number'][0]['content']}
            />
          );
        })()

      }
      {content['Type of Question'][0]['content'] === 'Image Selection' &&
        (() => {
          let s = content['File Path'][0]['content'];
          let filePaths = s.substring(1, s.length - 1).split(",");
          filePaths = filePaths.map(str => str.trim());

          return (
            <div>
              <img 
                src={content['Answer Img'][0]['content']} 
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
                rows={content['Dimensions'][0]['content'].split("x")[0]}
                cols={content['Dimensions'][0]['content'].split("x")[1]}
                onClick={handleClick}
                pageNumber={content['Page Number'][0]['content']}
              />
            </div>
          );
        })()
      }
      {content['Type of Question'][0]['content'] === 'STROOP' &&
        (() => {
          let s = wordBank;
          let words = s.substring(1, s.length-1).split(",");
          words = words.map(str => str.trim());
          let styledWords = content['Word Bank'].filter(word => word.style);
          let styledWordsWithStyle = styledWords.map(word => {
            return {
              content: flatteningContent(word.content),
              style: flattenStyles(word)
            };
          });

          return (
            <div>
              <StroopTextBox text = {renderStyledContent(content['Word'])}></StroopTextBox>
              <WordSelectionContainer
                rows={content['Dimensions'][0]['content'].split("x")[0]}
                columns={content['Dimensions'][0]['content'].split("x")[1]}
                buttonDimensions={buttonDimensions}
                onClick={handleClick}
                words={words}
                styledWords={styledWordsWithStyle}
                pageNumber={content['Page Number'][0]['content']}
              />
            </div>
            
          );
        })()
      }
      {content['Type of Question'][0]['content'] === 'Flashing Words' &&
        (() => {
          let s = wordsFlash;
          let words = s.substring(1, s.length-1).split(",");
          words = words.map(str => str.trim());
          console.log(content['Page Number'][0]['content']);
          return (
            <div>
              <FlashTextBoxes texts={words} nextPage={content['Page Number'][0]['content']}/>
            </div>

          );
        })()

      }

      {content['Type of Question'][0]['content'] === 'Connect the Box' &&
        (() => {
          const prompts = Object.keys(content)
          .filter(key => key.startsWith('Prompt'))
          .map(key => content[key]);
          const s = content['Characters'][0]['content'];
          const positionsString = content['Position'][0]['content'];
          let characters = s.substring(1, s.length - 1).split(',').map(str => str.trim());
          let positions = positionsString.substring(1, positionsString.length - 1)
            .split('), (')
            .map(pos => {
              const [x, y] = pos.replace(/[()]/g, '').split(',').map(Number);
              return { x, y };
            });

          return (
            <><InstructionContainer instructions={prompts} />
            <ConnectTheBoxes characters={characters} positions={positions} pageNumber={content['Page Number'][0]['content']}/></>
            
          );
        })()

      }
      {content['Type of Question'][0]['content'] !== 'Flashing Words' &&
        (() => (
          <div className="next-flex">
            <NextButton
              to={to}
              correctAnswer={correctAnswer}
              selectedAnswer={selectedAnswer}
              timeHandler={timerHandler}
              realAttempt={realAttempt}
              errorMessage={content['Error Pop Ups'] ? renderedErrorMessages : ""}
              error={error}
              setError={setError}
              pageNumber={content['Page Number'][0]['content']}
            >
              NEXT
            </NextButton>
          </div>
        ))()
      }
    </div>
  );
};

export default Page;