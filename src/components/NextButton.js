import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ErrorMessage from './ErrorMessage'; // Import ErrorMessage component
import './NextButton.css'; // Import CSS file for styling

const NextButton = ({ to, content, correctAnswer, selectedAnswer, timeHandler, realAttempt, startTime, onAnswerChecked, handleTotalMoveForward, errorMessage, error, setError, pageNumber, children }) => {
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
  const [prematureError, setPrematureError] = useState(0);
  // const prevAnswer = useRef("-");
  const totalNextClicks = useRef(0);
  // const totalMoveForward = useRef(0);
  // if (prevAnswer.current === "-" || prevAnswer.current === selectedAnswer) {
  //   totalNextClicks.current = totalNextClicks.current + 1;
  //   prevAnswer.current = selectedAnswer;
  // }
  // console.log("the total amount of next clicks in a row is", totalNextClicks.current);
  // const [totalErrors, setTotalErrors] = useState(0);
  // Function to toggle the position of the next button
  const toggleNextButtonPosition = (pageNumber) => {
    const nextButtonContainer = document.querySelector('.next-flex');
    if (nextButtonContainer) {
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
    totalNextClicks.current = 0;
  }, [pageNumber]);

  const handleClick = (event) => {
    totalNextClicks.current = totalNextClicks.current + 1;
    console.log("testing");
    const task = content['Task'] ? content['Task'][0]['content'] : "";
    const typeOfQuestion = content['Type of Question'] ? content['Type of Question'][0]['content'] : "";
    // console.log("?????", selectedAnswer);
    // if (JSON.stringify(prevAnswer.current) === JSON.stringify(selectedAnswer)) {
    //   console.log("inside, we have", selectedAnswer, prevAnswer.current);
    //   totalNextClicks.current = totalNextClicks.current + 1;
    // }
    // else {
    //   totalNextClicks.current = 0;
    // }
    // prevAnswer.current = selectedAnswer;
    console.log("the total amount of next clicks in a row is", totalNextClicks.current);

    console.log("RIGHT HER!!!")
    console.log("selected answer in next button is", selectedAnswer);
    // console.log("correct answer is", correctAnswer);
    let isItCorrect;
    // let totalErrors = 0;
    if (pageNumber !== undefined && (selectedAnswer !== "-" && selectedAnswer !== "")) {
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
          // setErrorAttempts(errorAttempts + 1);
          console.log("the selected answer length is", selectedAnswer.length);
          if (selectedAnswer === "-" || selectedAnswer === "" || (Array.isArray(selectedAnswer) && selectedAnswer.length === 0) || task === "Visuospatial Mini-trails A" || task === "Executive Mini-trails B") {
            setPrematureError(prematureError + 1);
          }
          else {
            setErrorAttempts(errorAttempts + 1);
          }
          // if (content['Task'][0]['content'] !== "Visuospatial Mini-trails A" && content['Task'][0]['content'] !== "Executive Mini-trails B") {
            // if (Array.isArray(selectedAnswer) && selectedAnswer.length !== 0 &&(content['Task'][0]['content'] === "Memory Five Words" || content['Task'][0]['content'] === "Visuospatial Image Combos")) {
            //   setErrorAttempts(errorAttempts + 1);
            // }
            // else if ((selectedAnswer !== "-" && selectedAnswer !== "") && (content['Task'][0]['content'] !== "Simple Attention" && content['Task'][0]['content'] !== "Memory Five Words" && content['Task'][0]['content'] !== "Visuospatial Image Combos")) {
            //   console.log("incremeting error attempts")
            //   setErrorAttempts(errorAttempts + 1);
            // }
            // else if (content['Task'][0]['content'] === "Simple Attention") {
            //   setErrorAttempts(errorAttempts + 1);
            // }
          // }
          console.log("error attempts is", errorAttempts);
          isItCorrect = false;
          console.log("Incorrect answer. Navigation prevented.");
          // event.preventDefault();
          if (totalNextClicks.current < 4) {
            event.preventDefault();
          }
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
        // setErrorAttempts(errorAttempts + 1);
        if (selectedAnswer === "-" || selectedAnswer === "" || (Array.isArray(selectedAnswer) && selectedAnswer.length === 0) || task === "Visuospatial Mini-trails A" || task === "Executive Mini-trails B") {
          setPrematureError(prematureError + 1);
        }
        else {
          setErrorAttempts(errorAttempts + 1);
        }
        // if (content['Task'][0]['content'] !== "Visuospatial Mini-trails A" && content['Task'][0]['content'] !== "Executive Mini-trails B") {

        //   if (Array.isArray(selectedAnswer) && selectedAnswer.length !== 0 &&(content['Task'][0]['content'] === "Memory Five Words" || content['Task'][0]['content'] === "Visuospatial Image Combos")) {
        //     setErrorAttempts(errorAttempts + 1);
        //   }
        //   else if ((selectedAnswer !== "-" && selectedAnswer !== "") && (content['Task'][0]['content'] !== "Simple Attention" && content['Task'][0]['content'] !== "Memory Five Words" && content['Task'][0]['content'] !== "Visuospatial Image Combos")) {
        //     console.log("incremeting error attempts")
        //     setErrorAttempts(errorAttempts + 1);
        //   }
        //   else if (content['Task'][0]['content'] === "Simple Attention") {
        //     setErrorAttempts(errorAttempts + 1);
        //   }
        // }
        console.log("error attempts is", errorAttempts);
        isItCorrect = false;
        console.log("Incorrect answer. Navigation prevented.");
        // For stroop test
        // event.preventDefault();
        if (totalNextClicks.current < 4) {
          event.preventDefault();
        }
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
          console.log("here")
          setFinalErrorMessage(errorMessage[0]);
          setError(true);
          isError = true;
        }        
      }
    }
    console.log("correct answer is", errorMessage.length)
    if (totalNextClicks.current === 4 && isError) {
      isError = false;
      handleTotalMoveForward(false);
      // totalMoveForward.current = totalMoveForward.current + 1;
      // console.log("new totalMove forward is", totalMoveForward.current);
    }
    if (!isError) {
      if((totalNextClicks.current !== 4 && typeOfQuestion !== "Instruction") || (isItCorrect && typeOfQuestion !== "Instruction")) {
        console.log("reset total move fowrard")
        handleTotalMoveForward(true);
        // totalMoveForward.current = 0;
      }
      let totalErrors = errorAttempts;
      if(!isItCorrect) {
        totalErrors = errorAttempts + 1;
      }
      console.log("start time is", startTime);
      console.log("current date.now() is", Date.now())
      // console.log("totalMoveForward.curent is", totalMoveForward.current);
      onAnswerChecked(isItCorrect, totalErrors, prematureError, Date.now() - startTime);
    }
    // console.log("the final error message is", finalErrorMessage);
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
