import React, { useEffect, useRef, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ParseInputFile, ParseMeanSDFile, ParseSaturnScoringFile } from './Parser';
import { languageSignal } from './signal'; // Import the signal
import { useTranslation } from 'react-i18next';

import Page from './DumbPage';
import End from './End';
import Home from './Home';
import EnglishText from './input/English.txt';
import SpanishText from './input/Spanish.txt';
import SimplifiedChineseText from './input/SimplifiedChinese.txt';
import TraditionalChineseText from './input/TraditionalChinese.txt';
import KoreanText from './input/Korean.txt';
import meanSDtext from './meanSD.txt';
import saturnScoringtext from './saturnScoring.txt';
import BlackBoarderTextBox from './components/BlackBoarderTextBox';
import LandingPage from './LandingPage';

// AWS API for Database
import { generateClient } from "aws-amplify/api";
import { createSaturnTestData, updateSaturnTestData, deleteSaturnTestData} from './graphql/mutations';
import { getSaturnTestData, listSaturnTestData } from './graphql/queries';

const client = generateClient();

async function createDatabaseEntry(client, createSaturnTestData, finalResults) {
  const promise = client.graphql({
    query: createSaturnTestData,
    variables: {
      input: finalResults
    }
  });

  try {
    console.log("Starting send");
    await promise;
    console.log("Finish send");
  } catch (error) {
    console.log(error);
    if (client.isCancelError(error)) {
      console.log(error.message);
    }
  }
}

function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

const generateRandomNumber = () => {
  return Math.floor(Math.random() * 9000000) + 1000000;
};

const checkIfNumberExists = async (number) => {
  const response = await client.graphql({
    query: listSaturnTestData,
    variables: {
      filter: {
        id: {
          eq: number.toString()
        }
      }
    }
  });
  return response.data.listSaturnTestData.items.length > 0;
};

const generateUniqueSixDigitCode = async () => {
  let uniqueCode;
  let isUnique = false;

  while (!isUnique) {
    uniqueCode = generateRandomNumber();
    isUnique = !(await checkIfNumberExists(uniqueCode));
  }

  return uniqueCode;
};

