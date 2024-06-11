import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import BlackBoarderTextBox from './BlackBoarderTextBox';
import './FlashTextBox.css';

const FlashTextBoxes = ({ texts, nextPage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showText, setShowText] = useState(true);
  const [textBoxDimensions, setTextBoxDimensions] = useState({ width: 0, height: 0 });
  const [completedCycles, setCompletedCycles] = useState(0);
  const totalCycles = 1; // Set total cycles to 1 for one full round
  const nextPageNumber = `/page/${+nextPage}`;
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const interval = setInterval(() => {
      setShowText(true);
      setShowOverlay(false);

      if (currentIndex === texts.length - 1 && completedCycles + 1 === totalCycles) {
        clearInterval(interval);
        navigate(nextPageNumber);
      }

      if (currentIndex === texts.length - 1) {
        setCompletedCycles((prevCycles) => prevCycles + 1);
      }

      // Increment current index
      setCurrentIndex((prevIndex) => (prevIndex + 1));
  
    }, 3000); // Repeat the cycle every 3 seconds
  
    // Clear interval on unmount
    return () => clearInterval(interval);
  }, [texts, currentIndex, completedCycles, totalCycles, nextPageNumber, navigate]);

  useEffect(() => {
    // Hide text and overlay after 2 seconds
    setTimeout(() => {
      setShowText(false);
      setShowOverlay(true);
    }, 2000);
  }, [currentIndex])
  
  useEffect(() => {
    const updateTextBoxDimensions = () => {
      const textBox = document.querySelector('.flash-text-box');
      const { width, height } = textBox.getBoundingClientRect();
      setTextBoxDimensions({ width, height });
    };

    window.addEventListener('resize', updateTextBoxDimensions);
    updateTextBoxDimensions();

    return () => window.removeEventListener('resize', updateTextBoxDimensions);
  }, []);

  return (
    <div className="flash-text-boxes">
      {texts.map((text, index) => (
        <div key={index} className="flash-text-box">
          <div className={index === currentIndex && showText ? 'show' : 'hide'}>
            <BlackBoarderTextBox id="box">{text}</BlackBoarderTextBox>
          </div>
          {index === currentIndex && showOverlay && (
            <div
              className="blackout-overlay"
              style={{ width: `${textBoxDimensions.width}px`, height: `${textBoxDimensions.height}px` }}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FlashTextBoxes;

