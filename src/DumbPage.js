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
  // State variables to manage selected answer, error state, and real attempt state
  const [selectedAnswer, setSelectedAnswer] = React.useState("-");
  const [error, setError] = React.useState(false);
  const [realAttempt, setRealAttempt] = React.useState(false);

  // Effect to reset real attampt state whenever the page content changes
  useEffect(() => {
    // Reset selected button index whenever the component is rendered
    console.log("resetting real attempt");
    setRealAttempt(false);
  }, [content['Page Number']]);

  // Handler for button click events
  const handleClick = (word) => {
    console.log('Selected word:', word);

    // Specific logic for 'Word Selection' question type
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
    // Specific logic for 'Multi Word Selection' question type
    if (content['Type of Question'][0]['content'] === 'Multi Word Selection' && correctRequirement === '-') {
      const correctAnswers = correctAnswer.split(',').map(word => word.trim());
      console.log("new correct answer is", correctAnswers);
    
      if(word.length === correctAnswers.length) {
        setRealAttempt(true);
        console.log("real attempt setting to true");
      }
      else {
        setRealAttempt(false);
        console.log("real attempt setting to false");
      }
    }
    //Specific logic for 'Number Pad' and 'Money Number Pad' question types
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
    // Update selected answer and reset error state
    setSelectedAnswer(word);
    setError(false);
  };

  // function to render styled content based on provided styles
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
  // Funciton to flatten nested content arrays into a single string
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
  // Another function to flatten nested content arrays, keeping original structure
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
  // Function to extract and flatten styles from content
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

  // Flatten word bank, words for flashing, and number sequence for easier manipulation
  let wordBank = flattenContent(content['Word Bank']);
  let wordsFlash = flattenContent(content['Words']);
  let numberSequence = flattenContent(content['Number Sequence'])
  return (
    <div>
      
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
      {/* Render word selection container for 'Word Selection' question type */}
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
      {/* Render multi-word selection container for 'Multi Word Selection' question type */}
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
      {/* Render number selection container for 'Number Pad' question type */}
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
              words={words}
              styledWords={styledWordsWithStyle}
              pageNumber={content['Page Number'][0]['content']}
            />
          );
        })()

      }
      {/* Render money pad container for 'Money Number Pad' question type */}
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
              realAttempt={realAttempt}
              errorMessage={content['Error Pop Ups'] ? renderStyledContent(content['Error Pop Ups']) : ""}
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