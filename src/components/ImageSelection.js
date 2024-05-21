import React, { useEffect, useState } from 'react';
import './ImageSelection.css';

const ImageSelection = ({ images, rows, cols, pageNumber }) => {
  const [selectedImageIndices, setSelectedImageIndices] = useState([]);

  useEffect(() => {
    // Reset selected image indices when the page number changes
    setSelectedImageIndices([]);
  }, [pageNumber]);

  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '5px', // Adjust the gap between images if needed
    justifyContent: 'flex-start', // Align images to the start to prevent extra space at the end
    width: `${cols * 190 + (cols - 1) * 5}px`, // Calculate the width to fit the number of columns and gap
  };

  const handleImageClick = (index) => {
    // Toggle the selection of the clicked image index
    console.log("image clicked: ", index);
    setSelectedImageIndices((prevIndices) => {
      if (prevIndices.includes(index)) {
        // If the index is already selected, remove it
        return prevIndices.filter((idx) => idx !== index);
      } else {
        // If the index is not selected, add it
        return [...prevIndices, index];
      }
    });
  };

  const generateImages = () => {
    let imageElements = [];
    for (let i = rows * cols - 1; i >= 0; i--) {
      let image = images[i] || ''; // Get the image for the current position, empty string if none
      imageElements.push(
        <div
          key={i}
          className={`image-container ${selectedImageIndices.includes(i) ? 'selected' : ''}`}
          style={{
            width: '190px', // Adjust the width of each image container
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