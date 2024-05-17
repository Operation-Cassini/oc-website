import React, { useState, useEffect } from 'react';
import BlackBoarderTextBox from './BlackBoarderTextBox';
import './FlashTextBox.css';

const FlashTextBoxes = ({ texts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const [textBoxDimensions, setTextBoxDimensions] = useState({ width: 0, height: 0 });
  const [completedCycles, setCompletedCycles] = useState(0);
  const totalCycles = 1; // Set total cycles to 1 for one full round

  useEffect(() => {
    const interval = setInterval(() => {
      setShowOverlay(false); // Ensure overlay is hidden at the beginning of each cycle

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1));
        setShowOverlay(true); // Show overlay after 3 seconds
      }, 1000); // Display each text box for 3 seconds

      setTimeout(() => {
        setShowOverlay(false); // Hide overlay after 2 seconds
        if (currentIndex === texts.length - 1) {
          // If it's the last text box in the cycle, increment completed cycles
          setCompletedCycles((prevCycles) => prevCycles + 1);
        }
      }, 3000); // Display overlay for 2 seconds after text box

      if (completedCycles === totalCycles) {
        clearInterval(interval); // Stop the interval once all cycles are completed
      }
    }, 4000); // Repeat the cycle every 8 seconds (3 seconds for text box + 5 seconds for overlay)

    return () => clearInterval(interval);
  }, [texts, currentIndex, completedCycles, totalCycles]);

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
          <div className={index === currentIndex ? 'show' : 'hide'}>
            <BlackBoarderTextBox>{text}</BlackBoarderTextBox>
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
