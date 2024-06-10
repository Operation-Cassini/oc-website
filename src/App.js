import React, { useEffect, useRef, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';

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

const TimerRedirect = ({ onTimerFinish }) => {
  const [timeLeft, setTimeLeft] = useState(6000);
  const [redirected, setRedirected] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!redirected) {
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
  }, [redirected]);

  // Move the navigate call here, outside of useEffect
  useEffect(() => {
    if (redirected) {
      navigate('/screen1');
      onTimerFinish(); // Call the onTimerFinish function passed from the App component
    }
  }, [redirected, navigate]);

  useEffect(() => {
    if (location.pathname === "/") {
      console.log("resetting timer")
      setTimeLeft(6000);
      setRedirected(false);
    }
  }, [location.pathname]);

  if (redirected) {
    return <Navigate to="/screen1" />;
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

  // const [pageStatus, setPageStatus] = useState([]);

  // const handleAnswerStatus = (pageTitle, isCorrect, totalErrors, totalTime) => {
  //     setPageStatus([...pageStatus, { pageTitle, isCorrect, totalErrors, totalTime}]);
  // };
  const [pageStatus, setPageStatus] = useState({});

  const handleAnswerStatus = (task, pageTitle, isCorrect, totalErrors, totalTime, points) => {
    console.log("we have", task, pageTitle, isCorrect, totalErrors, totalTime, points);
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
      newStatus[task][pageTitle] = { isCorrect, totalErrors, totalTime, points};

      return newStatus;
    });
  };
  
  console.log("page status is", pageStatus);
  // const previousPageNumber = usePrevious(null);

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
    const tasks = Object.keys(pageStatus);
    console.log("tasks are", tasks);
    const results = {};
    tasks.forEach(task => {
      let totalErrors = 0;
      console.log("task is", task);
      const pageTitles = Object.keys(pageStatus[task]);
      console.log("pageTitles are", pageTitles);
      const totalTimes = pageTitles.map(pageTitle => pageStatus[task][pageTitle].totalTime);
      const totalTime = totalTimes.reduce((acc, curr) => acc + curr, 0);
      console.log("totalTimes is", totalTimes);

      const totalPoints = pageTitles.map(pageTitle => pageStatus[task][pageTitle].points);
      console.log("totalPoints is", totalPoints)
      let totalPoint = totalPoints.reduce((acc, curr) => acc + curr, 0);
      console.log("totalPoint is", totalPoint)

      const meanTotalTime = totalTime / totalTimes.length;
      console.log("meanTotalTime is", meanTotalTime)
      const sdData = meanSDData[task];
      console.log("sdData is", sdData);
      // Calculate z-score for each page title within the task
      const zScore = (meanTotalTime - sdData.mean) / sdData.sd;
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
        totalPoint = 3 - totalErrors;
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
      results[task] = {
        zscore: zScore,
        totalTime: totalTime,
        points: totalPoint
      };
    });
    console.log("Results:", results);
    return results;
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
    const [willGenerateLastPage, setWillGenerateLastPage] = useState(false);
    const navigate = useNavigate();
    console.log("pageNumber!!!!!!", parseInt(pageNumber));
    const previousPageNumber = usePrevious(parseInt(pageNumber)); // Use the usePrevious hook to track the previous page number
    // console.log("previous pagenumber!!!!", previousPageNumber)
    // Assuming pagesData is available here
    // Fetch the content for the specified page number
    const pageContent = pagesData[pageNumber];
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
      if (pageNumber > lastPageNumber) {
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
          content={pageContent} 
          correctAnswer={correctAnswer} 
          correctRequirement={correctRequirement}
          onAnswerChecked={handleAnswerStatus} 
          // to={willGenerateLastPage ? '/last' : `/page/${nextPageNumber}`}
          to={`/page/${nextPageNumber}`}  
        />
      </div>
    );
  };

  return (
    <Router>
      <TimerRedirect onTimerFinish={handleTimerFinish} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/page/:pageNumber" element={<DynamicPageRenderer />} />
        <Route path="/last" element={<End />} />
        {timerFinished && <Route path="/screen1" element={<Screen1 />} />}
        {!timerFinished && <Route path="/screen1" element={<Navigate to="/" />} />}
      </Routes>
    </Router>
  );
};

export default App;
