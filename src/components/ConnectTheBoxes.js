import React, { useEffect, useRef, useState } from 'react';
import './ConnectTheBox.css';

const ConnectTheBoxes = ({ characters, positions, onClick, pageNumber }) => {
  const [sequence, setSequence] = useState([]);
  const [incorrect, setIncorrect] = useState(null);
  const [numCorrect, setNumCorrect] = useState(0);
  const [errorAttempts, setErrorAttempts] = useState(0);

  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const updateCanvasAndButtons = () => {
    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');

    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;

    const buttonSize = 50;
    const halfButtonSize = buttonSize / 2;

    for (let i = 0; i < sequence.length - 1; i++) {
      const start = positions[sequence[i]];
      const end = positions[sequence[i + 1]];
      ctx.beginPath();
      ctx.moveTo(
        (start.x / 100) * container.clientWidth ,
        (start.y / 100) * container.clientHeight
      );
      ctx.lineTo(
        (end.x / 100) * container.clientWidth ,
        (end.y / 100) * container.clientHeight
      );
      ctx.stroke();
    }
  };

  useEffect(() => {
    setSequence([]);
  }, [pageNumber]);

  useEffect(() => {
    const handleResize = () => {
      updateCanvasAndButtons();
    };

    window.addEventListener('resize', handleResize);
    updateCanvasAndButtons();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [sequence, positions]);

  useEffect(() => {
    updateCanvasAndButtons();
  }, [sequence, positions]);

  const handleClick = (index) => {
    if (sequence.length === index) {
      setSequence([...sequence, index]);
      setIncorrect(null);
      onClick(numCorrect + 1, errorAttempts);
      setNumCorrect(numCorrect + 1);
    } else {
      setIncorrect(index);
      setErrorAttempts(errorAttempts + 1);
      console.log("error attempts is", errorAttempts);
    }
    console.log("num correct: " + numCorrect);
  };

  return (
    <div className="outer-container">
      <div className="centered-container">
        <div ref={containerRef} className="button-connector">
          <canvas ref={canvasRef} />
          {characters.map((char, index) => {
            const container = containerRef.current;
            if (!container) return null;

            return (
              <button
                key={index}
                style={{
                  position: 'absolute',
                  left: `${positions[index]?.x}%`,
                  top: `${positions[index]?.y}%`,
                  width: '50px',
                  height: '50px',
                  fontSize: '18px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: sequence.includes(index)
                  ? 'white'
                  : incorrect === index
                  ? 'black'
                  : 'black',
                  backgroundColor: sequence.includes(index)
                    ? 'green'
                    : incorrect === index
                    ? 'red'
                    : 'white',
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={() => handleClick(index)}
                disabled={sequence.includes(index)}
              >
                {char}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ConnectTheBoxes;