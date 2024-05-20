import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ErrorMessage from './ErrorMessage'; // Import ErrorMessage component
import './NextButton.css'; // Import CSS file for styling

const NextButton = ({ to, correctAnswer, selectedAnswer, errorMessage, error, setError, pageNumber, children }) => {
  // Function to toggle the position of the next button
  const toggleNextButtonPosition = (pageNumber) => {
    const nextButtonContainer = document.querySelector('.next-flex');
    if (nextButtonContainer) {
      if (pageNumber % 2 === 1) {
        nextButtonContainer.style.marginRight = '100px'; // Move slightly to the left
      } else {
        nextButtonContainer.style.marginRight = '0px'; // Default position
      }
    }
  };

  // Call the function with the page number after the component is mounted
  useEffect(() => {
    toggleNextButtonPosition(pageNumber);
  }, [pageNumber]);

  const handleClick = (event) => {
    console.log("the correct answer is", correctAnswer)
    console.log("you pressed: ", selectedAnswer)
    if (correctAnswer !== undefined) {
      if(correctAnswer.includes(',')) {
        const correctAnswers = correctAnswer.split(',').map(word => word.trim());
        console.log("new correct answer is", correctAnswers);
        const sortedCorrectAnswers = correctAnswers.sort();
        const sortedSelectedWords = selectedAnswer.sort();
        console.log("sorted correct answer", sortedCorrectAnswers);
        console.log("sorted selected answer", sortedSelectedWords);
        const isCorrect = JSON.stringify(sortedCorrectAnswers) === JSON.stringify(sortedSelectedWords);
        if (!isCorrect) {

          console.log("Incorrect answer. Navigation prevented.");
          event.preventDefault();
          setError(true);

        } else {
          console.log("Correct answer!");

        }
      }
      else {
        if (correctAnswer !== selectedAnswer) {
          console.log("Incorrect answer. Navigation prevented.");
          event.preventDefault();
          console.log("Error message popup");
          setError(true);
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
      <div className = "error-flex">
      {error && <ErrorMessage message={errorMessage} />} {/* Conditionally 
      render error message */}
      </div>
      <Link to={to} onClick={handleClick}> {/* Use the "to" prop to specify the route path */}
        <button type="button" className="next-button">
          {children}
        </button>
      </Link>
    </div>
  );
};

export default NextButton;