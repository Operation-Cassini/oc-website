import React from 'react';
import { Link } from 'react-router-dom';
import './NextButton.css'; // Import CSS file for styling

const NextButton = ({ to, children }) => {
  const handleClick = () => {
    // Optionally, you can add logic here to handle any actions when the button is clicked
  };

  return (
    <Link to={to}> {/* Use the "to" prop to specify the route path */}
      <button className="next-button" onClick={handleClick}>
        {children}
      </button>
    </Link>
  );
};

export default NextButton;

