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

function parseStyledText(text) {
  const styledParts = [];
  const regex = /(_([^_]+)_|\*([^*]+)\*|{([^}]+)}|\+([^+]+)\+|~([^~]+)~|([^_*{}+~]+))/g;

  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match[2]) {
      const nestedParts = parseStyledText(match[2]);
      styledParts.push({ style: 'underline', content: nestedParts });
    } else if (match[3]) {
      const nestedParts = parseStyledText(match[3]);
      styledParts.push({ style: 'italic', content: nestedParts });
    } else if (match[4]) {
      const nestedParts = parseStyledText(match[4]);
      styledParts.push({ style: 'red', content: nestedParts });
    } else if (match[5]) {
      const nestedParts = parseStyledText(match[5]);
      styledParts.push({ style: 'green', content: nestedParts });
    } else if (match[6]) {
      const nestedParts = parseStyledText(match[6]);
      styledParts.push({ style: 'blue', content: nestedParts });
    } else if (match[7]) {
      styledParts.push({ style: null, content: match[7] });
    }
  }

  return styledParts;
}
function ParseInputFile(fileContent) {
  const lines = fileContent.split('\n');
  const pages = [];
  let currentPageData = {};

  lines.forEach(line => {
    line = line.trim();
    if (line === "") {
      if (Object.keys(currentPageData).length > 0) {
        pages.push({ ...currentPageData });
        currentPageData = {};
      }
    } else {
      const [key, value] = line.split(": ", 2);
      if (key && value) {
        currentPageData[key] = parseStyledText(value);
      }
    }
  });

  if (Object.keys(currentPageData).length > 0) {
    pages.push({ ...currentPageData });
  }

  return pages;
}

export default ParseInputFile;

