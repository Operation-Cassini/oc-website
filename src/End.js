import React from 'react';
import './End.css';
import { useTranslation } from 'react-i18next';

const End = ({ tabCode }) => {
  const { t } = useTranslation();

  return (
    <div className="end-container">
      <div className="end-message">
        <p>
          {t('end.done_with_test')}<br/><br/>
        </p>
      </div>

      <div className="end-message">
        <p>
          {t('end.save_number_to_view_results')}<br/>
          {tabCode} <br/>
          {t('end.view_results_on')} <a href="https://www.saturn-test.com">saturn-test.com</a>.
        </p>
      </div>
    </div>
  );
};

export default End;