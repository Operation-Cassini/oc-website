import React from 'react';
import Instruction from './Instruction';
import './InstructionContainer.css';

function renderStyledContent(content) {
  console.log("the content is", content);
  if (!content || content.length === 0) return null;

  return content.map((part, index) => {
    const styleMap = {
      underline: { textDecoration: 'underline' },
      italic: { fontStyle: 'italic' },
      red: { color: 'red' },
      green: { color: 'green' },
      blue: { color: 'blue' },
      blueHighlight: { backgroundColor: '#85c7ff'},
      fadingBlueHighlight: {
        background: 'linear-gradient(to right, #0000ff, #0077ff, #00ccff, #66ffff)',
      }
    };

    const styles = part.style ? part.style.split(' ').map(s => styleMap[s]).reduce((acc, cur) => ({ ...acc, ...cur }), {}) : {};
    if (part.content.includes("\\n")) {
      console.log("lol")
      // Split content by "\n" and render each line separately
      const lines = part.content.split("\\n").map((line, lineIndex) => {
        console.log("line is", line);
        return (
        <React.Fragment key={lineIndex}>
          <span style={styles}>
            {line}
          </span>
          {/* Add <br /> except for the last line */}
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
