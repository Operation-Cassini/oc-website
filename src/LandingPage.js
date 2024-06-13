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
    if (searchQuery.length !== 6 || isNaN(searchQuery)) {
      setErrorMessage('Please enter a valid 6-digit code.');
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
        console.log(response.data);
        setErrorMessage('No data found for the entered code.');
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('An error occurred while fetching the data.');
    }
  };

  const renderSearchResult = () => {
    if (!searchResult) return null;

    const { totalPoints, totalTime, meanPredictiveZScores } = searchResult;
    const formattedTotalTime = totalTime.toFixed(2);
    const formattedZScores = meanPredictiveZScores.map(score => score.toFixed(2)).join(', ');

    return (
      <div className="search-result">
        <h3>Test Results:</h3>
        <p><strong>Total Points:</strong> {totalPoints}</p>
        <p><strong>Total Time:</strong> {formattedTotalTime} minutes</p>
        <p><strong>Mean Predictive Z Scores:</strong> {formattedZScores}</p>
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
              SATURN is a free, public-domain cognitive screening test designed to uncover the risk of neurodegeneration. 
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
              placeholder="Enter Tabcode..."
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
          <Link to="/Home" className="landing-button">Chinese</Link>
          <Link to="/Home" className="landing-button">Vietnamese</Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
