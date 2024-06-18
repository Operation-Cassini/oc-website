import React, { useState } from 'react';
import './ImageSelection.css';

const ImageSelection = ({ images, rows, cols, onClick, pageNumber }) => {
  const [selectedImageIndices, setSelectedImageIndices] = useState([]);

  const handleImageClick = (index) => {
    // Toggle the selection of the clicked image index
    setSelectedImageIndices((prevIndices) => {
      if (prevIndices.includes(index)) {
        // If the index is already selected, remove it
        onClick(prevIndices.filter((idx) => idx !== index));
        return prevIndices.filter((idx) => idx !== index);
      } else {
        // If the index is not selected, add it
        onClick([...prevIndices, index]);
        return [...prevIndices, index];
      } 
    });
  };

  // Calculate the width of each image container based on the number of columns and screen size
  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
    gap: '2px', // Adjust the gap between images if needed
    justifyContent: 'flex-start', // Align images to the start to prevent extra space at the end
    maxWidth: '35%', // Ensure the container doesn't overflow
  };

  const generateImages = () => {
    let imageElements = [];
    for (let i = 0; i < rows * cols; i++) {
      let image = images[i] || ''; // Get the image for the current position, empty string if none
      imageElements.push(
        <div
          key={i}
          className={`image-container ${selectedImageIndices.includes(i) ? 'selected' : ''}`}
          style={{
            height: 'auto', // Adjust the height of each image container if needed
            boxSizing: 'border-box', // Include padding and border in the element's total width and height
            position: 'relative', // Necessary for the overlay
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
                position: 'relative',
              }}
            >
              <img src={image} alt={`Selected ${i}`} className="image" />
            </button>
          )}
        </div>
      );
    }
    return imageElements;
  };

  return (
    <div className="general-container">
      <div className="image-selection-container" style={containerStyle}>
        {generateImages()}
      </div>
    </div>
  );
};

export default ImageSelection;
