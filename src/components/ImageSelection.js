import React from 'react';
import './ImageSelection.css';

const ImageSelection = ({ images, rows, cols }) => {
  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px', // Adjust the gap between images if needed
    justifyContent: 'space-between',
  };

  const generateImages = () => {
    let imageElements = [];
    for (let i = 0; i < rows * cols; i++) {
      let image = images[i] || ''; // Get the image for the current position, empty string if none
      imageElements.push(
        <div
          key={i}
          className="image-container"
          style={{
            flexBasis: `calc(100% / ${cols} - 10px)`, // Adjust the width of each image container
          }}
        >
          {image && <img src={image} alt={`Selected ${i}`} className="image" />}
        </div>
      );
    }
    return imageElements;
  };

  return (
    <div className="image-selection" style={containerStyle}>
      {generateImages()}
    </div>
  );
};

export default ImageSelection;
