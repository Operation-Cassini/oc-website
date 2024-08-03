import React from 'react';
import './End.css';

const End = ({ tabCode }) => {

  return (
    <div className="end-container">
      <div className="end-message">
        <p>
          YOU’RE DONE WITH THE TEST!<br/><br/>
        </p>
      </div>

      <div className="end-message">
        <p>
          SAVE THIS NUMBER TO VIEW YOUR RESULTS<br/>
          {tabCode} <br/>
          YOU CAN VIEW YOUR RESULTS ON <a href="https://www.saturn-test.com">saturn-test.com</a>.
        </p>
      </div>
    </div>
  );
};

export default End;
