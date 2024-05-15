import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import text from './input.txt';
import './App.css';
// import StroopTextBox from './components/StroopTextBox';
// import ImageSelection from './components/ImageSelection';
// import image1 from './ImageSelectionFaceJPGs/image-selection-face1.webp';
// import image2 from './ImageSelectionFaceJPGs/image-selection-face2.webp';
// import image3 from './ImageSelectionFaceJPGs/image-selection-face2.webp';
// import image4 from './ImageSelectionFaceJPGs/image-selection-face2.webp';
// import image5 from './ImageSelectionFaceJPGs/image-selection-face2.webp';
// import image6 from './ImageSelectionFaceJPGs/image-selection-face2.webp';
import WordSelectionContainer from './components/WordSelectionContainer';

function ParseInputFile(fileContent) {
  const lines = fileContent.split('\n');
  const pages = [];
  let current_page_data = {};

  lines.forEach(line => {
    line = line.trim();
    if (line === "") {
      if (Object.keys(current_page_data).length > 0) {
        const page = { ...current_page_data };
        pages.push(page);
        current_page_data = {};
      }
    } else {
      const [key, value] = line.split(": ", 2);
      current_page_data[key] = value;
    }
  });
  // console.log(current_page_data);
  if (Object.keys(current_page_data).length > 0) {
    const page = { ...current_page_data };
    pages.push(page);
  }

  return pages;
}

export default ParseInputFile;
