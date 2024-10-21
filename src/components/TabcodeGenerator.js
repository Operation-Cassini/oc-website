import React from 'react';
import Instruction from './Instruction';
import { useTranslation } from 'react-i18next';
import './TabcodeGenerator.css';

const TabcodeGenerator = ({ tabCode }) => {
  const { t } = useTranslation();
  return (
    <div>
      <Instruction 
      text={t('tabcode.save_this_number')}
      className = "instruction-box"/>
      <div className="tabcode-container">
        <p className="tabcode">{tabCode}</p>
      </div>
    </div>

  );
};

export default TabcodeGenerator;