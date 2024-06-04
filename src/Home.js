import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import saturn from './saturn.png';
import Instruction from './components/Instruction';
import TabcodeGenerator from './components/TabcodeGenerator';

const Home = () => {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShowOverlay(window.innerWidth < 800);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="container">
      {showOverlay && (
        <div className="overlay">
          <Instruction text={"This window is too narrow to continue"} />
        </div>
      )}

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