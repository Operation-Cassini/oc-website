import React, { useEffect, useState, useRef} from 'react';
import { Route, BrowserRouter as Router, Routes, useParams, Navigate, useNavigate, useLocation } from 'react-router-dom';

import Page from './DumbPage';
import End from './End';
import Home from './Home';
import { ParseInputFile, ParseMeanSDFile, ParseSaturnScoringFile } from './Parser';
import text from './input.txt';
import meanSDtext from './meanSD.txt';
import saturnScoringtext from './saturnScoring.txt';

import Screen1 from './Screen1';
import BlackBoarderTextBox from './components/BlackBoarderTextBox';


// import TimerRedirect from './TimerRedirect'
import NextButton from './components/NextButton';
import TabcodeGenerator from './components/TabcodeGenerator';

const generateRandomNumber = () => {
  // Generate a random number between 100,000 and 999,999
  return Math.floor(Math.random() * 900000) + 100000;
};

const TimerRedirect = ({ onTimerFinish, startTime }) => {
  const [timeLeft, setTimeLeft] = useState(1000);
  const [redirected, setRedirected] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("location.pathname.split[2] is", location.pathname.split("/")[2]);
    if (!redirected && parseInt(location.pathname.split("/")[2]) >= 4) {
      const timer = setInterval(() => {
        setTimeLeft(prevTimeLeft => {
          if (prevTimeLeft === 0) {
            clearInterval(timer);
            setRedirected(true);
            return 0; // Return 0 without navigating here
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
      console.log("new startTime is", startTime.current)
      console.log("resetting timer")
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
  console.log("value is", value);
  useEffect(() => {
    console.log("in here since value changed");
    ref.current = value;
  }, [value]); // Only update the ref when the value changes
  console.log("right here, ref.current is", ref.current, value);
  if (ref.current === undefined) {
    console.log("returning value - 1 with value as", value);
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
  // const [motorSpeedLog, setMotorSpeedLog] = useState([]);
  const motorSpeedLog = useRef([]);
  const startTime = useRef(Date.now());
  console.log("initial startTime is", startTime.current);

  const tabCode = useRef(generateRandomNumber());
  // const generateRandomNumber = () => {
  //   // Generate a random number between 100,000 and 999,999
  //   return Math.floor(Math.random() * 900000) + 100000;
  // };

  // const [pageStatus, setPageStatus] = useState([]);

  // const handleAnswerStatus = (pageTitle, isCorrect, totalErrors, totalTime) => {
  //     setPageStatus([...pageStatus, { pageTitle, isCorrect, totalErrors, totalTime}]);
  // };
  const updateMotorSpeedLog = (entry) => {
    console.log("ENTRY IS", entry);
    // motorSpeedLog.push(entry);
   motorSpeedLog.current = [...motorSpeedLog.current, entry];
    console.log("HERE IS MOTOR SPEED LOG", motorSpeedLog);
  }
  const [pageStatus, setPageStatus] = useState({});
  // const [totalWords, setTotalWords] = useState(0);
  const handleAnswerStatus = (task, pageTitle, isCorrect, totalErrors, prematureError, totalTime, points, numWords) => {
    console.log("we have", task, pageTitle, isCorrect, totalErrors, totalTime, points);
    console.log("NUM WORDS IS!!!!!!!!!!!!", numWords)
    console.log("page title is", pageTitle);
    // console.log("total words is", totalWords)
    // if (pageTitle.includes("Instruction")) {
    //   setTotalWords(totalWords + numWords);
    // }
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
  
  console.log("page status is", pageStatus);
  // const previousPageNumber = usePrevious(null);
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
  console.log("totalMoveForward is", totalMoveForward.current);
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
        console.log("this is the mean sd file that was parsed", parsedContents);
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
        console.log("this is the saturn scoring file that was parsed", parsedContents);
      })
      .catch(error => {
        console.error('Error reading file:', error);
      });
  }, []);

  // Effect to parse input file on component mount
  // useEffect(() => {
  //   const initialLoadDone = localStorage.getItem('initialLoadDone');
  //   if (!initialLoadDone || performance.navigation.type === 1) { // Detect page reload
  //     fetchData();
  //     localStorage.setItem('initialLoadDone', 'true');
  //   }
  // }, []);
  const calculateScores = () => {
    const currentTime = Date.now();
    const tasks = Object.keys(pageStatus);
    console.log("tasks are", tasks);
    const results = {};
    let totalScore = 0;
    const predictiveTasks = ["Simple Attention", "Executive Stroop", "Math", "Orientation", "Memory Incidental"]
    let totalPreditiveTasks = 0;
    let totalPredictiveTaskZScore = 0;
    tasks.forEach(task => {
      let totalErrors = 0;
      console.log("task is", task);
      const pageTitles = Object.keys(pageStatus[task]);
      console.log("pageTitles are", pageTitles);
      const totalTimes = pageTitles.map(pageTitle => pageStatus[task][pageTitle].totalTime);
      console.log("totalTimes is", totalTimes)
      const totalTime = totalTimes.reduce((acc, curr) => acc + curr, 0);
      console.log("totalTime is", totalTime);

      const totalPoints = pageTitles.map(pageTitle => pageStatus[task][pageTitle].points);
      console.log("totalPoints is", totalPoints)
      let totalPoint = totalPoints.reduce((acc, curr) => acc + curr, 0);
      console.log("totalPoint is", totalPoint)

      const totalWords = pageTitles.map(pageTitle => pageStatus[task][pageTitle].numWords);
      console.log("totalWords is", totalWords)
      // let totalWord = totalWords.reduce((acc, curr) => acc + curr, 0);
      // console.log("totalWord is", totalWord)

      // let readingSpeed = totalWord !== 0 ? totalTime/totalWord : 0;

      const READING_SPEED_LOG = [];

      for (let i = 0; i < totalTimes.length; i++) {
        const timeInSeconds = totalTimes[i] / 1000;
        const wordCount = totalWords[i];
        const readingSpeed = parseFloat((wordCount / timeInSeconds).toFixed(3));
        READING_SPEED_LOG.push(readingSpeed);
      }

      console.log("THE READING LOG IS", READING_SPEED_LOG);

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
      
      console.log("Median IS THIS:", median);

      const meanTotalTime = totalTime / totalTimes.length;
      console.log("meanTotalTime is", meanTotalTime)
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
      console.log("sdData is", sdData);

        // Calculate z-score for each page title within the task
      console.log("THE Z SCORE FOR TASK", task, "is", zScore);
      console.log("THE TOTAL TIME SPENT FOR TASK", task, "is", totalTime);
      if (task === "Executive Stroop") {
        pageTitles.forEach(pageTitle => {
          const pageData = pageStatus[task][pageTitle];
          console.log("pageData is", pageData);
          if (pageData.totalErrors > 0) {
            totalErrors = totalErrors + pageData.totalErrors;
          }
        });
        console.log("total errors and pagetitles length", totalErrors, pageTitles.length)
        totalPoint = 3 - totalErrors  - (12 - pageTitles.length);
        if (totalPoint < 0) {
          totalPoint = 0;
        }
        console.log("we have this many points", totalPoint, "for stroop");
      }
      // pageTitles.forEach(pageTitle => {
      //   const pageData = pageStatus[task][pageTitle];
      //   console.log("pageData is", pageData);
      //   if (pageData.totalErrors > 0) {
      //     hasErrors = true;
      //     console.log(`Task: ${task}, Page: ${pageTitle}, Errors: ${pageData.totalErrors}`);
      //   }
      // });
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
    
    console.log("Median IS THIS:", median);
    let sdData = meanSDData["Motor Speed"] // this is for instructions
    let zScore = (median - sdData.mean) / sdData.sd;
    // const totalTime = motorSpeedLog.current.reduce((acc, currentValue) => acc + currentValue, 0);
    // const totalPoint = 0;
    // console.log("Results:", results);
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
      // pageTitles.forEach(pageTitle => {
      //   const totalTime = pageStatus[task][pageTitle].totalTime;
      //   const zScore = (meanTotalTime - sdData.mean) / sdData.sd;
      //   // Store z-score and total time for the page title within the task
      //   // Here you can decide where to store this data, perhaps in a separate state or object
      //   console.log(`For task '${task}' and page title '${pageTitle}':`);
      //   console.log(`Total time: ${totalTime}`);
      //   console.log(`Z-score: ${zScore}`);
      //   console.log("--------------------------");
      // });
  };
  
  const DynamicPageRenderer = () => {
    // Extract the page number from the route parameters
    const { pageNumber } = useParams();
    // const [willGenerateLastPage, setWillGenerateLastPage] = useState(false);
    const navigate = useNavigate();
    console.log("pageNumber!!!!!!", parseInt(pageNumber));
    const previousPageNumber = usePrevious(parseInt(pageNumber)); // Use the usePrevious hook to track the previous page number
    // console.log("previous pagenumber!!!!", previousPageNumber)
    // Assuming pagesData is available here
    // Fetch the content for the specified page number
    const pageContent = pagesData[pageNumber];
    console.log("pageContent is", pageContent);
    const nextPageNumber = parseInt(pageNumber) + 1;

    useEffect(() => {
      const pageNum = parseInt(pageNumber);
      console.log("pageNumber is!", pageNumber);
      console.log("previousPageNumber is!", previousPageNumber);
      if (willGenerateLastPage) {
        console.log("will generate last page is true");
      }
      if (pageNum >= 0  && previousPageNumber !== pageNum - 1 || lastPageNumber === null) {
        console.log("why are we here")
        console.log("pageNumber is", pageNumber);
        console.log("previousPageNumber is", previousPageNumber);
        setPageStatus([]);
        navigate('/');
      }

      console.log("page num, lastpagenum", pageNumber, lastPageNumber);
      if (pageNumber > lastPageNumber && lastPageNumber !== null) {
        setWillGenerateLastPage(true);
      } else {
        setWillGenerateLastPage(false);
      }

      if (pageContent) {
        console.log("previous pagenumber!!!!", previousPageNumber)

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
          // to={willGenerateLastPage ? '/last' : `/page/${nextPageNumber}`}
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
