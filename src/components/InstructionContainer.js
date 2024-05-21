import React from 'react';
import Instruction from './Instruction';
import './InstructionContainer.css';

const styleMap = {
  underline: { textDecoration: 'underline' },
  italic: { fontStyle: 'italic' },
  red: { color: 'red' },
  green: { color: 'green' },
  blue: { color: 'blue' }
};

function renderStyledContent(content) {
  if (!content || content.length === 0) return null;

  return content.map((part, index) => {
    const styleMap = {
      underline: { textDecoration: 'underline' },
      italic: { fontStyle: 'italic' },
      red: { color: 'red' },
      green: { color: 'green' },
      blue: { color: 'blue' }
    };

    const styles = part.style ? part.style.split(' ').map(s => styleMap[s]).reduce((acc, cur) => ({ ...acc, ...cur }), {}) : {};

    return (
      <span key={index} style={styles}>
        {Array.isArray(part.content) ? renderStyledContent(part.content) : part.content}
      </span>
    );
  });
}

const InstructionContainer = ({ instructions }) => {
  return (
    <>
      <div className="instruction-container">
        {instructions.map((instruction, index) => (
          <div key={index} className="instruction-box">
              <Instruction 
                key={index} 
                text={renderStyledContent(instruction)} 
              />
          </div>
        ))}
      </div>
    </>
  )
}

export default InstructionContainer;
