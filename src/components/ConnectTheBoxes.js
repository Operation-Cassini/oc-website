import React, { useEffect, useRef, useState } from 'react';
import './ConnectTheBox.css';

const ConnectTheBoxes = ({ characters, positions, pageNumber }) => {
  const [sequence, setSequence] = useState([]);
  const [incorrect, setIncorrect] = useState(null); // Track incorrect click
  const canvasRef = useRef(null);

  useEffect(() => {
    // Reset the sequence when the page number changes
    setSequence([]);
  }, [pageNumber]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;

    const buttonSize = 50;
    const halfButtonSize = buttonSize / 2;

    for (let i = 0; i < sequence.length - 1; i++) {
      const start = positions[sequence[i]];
      const end = positions[sequence[i + 1]];
      ctx.beginPath();
      ctx.moveTo(start.x + halfButtonSize, start.y + halfButtonSize);
      ctx.lineTo(end.x + halfButtonSize, end.y + halfButtonSize);
      ctx.stroke();
    }
  }, [sequence, positions]);

  const handleClick = (index) => {
    if (sequence.length === index) {
      setSequence([...sequence, index]);
      setIncorrect(null); // Reset incorrect state if clicked in the correct order
    } else {
      setIncorrect(index); // Set incorrect state if clicked out of order
    }
  };

  return (
    <div className="button-connector">
      <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} />
      {characters.map((char, index) => (
        <button
          key={index}
          style={{
            position: 'absolute',
            left: positions[index]?.x,
            top: positions[index]?.y,
            width: '50px',
            height: '50px',
            fontSize: '18px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: sequence.includes(index)
              ? 'green'
              : incorrect === index
              ? 'red'
              : 'white',
          }}
          onClick={() => handleClick(index)}
          disabled={sequence.includes(index)}
        >
          {char}
        </button>
      ))}
    </div>
  );
};

export default ConnectTheBoxes;
