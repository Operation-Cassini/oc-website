import React, { useEffect, useState, useRef } from 'react';
import { Route, BrowserRouter as Router, Routes, useParams, Navigate, useNavigate } from 'react-router-dom';

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

const TimerRedirect = ({ onTimerFinish }) => {
  const [timeLeft, setTimeLeft] = useState(6000);
  const [redirected, setRedirected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!redirected) {
      const timer = setInterval(() => {
        setTimeLeft(prevTimeLeft => {
          if (prevTimeLeft === 0) {
            clearInterval(timer);
            setRedirected(true);
            return 0; // Return 0 without navigating here
          } else {
            // console.log("Redirecting in", prevTimeLeft, "seconds");
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

  if (redirected) {
    return <Navigate to="/screen1" />;
  }

  return null;
};

const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only update the ref when the value changes
  console.log("right here, ref.current is", ref.current, value);
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
      if (pageNum > 0  && previousPageNumber !== pageNum - 1) {
        console.log("why are we here")
        console.log("pageNumber is", pageNumber);
        console.log("previousPageNumber is", previousPageNumber);
        navigate('/');
      }

      if (pageNumber >= lastPageNumber) {
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
          to={willGenerateLastPage ? '/last' : `/page/${nextPageNumber}`} 
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
