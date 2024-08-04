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
      simpleAttention,
      orientation,
      memoryFiveWords,
      memoryIncidental,
      math,
      visuospatialImageCombos,
      executiveStroop,
      visuospatialMiniTrailsA,
      executiveMiniTrailsB,
      createdAt,
      readingSpeed,
    } = searchResult;

    return (
      <div className="search-result scrollable-box">
        <h3>Test Results:</h3>
        <p><strong>Total Points:</strong> {totalPoints} +1 / 30</p>
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
        
          <div className="info-box">
          <p>
          Take this test on a tablet, desktop, or laptop computer. <br />
              {isExpanded && (
                <span>
                  {' '}
                  <br />
                  This version does not ask what state someone is in, simply awards that point. <b>A perfect score is "29+1 / 30".</b>  <br />
                  <br />The original program is fully in the public domain, and validated against the Montreal Cognitive Assessment (MoCA) (PMC7771179). <br />
                  <br />
                  This version was inspired by Dr. Assecondi's browser-based version on the Prolific platform (PMC10533744), 
                  and developed by Kayla Rose Hom, Eric Kho, Emily Loh, & Amanda Tu as a capstone project for ECS193AB @ University of California - Davis. 
                  The developers, along with David Bissig, "defer to UC Davis on copyright matters because this was developed as part of a class assignment" (2024-JUN-12 ~5pm PST).<br />  
                  
                </span>
              )}
            </p>
            <span className="show-more" onClick={toggleExpand}>
              {isExpanded ? 'Show Less' : 'Show Technical Info'}
            </span>
          </div>
          <h1>SELECT YOUR LANGUAGE</h1>
          <div className="landing-button-language-container">
          <Link to="/Home" className="landing-button">English</Link>
          <Link to="/Home" className="landing-button">Chinese <br /> (Coming soon)</Link>
          <Link to="/Home" className="landing-button">Spanish <br /> (Coming soon)</Link>
          
        </div>
      </div>
    </div>
      
      <div className="bottom-section">
      <div className="search-bar-container">
            <input
              type="text"
              placeholder="Have a 7-Digit Code? Enter it here..."
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
    
  );
};

export default LandingPage;