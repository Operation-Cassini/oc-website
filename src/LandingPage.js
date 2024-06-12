import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import logo from './saturn.png'; // Assuming logo is in the same directory

const LandingPage = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="landing-container">
      <div className="top-section">
        <img src={logo} alt="Saturn Logo" className="logo" />
        <div className="welcome-text">
          <h1>WELCOME TO SATURN</h1>
          <div className="blurb">
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
          </div>
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
