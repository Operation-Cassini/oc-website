import React from 'react';
import { Link, Route, Routes } from "react-router-dom";
import './NextButton.css'; // Import CSS file for styling

const NextButton = ({ to, children }) => {


  const handleClick = () => {
   
  };

  return (
  
    <Link to="../DumbPage"> 
      <button className="next-button" onClick={handleClick}>
        {children}
      </button>
    </Link>
  
  );
};

export default NextButton;
