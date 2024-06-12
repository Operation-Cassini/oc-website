import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorMessage from './ErrorMessage'; // Import ErrorMessage component
import './NextButton.css'; // Import CSS file for styling

const NextButton = ({ to, content, correctAnswer, selectedAnswer, timeHandler, realAttempt, startTime, onAnswerChecked, handleTotalMoveForward, errorMessage, error, setError, pageNumber, children }) => {
  let selectedAmount = 0;
  let isError = false;
  if (errorMessage.length > 1) {
    selectedAmount = parseInt(errorMessage[0]);
  }
  const [finalErrorMessage, setFinalErrorMessage] = useState("");
  const [errorAttempts, setErrorAttempts] = useState(0);
  const [prematureError, setPrematureError] = useState(0);
  const totalNextClicks = useRef(0);

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
    totalNextClicks.current = 0;
  }, [pageNumber]);

  const handleClick = (event) => {
    totalNextClicks.current = totalNextClicks.current + 1;
    const task = content['Task'] ? content['Task'][0]['content'] : "";
    const typeOfQuestion = content['Type of Question'] ? content['Type of Question'][0]['content'] : "";
    let isItCorrect;
    if (pageNumber !== undefined && (selectedAnswer !== "-" && selectedAnswer !== "")) {
      timeHandler();
    }
    if (correctAnswer.includes(',')) {
      const correctAnswers = correctAnswer.split(',').map(word => word.trim());
      // Sort both arrays to ensure the order doesn't matter
      const sortedCorrectAnswers = correctAnswers.sort();

      let sortedSelectedWords = [];
      if (selectedAnswer !== "-") {
        sortedSelectedWords = selectedAnswer.join().split(',').sort();
      }
      // Check if both arrays are equal
      const isCorrect = JSON.stringify(sortedCorrectAnswers) === JSON.stringify(sortedSelectedWords);
      if (!isCorrect) {
        // Prevent default navigation behavior if the answer is incorrect
        if (realAttempt === true) {
          isItCorrect = false;
          setErrorAttempts(errorAttempts + 1);
        } else {
          if (selectedAnswer === "-" || selectedAnswer === "" || (Array.isArray(selectedAnswer) && selectedAnswer.length === 0) || task === "Visuospatial Mini-trails A" || task === "Executive Mini-trails B") {
            setPrematureError(prematureError + 1);
          }
          else {
            setErrorAttempts(errorAttempts + 1);
          }
          isItCorrect = false;
          if (totalNextClicks.current < 4) {
            event.preventDefault();
          }
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
        // Optionally, you can add logic here to handle correct answer actions
      }
    } else if (selectedAnswer.toString() === correctAnswer.toString()) {
      isItCorrect = true;
    } else {
      if (realAttempt === true) {
        setErrorAttempts(errorAttempts + 1);
        isItCorrect = false;
      } else {
        if (selectedAnswer === "-" || selectedAnswer === "" || (Array.isArray(selectedAnswer) && selectedAnswer.length === 0) || task === "Visuospatial Mini-trails A" || task === "Executive Mini-trails B") {
          setPrematureError(prematureError + 1);
        }
        else {
          setErrorAttempts(errorAttempts + 1);
        }
        isItCorrect = false;
        // For stroop test
        if (totalNextClicks.current < 4) {
          event.preventDefault();
        }
        if (errorMessage.length > 1) {
          if (errorAttempts >= selectedAmount) {
            setFinalErrorMessage(errorMessage[2]);
          } else {
            setFinalErrorMessage(errorMessage[1]);
          }
          setError(true);
          isError = true;
        } else {
          setFinalErrorMessage(errorMessage[0]);
          setError(true);
          isError = true;
        }        
      }
    }
    if (totalNextClicks.current === 4 && isError) {
      isError = false;
      handleTotalMoveForward(false);
    }
    if (!isError) {
      if((totalNextClicks.current !== 4 && typeOfQuestion !== "Instruction") || (isItCorrect && typeOfQuestion !== "Instruction")) {
        handleTotalMoveForward(true);
      }
      let totalErrors = errorAttempts;
      if(!isItCorrect) {
        totalErrors = errorAttempts + 1;
      }
      onAnswerChecked(isItCorrect, totalErrors, prematureError, Date.now() - startTime);
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