const TimerRedirect = ({ onTimerFinish, startTime }) => {
  const [timeLeft, setTimeLeft] = useState(900);
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
      setTimeLeft(900);
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
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en'); // State for language


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

  const [tabCode, setTabCode] = useState(null);

  const languageMapping = {
    en: EnglishText,
    es: SpanishText,
    szh: SimplifiedChineseText,
    tzh: TraditionalChineseText,
    kor: KoreanText,
  };
  
  const getTextFile = () => {
    return languageMapping[languageSignal] || EnglishText; // Return the text file based on current language
  };

  useEffect(() => {
    const fetchTextFile = () => {
      const textFile = getTextFile();
      console.log(textFile);
      console.log(languageSignal);
      // Fetch and read the input file // Get the appropriate text file
      fetch(textFile)
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
    };

    const unsubscribe = languageSignal.subscribe(() => {
      fetchTextFile(); // Fetch the text file when the language changes
    });
    fetchTextFile();

    const fetchData = async () => {
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

      // Generate a unique tab code
      const uniqueCode = await generateUniqueSixDigitCode();
      setTabCode(uniqueCode);
    };

    fetchData();
    fetchTextFile();

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  const calculateScores = () => {
    const currentTime = Date.now();
    const tasks = Object.keys(pageStatus);
    const results = {};
    let totalScore = 0;
    const predictiveTasks = ["Simple Attention", "Executive Stroop", "Math", "Orientation", "Memory Incidental"];
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
      } else {
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

    const finalResults = {
      id: (tabCode).toString(),
      totalPoints: results["Total Points"] ? results["Total Points"].points : 0,
      totalTime: results["Total Time"] ? results["Total Time"].time : 0,
      executiveMiniTrailsB: results["Executive Mini-trails B"] ? [JSON.stringify(results["Executive Mini-trails B"])] : [],
      executiveStroop: results["Executive Stroop"] ? [JSON.stringify(results["Executive Stroop"])] : [],
      math: results["Math"] ? [JSON.stringify(results["Math"])] : [],
      meanPredictiveZScores: results["Mean of Predictive Z Scores"] ? [results["Mean of Predictive Z Scores"].zscore] : [],
      memoryFiveWords: results["Memory Five Words"] ? [JSON.stringify(results["Memory Five Words"])] : [],
      memoryIncidental: results["Memory Incidental"] ? [JSON.stringify(results["Memory Incidental"])] : [],
      motorSpeed: results["Motor Speed"] ? [JSON.stringify(results["Motor Speed"])] : [],
      orientation: results["Orientation"] ? [JSON.stringify(results["Orientation"])] : [],
      readingSpeed: results["Reading Speed"] ? [JSON.stringify(results["Reading Speed"])] : [],
      simpleAttention: results["Simple Attention"] ? [JSON.stringify(results["Simple Attention"])] : [],
      visuospatialImageCombos: results["Visuospatial Image Combos"] ? [JSON.stringify(results["Visuospatial Image Combos"])] : [],
      visuospatialMiniTrailsA: results["Visuospatial Mini-trails A"] ? [JSON.stringify(results["Visuospatial Mini-trails A"])] : []
    };
    
    
    const debouncedCreateDatabaseEntry = debounce(createDatabaseEntry, 300);
    debouncedCreateDatabaseEntry(client, createSaturnTestData, finalResults);
    return finalResults;    
  };

  const DynamicPageRenderer = () => {
    const { t } = useTranslation();
    // Extract the page number from the route parameters
    const { pageNumber } = useParams();
    const navigate = useNavigate();
    const previousPageNumber = usePrevious(parseInt(pageNumber)); // Use the usePrevious hook to track the previous page number
    // Assuming pagesData is available here
    // Fetch the content for the specified page number
    const pageContent = pagesData[pageNumber];
    const nextPageNumber = parseInt(pageNumber) + 1;

    const getCurrentDay = () => {
      const days = [
        t('days.sunday'),
        t('days.monday'),
        t('days.tuesday'),
        t('days.wednesday'),
        t('days.thursday'),
        t('days.friday'),
        t('days.saturday')
      ];
      const currentDayIndex = new Date().getDay(); // 0 (Sunday) to 6 (Saturday)
      return days[currentDayIndex]; // Returns the current day in uppercase
    };
  
    const getCurrentMonth = () => {
      const months = t('months', { returnObjects: true });
      const currentMonthIndex = new Date().getMonth(); // 0 (January) to 11 (December)
      return months[currentMonthIndex]; // Returns the current month in uppercase
    };
    
    const getCurrentYear = () => {
      return new Date().getFullYear().toString(); // Returns the current year as a string
    };

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
        if (pageContent['Page Title'][0]['content'] === 'Day of the Week') {
          setCorrectAnswer(getCurrentDay());
          console.log(getCurrentDay());
        } else if (pageContent['Page Title'][0]['content'] === 'Year'){
          setCorrectAnswer(getCurrentYear());
          console.log(getCurrentYear());
        } else if (pageContent['Page Title'][0]['content'] === 'Month'){
          setCorrectAnswer(getCurrentMonth());
          console.log(getCurrentMonth());
        } else {
          setCorrectAnswer(pageContent['Correct Answer'][0]['content']);
        }
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
          tabCode={tabCode} 
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
    <>
      <TimerRedirect onTimerFinish={handleTimerFinish} startTime={startTime} />
      <Routes>
      <Route path="/" element={<LandingPage />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/page/:pageNumber" element={<DynamicPageRenderer />} />
        <Route path="/last" element={<End tabCode={tabCode} />} />
        {timerFinished && <Route path="/last" element={<End />} />}
        {!timerFinished && <Route path="/last" element={<Navigate to="/" />} />}
      </Routes>
    </>
  );
};

export default App;