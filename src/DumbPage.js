import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import WordSelectionContainer from './components/WordSelectionContainer';
import Instruction from './components/Instruction';
import NextButton from './components/NextButton';
import NumberSelectionContainer from './components/NumberSelectionContainer'
import MoneyPadContainer from './components/MoneyPadContainer'
import MultiWordSelectionContainer from './components/MultiWordSelectionContainer';
import StroopTextBox from './components/StroopTextBox';
import ImageSelection from './components/ImageSelection';
import InstructionContainer from './components/InstructionContainer';
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
    if (content['Type of Question'][0]['content'] === 'Multi Word Selection' && correctRequirement === '-') {
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
  let numberSequence = flattenContent(content['Number Sequence'])
  return (
    <div>
      <h1>Render Page</h1>
      {/* Render page title if it exists */}
      {renderStyledContent(content['Page Title']) && <h1>{renderStyledContent(content['Page Title'])}</h1>}

      {/* Render paragraph if it exists */}
      {renderStyledContent(content['Prompt']) && <Instruction text={renderStyledContent(content['Prompt'])} className = "instruction-box" />}

      {content['Type of Question'][0]['content'] === 'Instruction' && 
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

      {/* Render image if it exists */}
      {/* content['Type of Question'][0]['content'] */}
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
              words={words}
              styledWords={styledWordsWithStyle}
              pageNumber={content['Page Number'][0]['content']}
            />
          );
        })()

      }

    <div className = "next-flex">
      <NextButton
          to={to}
          correctAnswer={correctAnswer}
          selectedAnswer={selectedAnswer}
          realAttempt={realAttempt}
          errorMessage={content['Error Pop Ups'][0]['content'] ? content['Error Pop Ups'][0]['content'] : ""}
          error={error}
          setError={setError}
          pageNumber = {content['Page Number'][0]['content']}
        >
          NEXT
      </NextButton>
    </div>
    </div>
  );
};

export default Page;



      // {content['Type of Question'] === 'STROOP' &&
      //   (() => {
      //     console.log(content['Word Color']);
      //     console.log(content['Word']);
      //     let s = content['Word Bank'];
      //     let words = s.substring(1, s.length-1).split(",");
      //     words = words.map(str => str.trim());
      //     console.log("words: ", words);
      //     return (
      //       <div>
      //         <StroopTextBox textColor={content['Word Color']}>{content['Word']}</StroopTextBox>
      //         <WordSelectionContainer
      //             rows={content['Dimensions'].split("x")[0]}
      //             columns={content['Dimensions'].split("x")[1]}
      //             buttonDimensions={buttonDimensions}
      //             onClick={handleClick}
      //             words={words}
      //             pageNumber={content['Page Number']}
      //         />
      //       </div>
            
      //     );
      //   })()

      // }
      // {content['Type of Question'] === 'Image Selection' &&
      //   (() => {
      //     // {content['Answer Img'] && <img src={content['Answer Img']} alt="Answer Image" />}
      //     let s = content['File Path'];
      //     let filePaths = s.substring(1, s.length - 1).split(",");
      //     filePaths = filePaths.map(str => str.trim());

      //     return (
      //       <div>
      //         <img 
      //           src={content['Answer Img']} 
      //           alt="Answer Image" 
      //           style={{
      //             display: 'block',  /* Make the image a block element to apply margin */
      //             margin: 'auto',    /* Center horizontally */
      //             marginTop: 'auto', /* Center vertically */
      //             marginBottom: 'auto',
      //             maxWidth: '100%',  /* Ensure the image fits within the container */
      //             maxHeight: '100%', 
      //             paddingBottom: '20px',
      //           }} 
      //         />
      //         <Instruction text={content['Instruction']} />
      //         <ImageSelection 
      //           images={filePaths} 
      //           rows={content['Dimensions'].split("x")[0]}
      //           cols={content['Dimensions'].split("x")[1]}
      //         />
      //       </div>
      //     );
      //   })()
      // }