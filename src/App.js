import React, { useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import Home from './Home';
import Page from './DumbPage';
import ParseInputFile from './Parser';
import text from './input.txt';
import NextButton from './components/NextButton';

const App = () => {
  // State to store parsed page data
  const [pagesData, setPagesData] = React.useState([]);


  // State to store the correct answer for the current page
  const [correctAnswer, setCorrectAnswer] = React.useState(null);

  // Effect to parse input file on component mount
  React.useEffect(() => {
    // Fetch and read the input file
    fetch(text)
      .then(response => response.text())
      .then(fileContent => {
        // Parse the input file and set the state with the parsed data
        const parsedPagesData = ParseInputFile(fileContent);
        setPagesData(parsedPagesData);
      })
      .catch(error => {
        console.error('Error reading file:', error);
      });
  }, []);

  const DynamicPageRenderer = () => {
    // Extract the page number from the route parameters
    const { pageNumber } = useParams();

    // Assuming pagesData is available here
    // Fetch the content for the specified page number
    const pageContent = pagesData[pageNumber];
    const nextPageNumber = parseInt(pageNumber) + 1;


    useEffect(() => {
      // Fetch the content for the specified page number
      // Update the correct answer state
      setCorrectAnswer(pageContent['Correct Answer']);
    }, [pageNumber]);

    return (
      <div>
        <Page content={pageContent} correctAnswer = {correctAnswer} to={`/page/${nextPageNumber}`} />
      </div>
    );
  };

  return (
    <Router>
      <Routes>
        {/* Route for the home page */}
        <Route path="/" element={<Home />} />
        <Route path="/page/:pageNumber" element={<DynamicPageRenderer />} />
      </Routes>
    </Router>
  );
};

export default App;