import { default as React, useEffect, useRef } from 'react';
import './App.css';
import ConnectTheBoxes from './components/ConnectTheBoxes';
import FlashTextBoxes from './components/FlashTextBox';
import ImageSelection from './components/ImageSelection';
import ImageSelectionSingle from './components/ImageSelectionSingle';
import Instruction from './components/Instruction';
import InstructionContainer from './components/InstructionContainer';
import MoneyPadContainer from './components/MoneyPadContainer';
import MultiWordSelectionContainer from './components/MultiWordSelectionContainer';
import NextButton from './components/NextButton';
import NumberSelectionContainer from './components/NumberSelectionContainer';
import StroopTextBox from './components/StroopTextBox';
import TabcodeGenerator from './components/TabcodeGenerator';
import WordSelectionContainer from './components/WordSelectionContainer';
import { useTranslation } from 'react-i18next';

const Page = ({ tabCode, content, correctAnswer, correctRequirement, onAnswerChecked, handleTotalMoveForward, setMotorSpeedLog, to }) => {
  const buttonDimensions = { width: '100px', height: '50px' };
  const [selectedAnswer, setSelectedAnswer] = React.useState("-");
  const [error, setError] = React.useState(false);
  const [realAttempt, setRealAttempt] = React.useState(false);
  const [connectDotsError, setConnectDotsError] = React.useState(0);
  const [lastClickTime, setLastClickTime] = React.useState(Date.now());
  const [startTime, setStartTime] = React.useState(Date.now());
  let selectedAnswerRef = useRef(selectedAnswer);
  const { t } = useTranslation();

  useEffect(() => {
    // Reset selected button index whenever the component is rendered
    setRealAttempt(false);
    setStartTime(Date.now());
  }, [content['Page Number']]);

  const timerHandler = () => {
    const currentTime = Date.now();
    if (lastClickTime !== null) {
      const timeDifference = currentTime - lastClickTime;
      const typeOfQuestion = content['Type of Question'] ? content['Type of Question'][0]['content'] : "";
      if ((typeOfQuestion === "Number Pad" || typeOfQuestion === "Money Number Pad")) {
        setMotorSpeedLog(timeDifference);
      }
    }
    setLastClickTime(currentTime);
  }

  const handleAnswerChecked = (isCorrect, totalErrors, prematureError, totalTime) => {
    let points = 0;
    const numWords = content['Word Count'] ? parseInt(content['Word Count'][0]['content']) : 0;
    const task = content['Task'] ? content['Task'][0]['content'] : "";
    const pageTitle = content['Page Title'][0]['content'];
    if (task === "Simple Attention") {
      if (totalErrors === 0 && prematureError === 0) {
        points = 2;
      }
    }
    else if (task === "Executive Mini-trails B"  || task === "Visuospatial Mini-trails A") {
      if (connectDotsError === 0 && isCorrect) {
        points = 1;
      }
    }
    else if (task === "Visuospatial Image Combos") {
      if (isCorrect) {
        points = 1;
      }
    }
    else if (task === "Orientation" || task === "Memory Incidental") {
      if (isCorrect) {
        points = 1;
      }
    }
    else if (task === "Math") {
      if (pageTitle === "Math 1") {
        if (isCorrect) {
          points = 1;
        }
      }
      else if (pageTitle === "Math 2") {
        if (isCorrect) {
          points = 2;
        }
      }
    }
    else if (task === "Memory Five Words") {
      if (selectedAnswer !== "-") {
        const sortedSelectedWords = selectedAnswer.join().split(',').map(word => word.trim()).sort();
        const sortedCorrectAnswers = correctAnswer.split(',').map(word => word.trim()).sort();
      
        // Count the matching elements
        let matchCount = 0;
        let notMatchCount = 0;
        sortedSelectedWords.forEach(word => {
          if (sortedCorrectAnswers.includes(word)) {
            matchCount++;
          }
          else {
            notMatchCount++;
          }
        });
        points = 5 - notMatchCount;
        if (points > matchCount) {
          points = matchCount;
        }
        else if (points < 0) {
          points = 0;
        }
      }
    }
    onAnswerChecked(task, pageTitle, isCorrect, totalErrors + connectDotsError, prematureError, totalTime, points, numWords);
  };

  const handleClickConnectTheBox = (word, totalErrors) => {
    setConnectDotsError(totalErrors);
    selectedAnswerRef.current = word;
    setSelectedAnswer(word);
    setError(false);
  }
  const handleClick = (word) => {
    // Pass the selected word to the parent component
    if ((content['Type of Question'][0]['content'] === 'Word Selection') && correctRequirement === '-') {
      if(word !== "-") {
        setRealAttempt(true);
      }
      else {
        setRealAttempt(false);
      }
    }
    if ((content['Type of Question'][0]['content'] === 'Multi Word Selection' || content['Type of Question'][0]['content'] === 'Image Selection' || content['Type of Question'][0]['content'] === 'Image Selection Single') && correctRequirement === '-') {
      const correctAnswers = correctAnswer.split(',').map(word => word.trim());
      // Sort both arrays to ensure the order doesn't matter
      // Check if both arrays are equal
      if(word.length === correctAnswers.length) {
        setRealAttempt(true);
      }
      else {
        setRealAttempt(false);
      }

    }
    if ((content['Type of Question'][0]['content'] === 'Number Pad' || content['Type of Question'][0]['content'] === 'Money Number Pad') && correctRequirement === '-') {
      if(word.length === correctAnswer.length) {
        setRealAttempt(true);
      }
      else {
        setRealAttempt(false);
      }
    }
    selectedAnswerRef.current = word;
    setSelectedAnswer(word);
    timerHandler();
    setError(false);
  };

  function renderStyledContent(content) {
    if (!content || content.length === 0) return null;
  
    return content.map((part, index) => {
      const styleMap = {
        underline: { textDecoration: 'underline' },
        italic: { fontStyle: 'italic' },
        red: { color: 'red' },
        green: { color: '#00b500' },
        blue: { color: 'blue' },
        blueHighlight: { backgroundColor: '#85c7ff'},
        fadingBlueHighlight: {
          background: 'linear-gradient(to right, #85c7ff, #ffffff)',
        },
        yellow: { color: '#d0bc2a' },
        brown: {color: '#964B00' }
      };
  
      const styles = part.style ? part.style.split(' ').map(s => styleMap[s]).reduce((acc, cur) => ({ ...acc, ...cur }), {}) : {};
      if (part.content.includes("\\n")) {
        // Split content by "\n" and render each line separately
        const lines = part.content.split("\\n").map((line, lineIndex) => {
          return (
          <React.Fragment key={lineIndex}>
            <span style={styles}>
              {line}
            </span>
            {lineIndex !== part.content.split("\\n").length - 1 && <br />}
          </React.Fragment>
        );
      });
        return lines;
      }
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
    if(errorMessage.length > 1) {
      errorMessages.push(errorMessage[0].content);
    }
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

    if (currentErrorMessage.length !== 0) {
      errorMessages.push(currentErrorMessage);
    }
  
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
    }
    else if (errorMessageArray.length === 1){
      renderedErrorMessages.push(renderStyledContent(error));
    }
    else {
      renderedErrorMessages.push(error);
    }
  });

  return (
    <div>
      {renderStyledContent(content['Prompt']) && <Instruction text={renderStyledContent(content['Prompt'])} className = "instruction-box" />}
      {content['Type of Question'][0]['content'] === 'Instruction' && 
        (() => {
          // Extract prompts based on keys
          const prompts = Object.keys(content)
          .filter(key => key.startsWith('Prompt'))
          .map(key => content[key]);
          return (
            <><div className="extra-top-margin"></div>
            <InstructionContainer instructions={prompts} /></>
          );
        })()
      }
      {content['Type of Question'][0]['content'] === 'Tabcode' &&
        (() => {
          return (
            <div>
              <TabcodeGenerator tabCode={tabCode}></TabcodeGenerator>
            </div>
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
              {content['Answer Img'] && content['Answer Img'][0]['content'] && (
                <img 
                  src={content['Answer Img'][0]['content']} 
                  alt="Answer Image" 
                  style={{
                    display: 'block',  /* Make the image a block element to apply margin */
                    margin: 'auto',    /* Center horizontally */
                    marginTop: 'auto', /* Center vertically */
                    marginBottom: 'auto',
                    maxWidth: '35vh',  /* Ensure the image fits within the container */
                    maxHeight: 'auto', 
                    paddingBottom: '10px',
                  }} 
                />
              )}
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
      {content['Type of Question'][0]['content'] === 'Image Selection Single' &&
        (() => {
          let s = content['File Path'][0]['content'];
          let filePaths = s.substring(1, s.length - 1).split(",");
          filePaths = filePaths.map(str => str.trim());

          return (
            <div>
              {content['Answer Img'] && content['Answer Img'][0]['content'] && (
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
              )}
              <ImageSelectionSingle 
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
            <ConnectTheBoxes 
              characters={characters}
              positions={positions}
              onClick={handleClickConnectTheBox}
              pageNumber={content['Page Number'][0]['content']}
            /></>
            
          );
        })()

      }
      {content['Type of Question'][0]['content'] !== 'Flashing Words' &&
        (() => (
          <div className="next-flex">
            <NextButton
              to={to}
              content={content}
              correctAnswer={correctAnswer}
              selectedAnswer={selectedAnswer}
              timeHandler={timerHandler}
              realAttempt={realAttempt}
              startTime={startTime}
              onAnswerChecked={handleAnswerChecked}
              handleTotalMoveForward={handleTotalMoveForward}
              errorMessage={content['Error Pop Ups'] ? renderedErrorMessages : ""}
              error={error}
              setError={setError}
              pageNumber={content['Page Number'][0]['content']}
            >
              {t('next')}
            </NextButton>
          </div>
        ))()
      }
    </div>
  );
};

export default Page;