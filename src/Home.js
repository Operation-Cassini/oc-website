import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import saturn from './saturn.png';

const Home = () => {

  return (
    <div className="container">
      <div className="SATURN-png">
        <img src={saturn} alt="saturn logo" />
      </div>
      <div className="start-button-container">
        <Link to="/page/0">
          <button className="start-button">START</button>
        </Link>
      </div>
    </div>

    
  );
};

export default Home;
