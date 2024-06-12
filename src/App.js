import React, { useEffect, useRef, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ParseInputFile, ParseMeanSDFile, ParseSaturnScoringFile } from './Parser';

import Page from './DumbPage';
import End from './End';
import Home from './Home';
import text from './input.txt';
import meanSDtext from './meanSD.txt';
import saturnScoringtext from './saturnScoring.txt';
import BlackBoarderTextBox from './components/BlackBoarderTextBox';

const generateRandomNumber = () => {
  return Math.floor(Math.random() * 900000) + 100000;
};

const TimerRedirect = ({ onTimerFinish, startTime }) => {
  const [timeLeft, setTimeLeft] = useState(1000);
  const [redirected, setRedirected] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!redirected && parseInt(location.pathname.split("/")[2]) >= 4) {
      const timer = setInterval(() => {
        setTimeLeft(prevTimeLeft => {
          if (prevTimeLeft === 0) {
            clearInterval(timer);
            setRedirected(true);
            return 0;
          } else {
            console.log("Redirecting in", prevTimeLeft, "seconds");
            return prevTimeLeft - 1;
          }
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [redirected, location.pathname]);

  // Move the navigate call here, outside of useEffect
  useEffect(() => {
    if (redirected) {
      navigate('/last');
      onTimerFinish(); // Call the onTimerFinish function passed from the App component
    }
  }, [redirected, navigate]);

  useEffect(() => {
    if (location.pathname === "/page/4") {
      startTime.current = Date.now();
      setTimeLeft(1000);
      setRedirected(false);
    }
  }, [location.pathname]);

  if (redirected) {
    return <Navigate to="/last" />;
  }

  return null;
};

const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only update the ref when the value changes
  if (ref.current === undefined) {
    return value - 1;
  }
  return ref.current;
};

const App = () => {
  // State to store parsed page data
  const [pagesData, setPagesData] = useState([]);
  const [lastPageNumber, setLastPageNumber] = useState(null);
  const [meanSDData, setMeanSDData] = useState([]);
  const [saturnScoringData, setSaturnScoringData] = useState([]);
  const motorSpeedLog = useRef([]);
  const startTime = useRef(Date.now());

  const tabCode = useRef(generateRandomNumber());
  const updateMotorSpeedLog = (entry) => {
    motorSpeedLog.current = [...motorSpeedLog.current, entry];
  }
  const [pageStatus, setPageStatus] = useState({});
  const handleAnswerStatus = (task, pageTitle, isCorrect, totalErrors, prematureError, totalTime, points, numWords) => {
    if (task === "") {
      return pageStatus;
    }
    setPageStatus(prevStatus => {
      // Clone the previous state to avoid direct mutation
      const newStatus = { ...prevStatus };

      // Initialize the task object if it doesn't exist
      if (!newStatus[task]) {
        newStatus[task] = {};
      }
      // Update the page data for the task
      newStatus[task][pageTitle] = { isCorrect, totalErrors, prematureError, totalTime, points, numWords};

      return newStatus;
    });
  };
  
  const totalMoveForward = useRef(0);
  const [willGenerateLastPage, setWillGenerateLastPage] = useState(false);
  const handleTotalMoveForward = (restartValue) => {
    if (restartValue) {
      totalMoveForward.current = 0;
    }
    else {
      totalMoveForward.current = totalMoveForward.current + 1;
    }
    if (totalMoveForward.current === 2) {
      setWillGenerateLastPage(true);
    }
  }
  // State to store the correct answer for the current page
  const [correctAnswer, setCorrectAnswer] = useState("-");
  const [correctRequirement, setCorrectRequirement] = useState("-");

  const [timerFinished, setTimerFinished] = useState(false); // State to track if timer is finished
  const handleTimerFinish = () => {
    setTimerFinished(true);
  };

  // Function to fetch and parse data
  useEffect (() => {
    // Fetch and read the input file
    fetch(text)
      .then(response => response.text())
      .then(fileContent => {
        // Parse the input file and set the state with the parsed data
        const parsedPagesData = ParseInputFile(fileContent);
        setPagesData(parsedPagesData);

        const lastPageNum = parsedPagesData.length - 1;
        setLastPageNumber(lastPageNum);
      })
      .catch(error => {
        console.error('Error reading file:', error);
      });

    fetch(meanSDtext)
      .then(response => response.text())
      .then(fileContent => {
        // Parse the input file and set the state with the parsed data
        const parsedContents = ParseMeanSDFile(fileContent);
        setMeanSDData(parsedContents);
      })
      .catch(error => {
        console.error('Error reading file:', error);
      });

    fetch(saturnScoringtext)
      .then(response => response.text())
      .then(fileContent => {
        // Parse the input file and set the state with the parsed data
        const parsedContents = ParseSaturnScoringFile(fileContent);
        setSaturnScoringData(parsedContents);
      })
      .catch(error => {
        console.error('Error reading file:', error);
      });
  }, []);

  const calculateScores = () => {
    const currentTime = Date.now();
    const tasks = Object.keys(pageStatus);
    const results = {};
    let totalScore = 0;
    const predictiveTasks = ["Simple Attention", "Executive Stroop", "Math", "Orientation", "Memory Incidental"]
    let totalPreditiveTasks = 0;
    let totalPredictiveTaskZScore = 0;
    tasks.forEach(task => {
      let totalErrors = 0;
      const pageTitles = Object.keys(pageStatus[task]);
      const totalTimes = pageTitles.map(pageTitle => pageStatus[task][pageTitle].totalTime);
      const totalTime = totalTimes.reduce((acc, curr) => acc + curr, 0);
      const totalPoints = pageTitles.map(pageTitle => pageStatus[task][pageTitle].points);
      let totalPoint = totalPoints.reduce((acc, curr) => acc + curr, 0);

      const totalWords = pageTitles.map(pageTitle => pageStatus[task][pageTitle].numWords);
      const READING_SPEED_LOG = [];

      for (let i = 0; i < totalTimes.length; i++) {
        const timeInSeconds = totalTimes[i] / 1000;
        const wordCount = totalWords[i];
        const readingSpeed = parseFloat((wordCount / timeInSeconds).toFixed(3));
        READING_SPEED_LOG.push(readingSpeed);
      }

      const sortedReadingSpeeds = READING_SPEED_LOG.slice().sort((a, b) => a - b);

      // Step 2: Determine if the array length is odd or even
      const isOddLength = sortedReadingSpeeds.length % 2 !== 0;
      const middleIndex = Math.floor(sortedReadingSpeeds.length / 2);
      
      // Step 3: Calculate the median
      let median;
      if (isOddLength) {
        median = sortedReadingSpeeds[middleIndex];
      } else {
        median = (sortedReadingSpeeds[middleIndex - 1] + sortedReadingSpeeds[middleIndex]) / 2;
      }
      
      const meanTotalTime = totalTime / totalTimes.length;
      let sdData = 0;
      let zScore;
      if (task !== "Instruction") {
        sdData = meanSDData[task];
        zScore = (meanTotalTime - sdData.mean) / sdData.sd;
      }
      else {
        sdData = meanSDData["Read Speed"] // this is for instructions
        zScore = (median - sdData.mean) / sdData.sd;
      }

      // Calculate z-score for each page title within the task
      if (task === "Executive Stroop") {
        pageTitles.forEach(pageTitle => {
          const pageData = pageStatus[task][pageTitle];
          if (pageData.totalErrors > 0) {
            totalErrors = totalErrors + pageData.totalErrors;
          }
        });
        totalPoint = 3 - totalErrors  - (12 - pageTitles.length);
        if (totalPoint < 0) {
          totalPoint = 0;
        }
      }

      if (task === "Instruction") {
        task = "Reading Speed"
      }
      if (median !== 0 && task === "Reading Speed") {
        results[task] = {
          zscore: zScore,
          "reading speed": median
        };
      }
      else if (median !== 0) {
        results[task] = {
          zscore: zScore,
          totalTime: totalTime/1000,
          points: totalPoint,
          "reading speed": median
        };
      }
      else {
        results[task] = {
          zscore: zScore,
          totalTime: totalTime/1000,
          points: totalPoint,
        };
      }
      totalScore = totalScore + totalPoint;
      if (predictiveTasks.includes(task)) {
        totalPredictiveTaskZScore = totalPredictiveTaskZScore + zScore;
        totalPreditiveTasks++;
      }
    });

    const sortedMotorSpeedLog = motorSpeedLog.current.slice().sort((a, b) => a - b);

    // Step 2: Determine if the array length is odd or even
    const isOddLength = sortedMotorSpeedLog.length % 2 !== 0;
    const middleIndex = Math.floor(sortedMotorSpeedLog.length / 2);
    
    // Step 3: Calculate the median
    let median;
    if (isOddLength) {
      median = sortedMotorSpeedLog[middleIndex];
    } else {
      median = (sortedMotorSpeedLog[middleIndex - 1] + sortedMotorSpeedLog[middleIndex]) / 2;
    }
    
    let sdData = meanSDData["Motor Speed"] // this is for instructions
    let zScore = (median - sdData.mean) / sdData.sd;

    results["Motor Speed"] = {
      zscore: zScore,
      "motor speed": median
    };

    results["Total Points"] = {
      points: totalScore
    }
    const totalTime = currentTime - startTime.current;
    results["Total Time"] = {
      time: totalTime / 60000
    }


    results["Mean of Predictive Z Scores"] = {
      zscore: totalPredictiveTaskZScore/totalPreditiveTasks
    }
    console.log("Results:", results);
    let finalResults = {};

    finalResults[tabCode.current] = results;
    console.log("Final results:", finalResults);
    return finalResults;
  };
  
  const DynamicPageRenderer = () => {
    // Extract the page number from the route parameters
    const { pageNumber } = useParams();
    const navigate = useNavigate();
    const previousPageNumber = usePrevious(parseInt(pageNumber)); // Use the usePrevious hook to track the previous page number
    // Assuming pagesData is available here
    // Fetch the content for the specified page number
    const pageContent = pagesData[pageNumber];
    const nextPageNumber = parseInt(pageNumber) + 1;

    useEffect(() => {
      const pageNum = parseInt(pageNumber);
      if (willGenerateLastPage) {
      }
      if (pageNum >= 0  && previousPageNumber !== pageNum - 1 || lastPageNumber === null) {
        setPageStatus([]);
        navigate('/');
      }

      if (pageNumber > lastPageNumber && lastPageNumber !== null) {
        setWillGenerateLastPage(true);
      } else {
        setWillGenerateLastPage(false);
      }

      if (pageContent) {
        setCorrectAnswer(pageContent['Correct Answer'][0]['content']);
        setCorrectRequirement(pageContent['Correct Requirement'][0]['content']);
      }
    }, [pageNumber, pageContent, lastPageNumber, previousPageNumber]);

    useEffect(() => {
      if (willGenerateLastPage) {
        // Navigate to the last page when willGenerateLastPage is true
        calculateScores();
        navigate('/last');
      }
    }, [willGenerateLastPage, navigate]);

    // Check if pageContent is defined
    if (!pageContent) {
      return <BlackBoarderTextBox>Loading...</BlackBoarderTextBox>;
    }

    return (
      <div>
        <Page
          tabCode={tabCode.current} 
          content={pageContent} 
          correctAnswer={correctAnswer} 
          correctRequirement={correctRequirement}
          onAnswerChecked={handleAnswerStatus}
          handleTotalMoveForward={handleTotalMoveForward}
          setMotorSpeedLog={updateMotorSpeedLog} 
          to={`/page/${nextPageNumber}`}  
        />
      </div>
    );
  };

  return (
    <Router>
      <TimerRedirect onTimerFinish={handleTimerFinish} startTime={startTime} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/page/:pageNumber" element={<DynamicPageRenderer />} />
        <Route path="/last" element={<End />} />
        {timerFinished && <Route path="/last" element={<End />} />}
        {!timerFinished && <Route path="/last" element={<Navigate to="/" />} />}
      </Routes>
    </Router>
  );
};

export default App;
