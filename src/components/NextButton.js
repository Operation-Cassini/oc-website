import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ErrorMessage from './ErrorMessage'; // Import ErrorMessage component
import './NextButton.css'; // Import CSS file for styling

const NextButton = ({ to, correctAnswer, selectedAnswer, realAttempt, errorMessage, error, setError, pageNumber, children }) => {
  console.log("page number is", pageNumber)
  // Function to toggle the position of the next button
  const toggleNextButtonPosition = (pageNumber) => {
    const nextButtonContainer = document.querySelector('.next-flex');
    if (nextButtonContainer) {
      console.log("here");
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
    // Check if the selected answer matches the correct answer
    // console.log("the correct requirement is", correctRequirement);
    console.log("the correct answer is", correctAnswer);
    console.log("you pressed: ", selectedAnswer);
    console.log("length of correctAnswer is", correctAnswer.length);
    console.log("length of selected answer is", selectedAnswer.length);
    if(correctAnswer.includes(',')) {
      const correctAnswers = correctAnswer.split(',').map(word => word.trim());
      console.log("new correct answer is", correctAnswers);
        // Sort both arrays to ensure the order doesn't matter
      const sortedCorrectAnswers = correctAnswers.sort();
      const sortedSelectedWords = selectedAnswer.sort();

      console.log("sorted correct answer", sortedCorrectAnswers);
      console.log("sorted selected answer", sortedSelectedWords);
      // Check if both arrays are equal
      const isCorrect = JSON.stringify(sortedCorrectAnswers) === JSON.stringify(sortedSelectedWords);
      if (!isCorrect) {
        // Prevent default navigation behavior if the answer is incorrect
        if (realAttempt === true) {
          console.log("not correct but we move on anyways!");
        }
        else {
          console.log("Incorrect answer. Navigation prevented.");
          event.preventDefault();
          setError(true);
        }
        // Optionally, you can add logic here to handle incorrect answer actions
      } else {
        console.log("Correct answer!");
        // Optionally, you can add logic here to handle correct answer actions
      }
    }
    else if(correctAnswer === selectedAnswer) {
      console.log("Correct answer!");
    }
    else {
      if (realAttempt === true) {
        console.log("not correct but we move on anyways!");
      }
      else {
        console.log("Incorrect answer. Navigation prevented.");
        event.preventDefault();
        setError(true);
      }
    }
  };

  return (
    <div className="next-container">
      <div className = "error-flex">
      {error && <ErrorMessage message={errorMessage} />}
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