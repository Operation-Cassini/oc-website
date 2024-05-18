import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import ErrorMessage from './ErrorMessage'; // Import ErrorMessage component
import './NextButton.css'; // Import CSS file for styling

const NextButton = ({ to, correctAnswer, selectedAnswer, errorMessage, error, setError, pageNumber, children }) => {
  // Function to toggle the position of the next button
  const toggleNextButtonPosition = (pageNumber) => {
    const nextButton = document.querySelector('.next-button');
    if (nextButton) {
      // Check if the page number is even or odd
      if (pageNumber % 2 === 1) {
        // Even page number: Position the button in the bottom right corner
        nextButton.style.bottom = '10px';
        nextButton.style.right = '10px';
        nextButton.style.left = ''; // Clear the left style
      } else {
        // Odd page number: Position the button in the bottom left corner
        nextButton.style.bottom = '10px';
        nextButton.style.left = '10px';
        nextButton.style.right = ''; // Clear the right style
      }
    }
  };

  // Call the function with the page number after the component is mounted
  useEffect(() => {
    toggleNextButtonPosition(pageNumber);
  }, [pageNumber]);

  const handleClick = (event) => {
    // Check if the selected answer matches the correct answer
    console.log("the correct answer is", correctAnswer)
    console.log("you pressed: ", selectedAnswer)
    if (correctAnswer !== undefined) {
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
          console.log("Incorrect answer. Navigation prevented.");
          // Prevent default navigation behavior if the answer is incorrect
          event.preventDefault();
          setError(true);
          console.log("Check");
          console.log(error);
          // Optionally, you can add logic here to handle incorrect answer actions
        } else {
          console.log("Correct answer!");
          // Optionally, you can add logic here to handle correct answer actions
        }
      }
      else {
        if (correctAnswer !== selectedAnswer) {
          console.log("Incorrect answer. Navigation prevented.");
          event.preventDefault();
        }
        else {
          console.log("Correct answer!");
        }
      }
    }
    // Optionally, you can add logic here to handle any actions when the button is clicked
  };

  return (
    // <Link to={to} onClick={handleClick}> {/* Use the "to" prop to specify the route path */}
    //   <button className="next-button">
    //     {children}
    //   </button>
    // </Link>
    <div>
      {error && <ErrorMessage message={errorMessage} />} {/* Conditionally render error message */}
      <Link to={to} onClick={handleClick}> {/* Use the "to" prop to specify the route path */}
        <button type="button" className="next-button">
          {children}
        </button>
      </Link>
    </div>
  );
};

export default NextButton;