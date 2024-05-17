import React from 'react';
import './ImageSelection.css';

const ImageSelection = ({ images, rows, cols, onImageClick }) => {
  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px', // Adjust the gap between images if needed
    justifyContent: 'flex-start', // Align images to the start to prevent extra space at the end
  };


  const handleImageClick = (index) => {
    console.log('Clicked image index:', index);
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
            flexBasis: `calc((100% / ${cols}) - 10px)`, // Adjust the width of each image container
            boxSizing: 'border-box', // Include padding and border in the element's total width and height
          }}
        >
          {image && (
            <button
              onClick={() => handleImageClick(i)}
              className="image-button"
              style={{
                border: 'none',
                background: 'none',
                padding: 0,
                cursor: 'pointer',
                width: '100%', // Ensure the button takes full width of the container
                height: '100%', // Ensure the button takes full height of the container
              }}
            >
              <img src={image} alt={`Selected ${i}`} className="image" style={{ width: '100%', height: 'auto' }} />
            </button>
          )}
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
