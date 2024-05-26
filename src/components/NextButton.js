import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ErrorMessage from './ErrorMessage'; // Import ErrorMessage component
import './NextButton.css'; // Import CSS file for styling

function renderStyledContent(content) {
  console.log("the content is", content);
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

const NextButton = ({ to, correctAnswer, selectedAnswer, realAttempt, errorMessage, error, setError, pageNumber, children }) => {
  console.log("error message is", errorMessage);
  let selectedAmount = 0;
  // if (errorMessage[0].props.children !== '') {
  //   // errorMessageArray = concatenatedErrorMessages.split(";");
  //   selectedAmount = parseInt(errorMessageArray.shift()); // Extract and remove the first element
  // }
  // errorMessageArray = renderedErrorMessages;
  if (errorMessage.length > 1) {
    // errorMessageArray = concatenatedErrorMessages.split(";");
    selectedAmount = parseInt(errorMessage[0]);
    console.log("selected amount is", selectedAmount);
  }
  // console.log("concatenatedErrorMessage is", concatenatedErrorMessages);
  // console.log(errorMessageArray);
  
  const [finalErrorMessage, setFinalErrorMessage] = useState("");

  // Function to toggle the position of the next button
  const toggleNextButtonPosition = (pageNumber) => {
    const nextButtonContainer = document.querySelector('.next-flex');
    if (nextButtonContainer) {
      if (pageNumber % 2 === 1) {
        nextButtonContainer.style.marginRight = '100px'; // Move slightly to the left
      } else {
        nextButtonContainer.style.marginRight = '200px'; // Default position
      }
    }
  };

  // Call the function with the page number after the component is mounted
  useEffect(() => {
    toggleNextButtonPosition(pageNumber);
  }, [pageNumber]);

  const handleClick = (event) => {
    if (correctAnswer.includes(',')) {
      const correctAnswers = correctAnswer.split(',').map(word => word.trim());
      // Sort both arrays to ensure the order doesn't matter
      const sortedCorrectAnswers = correctAnswers.sort();
      // const sortedSelectedWords = selectedAnswer.sort();
      console.log("correct answer:");
      console.log(correctAnswer);
      console.log(sortedCorrectAnswers);

      let sortedSelectedWords = [];
      if (selectedAnswer !== "-") {
        sortedSelectedWords = selectedAnswer.join().split(',').sort();
      }
      console.log("selected words:");
      console.log(sortedSelectedWords);
      // Check if both arrays are equal
      const isCorrect = JSON.stringify(sortedCorrectAnswers) === JSON.stringify(sortedSelectedWords);
      if (!isCorrect) {
        // Prevent default navigation behavior if the answer is incorrect
        if (realAttempt === true) {
          console.log("not correct but we move on anyways!");
        } else {
          console.log("Incorrect answer. Navigation prevented.");
          event.preventDefault();
          console.log(sortedSelectedWords.length + " " + selectedAmount);
          if (sortedSelectedWords.length >= selectedAmount) {
            setFinalErrorMessage(errorMessage[2]);
          } else {
            setFinalErrorMessage(errorMessage[1]);
          }
          setError(true);
        }
        // Optionally, you can add logic here to handle incorrect answer actions
      } else {
        console.log("made it!");
        console.log("Correct answer!");
        // Optionally, you can add logic here to handle correct answer actions
      }
    } else if (correctAnswer === selectedAnswer) {
      console.log(correctAnswer);
      console.log(selectedAnswer);
      console.log("Correct answer!");
    } else {
      if (realAttempt === true) {
        console.log("not correct but we move on anyways!");
      } else {
        console.log("Incorrect answer. Navigation prevented.");
        event.preventDefault();
        setFinalErrorMessage(errorMessage[0]);
        setError(true);
      }
    }
  };

  return (
    <div>
      <div className="error-flex">
        {error && <ErrorMessage message={finalErrorMessage} />}
      </div>
      <Link to={to} onClick={handleClick}>
        <button type="button" className="next-button">
          {children}
        </button>
      </Link>
    </div>
  );
};

export default NextButton;
