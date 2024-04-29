import React from 'react';
import './ImageSelection.css';

const ImageSelection = ({ images, rows, cols }) => {
  // Calculate the width of each image container
  const containerWidth = `${100 / cols}%`;

  return (
    <div className="image-selection">
      {images.map((image, index) => (
        <div key={index} className="image-container" style={{ width: containerWidth }}>
          <img src={image} alt={`Image ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};

export default ImageSelection;
