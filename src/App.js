import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes, useParams } from 'react-router-dom';
import Page from './DumbPage';
import End from './End';
import Home from './Home';
import ParseInputFile from './Parser';
import text from './input.txt';
// import NextButton from './components/NextButton';

const App = () => {
  // State to store parsed page data
  const [pagesData, setPagesData] = React.useState([]);
  const [lastPageNumber, setLastPageNumber] = React.useState(null);

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
      setCorrectAnswer(pageContent['Correct Answer']);
      setCorrectRequirement(pageContent['Correct Requirement'])
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