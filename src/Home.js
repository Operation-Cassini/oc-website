import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Home.css';
import Instruction from './components/Instruction';
import saturn from './saturn.png';

const Home = () => {
  const { t } = useTranslation();
  const [showOverlay, setShowOverlay] = useState(false);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const handleResize = () => {
      setShowOverlay((window.innerHeight > window.innerWidth) || (window.innerWidth < 900));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  useEffect(() => {
    const selectedLanguage = sessionStorage.getItem('selectedLanguage') || 'en'; // Default to English if not set
    setLanguage(selectedLanguage);
    sessionStorage.setItem('lastVisitedPage', -1);
  }, []); // Run this effect only once when the component mounts

  return (
    <div className="container">
      {showOverlay && (
        <div className="overlay">
          <Instruction text={"This window is too narrow to continue"} />
        </div>
      )}

      <div className="logo-container">
        <img src={saturn} alt="saturn logo" className="saturn-image"/>
      </div>
      <div className="start-button-container">
        <Link to="/page/0">
          <button className="start-button">
            {t('start')}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;