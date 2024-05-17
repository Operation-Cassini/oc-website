import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorMessage from './ErrorMessage'; // Import ErrorMessage component
import './NextButton.css'; // Import CSS file for styling

const NextButton = ({ to, correctAnswer, selectedAnswer, children }) => {
  const [error, setError] = useState('');
  let errorMessage = "";

  const handleClick = (event) => {
    // Check if the selected answer matches the correct answer
    if (selectedAnswer !== correctAnswer) {
      console.log("Incorrect answer. Navigation prevented.");
      // Prevent default navigation behavior if the answer is incorrect
      event.preventDefault();
      // Optionally, you can add logic here to handle incorrect answer actions
      setError(errorMessage || 'Incorrect answer. Please try again.');
    } else {
      console.log("Correct answer!");
      // Optionally, you can add logic here to handle correct answer actions
      setError('');
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
      {error && <ErrorMessage message={error} />} {/* Conditionally render error message */}
      <Link to={to} onClick={handleClick}> {/* Use the "to" prop to specify the route path */}
        <button className="next-button">
          {children}
        </button>
      </Link>
    </div>
  );
};

export default NextButton;