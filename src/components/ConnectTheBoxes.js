import React, { useState, useRef, useEffect } from 'react';
import './ConnectTheBox.css';

const ButtonConnector = ({ characters }) => {
  const [positions, setPositions] = useState([]);
  const [sequence, setSequence] = useState([]);
  const [clickedButtons, setClickedButtons] = useState([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    const newPositions = characters.map(() => ({
      x: Math.random() * (window.innerWidth - 100),
      y: Math.random() * (window.innerHeight - 100),
    }));
    setPositions(newPositions);
  }, [characters]);

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
    if (!clickedButtons.includes(index)) {
      setSequence([...sequence, index]);
      setClickedButtons([...clickedButtons, index]);
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
            backgroundColor: clickedButtons.includes(index) ? 'green' : (sequence.includes(index) ? 'red' : 'white'),
          }}
          onClick={() => handleClick(index)}
          disabled={clickedButtons.includes(index)}
        >
          {char}
        </button>
      ))}
    </div>
  );
};

export default ButtonConnector;
