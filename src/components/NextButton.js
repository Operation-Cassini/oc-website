import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorMessage from './ErrorMessage'; // Import ErrorMessage component
import './NextButton.css'; // Import CSS file for styling

const NextButton = ({ to, correctAnswer, selectedAnswer, timeHandler, realAttempt, startTime, onAnswerChecked, errorMessage, error, setError, pageNumber, children }) => {
  // console.log("error message is", errorMessage);
  let selectedAmount = 0;
  let isError = false;
  // if (errorMessage[0].props.children !== '') {
  //   // errorMessageArray = concatenatedErrorMessages.split(";");
  //   selectedAmount = parseInt(errorMessageArray.shift()); // Extract and remove the first element
  // }
  // errorMessageArray = renderedErrorMessages;
  if (errorMessage.length > 1) {
    // errorMessageArray = concatenatedErrorMessages.split(";");
    selectedAmount = parseInt(errorMessage[0]);
    // console.log("selected amount is", selectedAmount);
  }
  // console.log("concatenatedErrorMessage is", concatenatedErrorMessages);
  // console.log(errorMessageArray);
  
  const [finalErrorMessage, setFinalErrorMessage] = useState("");
  const [errorAttempts, setErrorAttempts] = useState(0);
  // const [totalErrors, setTotalErrors] = useState(0);
  // Function to toggle the position of the next button
  const toggleNextButtonPosition = (pageNumber) => {
    const nextButtonContainer = document.querySelector('.next-flex');
    if (nextButtonContainer) {
      if (pageNumber % 2 === 1) {
        nextButtonContainer.style.marginRight = '120px'; // Move slightly to the left
      } else {
        nextButtonContainer.style.marginRight = '220px'; // Default position
      }
    }
  };

  // Call the function with the page number after the component is mounted
  useEffect(() => {
    toggleNextButtonPosition(pageNumber);
  }, [pageNumber]);

  const handleClick = (event) => {
    // console.log("selected answer is", selectedAnswer);
    // console.log("correct answer is", correctAnswer);
    let isItCorrect;
    // let totalErrors = 0;
    if (pageNumber !== undefined) {
      timeHandler();
    }
    if (correctAnswer.includes(',')) {
      const correctAnswers = correctAnswer.split(',').map(word => word.trim());
      // Sort both arrays to ensure the order doesn't matter
      const sortedCorrectAnswers = correctAnswers.sort();
      // const sortedSelectedWords = selectedAnswer.sort();
      // console.log("correct answer:");
      // console.log(correctAnswer);
      // console.log(sortedCorrectAnswers);

      let sortedSelectedWords = [];
      if (selectedAnswer !== "-") {
        sortedSelectedWords = selectedAnswer.join().split(',').sort();
      }
      // console.log("selected words:");
      // console.log(sortedSelectedWords);
      // Check if both arrays are equal
      const isCorrect = JSON.stringify(sortedCorrectAnswers) === JSON.stringify(sortedSelectedWords);
      if (!isCorrect) {
        // Prevent default navigation behavior if the answer is incorrect
        if (realAttempt === true) {
          isItCorrect = false;
          setErrorAttempts(errorAttempts + 1);
          console.log("error attempts is", errorAttempts);
          console.log("not correct but we move on anyways!");
        } else {
          setErrorAttempts(errorAttempts + 1);
          console.log("error attempts is", errorAttempts);
          isItCorrect = false;
          console.log("Incorrect answer. Navigation prevented.");
          event.preventDefault();
          console.log(sortedSelectedWords.length + " " + selectedAmount);
          if (sortedSelectedWords.length >= selectedAmount) {
            setFinalErrorMessage(errorMessage[2]);
          } else {
            setFinalErrorMessage(errorMessage[1]);
          }
          setError(true);
          isError = true;
        }
        // Optionally, you can add logic here to handle incorrect answer actions
      } else {
        isItCorrect = true;
        console.log("made it!");
        console.log("Correct answer!");
        // Optionally, you can add logic here to handle correct answer actions
      }
    } else if (selectedAnswer.toString() === correctAnswer.toString()) {
      isItCorrect = true;
      // console.log(correctAnswer);
      // console.log(selectedAnswer);
      console.log("Correct answer!");
    } else {
      if (realAttempt === true) {
        setErrorAttempts(errorAttempts + 1);
        console.log("error attempts is", errorAttempts);
        isItCorrect = false;
        console.log("not correct but we move on anyways!");
      } else {
        setErrorAttempts(errorAttempts + 1);
        console.log("error attempts is", errorAttempts);
        isItCorrect = false;
        console.log("Incorrect answer. Navigation prevented.");
        // For stroop test
        event.preventDefault();
        if (errorMessage.length > 1) {
          if (errorAttempts >= selectedAmount) {
            setFinalErrorMessage(errorMessage[2]);
          } else {
            setFinalErrorMessage(errorMessage[1]);
          }
          // setErrorAttempts(errorAttempts + 1);
          // console.log("error attempts is", errorAttempts);
          setError(true);
          isError = true;
        } else {
          setFinalErrorMessage(errorMessage[0]);
          setError(true);
          isError = true;
        }        
      }
    }
    if (!isError && errorMessage.length >= 1 && correctAnswer !== "-") {
      let totalErrors = errorAttempts;
      if(!isItCorrect) {
        totalErrors = errorAttempts + 1;
      }
      console.log("start time is", startTime);
      console.log("current date.now() is", Date.now())
      onAnswerChecked(isItCorrect, totalErrors, Date.now() - startTime);
    }
    console.log("the final error message is", finalErrorMessage);
    // onAnswerChecked(isItCorrect);
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
