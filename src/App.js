<<<<<<< HEAD
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useParams} from 'react-router-dom';
import Home from './Home';
import Page from './DumbPage';
import ParseInputFile from './Parser'; 
import text from './input.txt';
import NextButton from './components/NextButton';

const App = () => {
  // State to store parsed page data
  const [pagesData, setPagesData] = React.useState([]);
  
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
    return (
      <div>
        <Page content={pageContent} />
        <NextButton to={`/page/${nextPageNumber}`}>NEXT</NextButton>
       
      </div>

    );
=======
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import text from './input.txt';
import './App.css';
import WordSelectionContainer from './components/WordSelectionContainer';
function parseInputFile(fileContent) {
  const lines = fileContent.split('\n');
  const pages = [];
  let current_page_data = {};

  lines.forEach(line => {
    line = line.trim();
    if (line === "") {
      if (Object.keys(current_page_data).length > 0) {
        const page = { ...current_page_data };
        pages.push(page);
        current_page_data = {};
      }
    } else {
      const [key, value] = line.split(": ", 2);
      current_page_data[key] = value;
    }
  });

  if (Object.keys(current_page_data).length > 0) {
    const page = { ...current_page_data };
    pages.push(page);
  }

  return pages;
}

const DumbPage = () => {
  const [fileContents, setFileContents] = useState(null);
  // const [rows, setRows] = useState(null);
  // const [columns, setColumns] = useState(null);
  // const [words, setWords] = useState([]);

  // Click handler
  const handleClick = (word) => {
    console.log('Selected word:', word);
>>>>>>> 0a9e422b8ffa362828426439fba97d64ea4ab370
  };
  useEffect(() => {
    fetch(text)
      .then(response => response.text())
      .then(fileContent => {
        const parsedContents = parseInputFile(fileContent);
        setFileContents(parsedContents);
        console.log(parsedContents)
        // const rows = parsedContents[0]['Dimensions'].split("x")[0];
        // const columns = parsedContents[0]['Dimensions'].split("x")[1];
        // let s = parsedContents[0]['Word Bank']
        // s = s.replace(/\s+/g, '');
        // const words = s.substring(1, s.length-1).split(",")
        // console.log(words)
        // setRows(rows);
        // setColumns(columns);
        // setWords(words);
      })
      .catch(error => {
        console.error('Error reading file:', error);
      });
  }, []);
  if (!fileContents) {
    return <div>Loading...</div>;
  }
  const rows = fileContents[0]['Dimensions'].split("x")[0];
  const columns = fileContents[0]['Dimensions'].split("x")[1];
  let s = fileContents[0]['Word Bank']
  s = s.replace(/\s+/g, '');
  const words = s.substring(1, s.length-1).split(",")
  const buttonDimensions = { width: '100px', height: '50px' };
  // const words = [
  //   ['Apple', 'Banana', 'Orange', 'Grapes'],
  //   ['Cat', 'Dog', 'Elephant', 'Lion'],
  //   ['Red', 'Blue', 'Green', 'Yellow']
  // ];
  return (
<<<<<<< HEAD
    <Router>
      <Routes>
        {/* Route for the home page */}
        <Route path="/" element={<Home />} />
        
        {/* Route for rendering individual pages */}
        {/* Use a parameter (e.g., ":pageNumber") to dynamically specify the page */}
        <Route path="/page/:pageNumber" element={<DynamicPageRenderer />} />
      </Routes>
    </Router>
  );
};

export default App;
=======
    <div>
      <h1>Word Selection</h1>
      <WordSelectionContainer
        rows={rows}
        columns={columns}
        buttonDimensions={buttonDimensions}
        onClick={handleClick}
        words={words}
      />
    </div>
  );
};

export default DumbPage;
>>>>>>> 0a9e422b8ffa362828426439fba97d64ea4ab370
