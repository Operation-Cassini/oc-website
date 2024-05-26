import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes, useParams } from 'react-router-dom';
import Page from './DumbPage';
import End from './End';
import Home from './Home';
import { ParseInputFile, ParseMeanSDFile, ParseSaturnScoringFile } from './Parser';
import text from './input.txt';
import meanSDtext from './meanSD.txt';
import saturnScoringtext from './saturnScoring.txt';
// import NextButton from './components/NextButton';

const App = () => {
  // State to store parsed page data
  const [pagesData, setPagesData] = React.useState([]);
  const [lastPageNumber, setLastPageNumber] = React.useState(null);
  const [meanSDData, setMeanSDData] = useState([]);
  const [saturnScoringData, setSaturnScoringData] = useState([]);

  // State to store the correct answer for the current page
  const [correctAnswer, setCorrectAnswer] = React.useState("-");
  const [correctRequirement, setCorrectRequirement] = React.useState("-");
  // Effect to parse input file on component mount
  React.useEffect(() => {
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
          console.log("this is the saturning scoring file that was parsed", parsedContents);
        })
        .catch(error => {
          console.error('Error reading file:', error);
        });
  }, []);

  const DynamicPageRenderer = () => {
    // Extract the page number from the route parameters
    const { pageNumber } = useParams();
    const [willGenerateLastPage, setWillGenerateLastPage] = React.useState(false);

    // Assuming pagesData is available here
    // Fetch the content for the specified page number
    const pageContent = pagesData[pageNumber];
    const nextPageNumber = parseInt(pageNumber) + 1;

    useEffect(() => {
      if (pageNumber >= lastPageNumber) {
        setWillGenerateLastPage(true);
      } else {
        setWillGenerateLastPage(false);
      }

      // Fetch the content for the specified page number
      // Update the correct answer state
      setCorrectAnswer(pageContent['Correct Answer'][0]['content']);
      setCorrectRequirement(pageContent['Correct Requirement'][0]['content']);
    }, [pageNumber]);


    return (
      <div>
        <Page 
          content={pageContent} 
          correctAnswer = {correctAnswer} 
          correctRequirement = {correctRequirement} 
          to={willGenerateLastPage ? '/last' : `/page/${nextPageNumber}`} />
      </div>
    );
  };

  return (
    <Router>
      <Routes>
        {/* Route for the home page */}
        <Route path="/" element={<Home />} />
        <Route path="/page/:pageNumber" element={<DynamicPageRenderer />} />
        <Route path="/last" element={<End />} />
      </Routes>
    </Router>
  );
};

export default App;