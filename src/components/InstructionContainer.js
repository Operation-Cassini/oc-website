import React from 'react';
import Instruction from './Instruction';
import './InstructionContainer.css';

function renderStyledContent(content) {
  if (!content || content.length === 0) return null;

  return content.map((part, index) => {
    const styleMap = {
      underline: { textDecoration: 'underline' },
      italic: { fontStyle: 'italic' },
      red: { color: 'red' },
      green: { color: '#00b500' },
      blue: { color: 'blue' },
      blueHighlight: { backgroundColor: '#85c7ff'},
      fadingBlueHighlight: {
        background: 'linear-gradient(to right, #85c7ff, #AEDAFF, #C8E6FF, #FFFFFF)',
      },
      yellow: { color: '#d0bc2a' },
      brown: {color: '#964B00' }
    };

    const styles = part.style ? part.style.split(' ').map(s => styleMap[s]).reduce((acc, cur) => ({ ...acc, ...cur }), {}) : {};
    if (part.style === null) {
      if (part.content.startsWith("/")) {
        return (
          <img key={index} src={part.content} style={{ backgroundColor: 'transparent' }} alt="Content image" />
        );
      }
    }

    if (part.content.includes("\\n")) {
      // Split content by "\n" and render each line separately
      const lines = part.content.split("\\n").map((line, lineIndex) => {
        return (
        <React.Fragment key={lineIndex}>
          <span style={styles}>
            {line}
          </span>
          {lineIndex !== part.content.split("\\n").length - 1 && <br />}
        </React.Fragment>
      );
    });
      return lines;
    }
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