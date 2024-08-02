import { generateClient } from "aws-amplify/api";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import { getSaturnTestData } from './graphql/queries';
import logo from './saturn.png'; // Assuming logo is in the same directory

const client = generateClient();

const LandingPage = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSearchChange = (e) => {
    setSearchResult(false);
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async () => {
    if (searchQuery.length !== 7 || isNaN(searchQuery)) {
      setErrorMessage('Please enter a valid 7-digit code.');
      return;
    }

    try {
      const response = await client.graphql({
        query: getSaturnTestData,
        variables: {
          id: searchQuery,
        },
      });

      if (response.data.getSaturnTestData) {
        setSearchResult(response.data.getSaturnTestData);
        setErrorMessage('');
      } else {
        setErrorMessage('No data found for the entered code.');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred while fetching the data.');
    }
  };

  const renderCategoryData = (categoryData) => {
    return categoryData.map((item, index) => {
      const parsedItem = JSON.parse(item);
      return (
        <div key={index} className="category-data">
          {parsedItem.totalTime !== undefined && <p>Total Time: {parsedItem.totalTime}</p>}
          {parsedItem.zscore !== undefined && <p>Z-Score: {parsedItem.zscore}</p>}
          {parsedItem.points !== undefined && <p>Points: {parsedItem.points}</p>}
          {parsedItem["motor speed"] && <p>Motor Speed: {parsedItem["motor speed"]}</p>}
          {parsedItem["reading speed"] && <p>Reading Speed: {parsedItem["reading speed"]}</p>}
        </div>
      );
    });
  };

  const renderSearchResult = () => {
    if (!searchResult) return null;

    const {
      totalPoints,
      totalTime,
      createdAt,
      executiveMiniTrailsB,
      executiveStroop,
      math,
      meanPredictiveZScores,
      memoryFiveWords,
      memoryIncidental,
      motorSpeed,
      orientation,
      readingSpeed,
      simpleAttention,
      visuospatialImageCombos,
      visuospatialMiniTrailsA,
    } = searchResult;

    return (
      <div className="search-result scrollable-box">
        <h3>Test Results:</h3>
        <p><strong>Total Points:</strong> {totalPoints} / 29</p>
        <p><strong>Total Time:</strong> {totalTime.toFixed(1)} minutes</p>
        <div><strong>Simple Attention:</strong> {renderCategoryData(simpleAttention)}</div>
        <div><strong>Orientation:</strong> {renderCategoryData(orientation)}</div>
        <div><strong>Memory Five Words:</strong> {renderCategoryData(memoryFiveWords)}</div>
        <div><strong>Memory Incidental:</strong> {renderCategoryData(memoryIncidental)}</div>
        <div><strong>Math:</strong> {renderCategoryData(math)}</div>
        <div><strong>Image Matching:</strong> {renderCategoryData(visuospatialImageCombos)}</div>
        <div><strong>Stroop:</strong> {renderCategoryData(executiveStroop)}</div>
        <div><strong>Mini Trails A:</strong> {renderCategoryData(visuospatialMiniTrailsA)}</div>
        <div><strong>Mini Trails B:</strong> {renderCategoryData(executiveMiniTrailsB)}</div>
        <p><strong>Time Test Taken:</strong> {new Date(createdAt).toLocaleString()}</p>
        <div><strong>Reading Speed:</strong> {renderCategoryData(readingSpeed)}</div>
      </div>
    );
  };

  return (
    <div className="landing-container">
      <div className="top-section">
        <img src={logo} alt="Saturn Logo" className="logo" />
        <div className="welcome-text">
          <h1>WELCOME TO SATURN</h1>
          <div className="info-box">
            <p>
              SATURN is a free, public-domain cognitive screening test.
              {isExpanded && (
                <span>
                  {' '}It is self-administered, automatically scored, and can be taken on inexpensive tablets. SATURN includes various tasks that assess orientation, memory, visuospatial function, and other cognitive abilities, making it an accessible tool for early detection of cognitive decline. For optimal results, it is recommended to take the test on a large screen, preferably a computer, and it is not recommended to take it on a phone.
                </span>
              )}
            </p>
            <span className="show-more" onClick={toggleExpand}>
              {isExpanded ? 'Show Less' : 'Show More'}
            </span>
          </div>
          <div className="search-bar-container">
            <input
              type="text"
              placeholder="Enter 7-Digit Tabcode..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-bar"
            />
            <button onClick={handleSearchSubmit} className="search-button">Search</button>
          </div>
          <div className='error-message-container'>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
          {renderSearchResult()}
        </div>
      </div>
      <h2>Please select your preferred language.</h2>
      <div className="bottom-section">
        <div className="landing-button-language-container">
          <Link to="/Home" className="landing-button">English</Link>
          <Link to="/Home" className="landing-button">Chinese (Coming soon)</Link>
          <Link to="/Home" className="landing-button">Vietnamese (Coming soon)</Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
