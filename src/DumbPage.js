import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import StroopTextBox from './components/StroopTextBox';
import ButtonConnector from './components/ConnectTheBoxes';
import ImageSelection from './components/ImageSelection';
import FlashTextBoxes from './components/FlashTextBox';
import image1 from './ImageSelectionFaceJPGs/image-selection-face1.webp';
import image2 from './ImageSelectionFaceJPGs/image-selection-face2.webp';
import image3 from './ImageSelectionFaceJPGs/image-selection-face3.webp';
import image4 from './ImageSelectionFaceJPGs/image-selection-face4.webp';
import image5 from './ImageSelectionFaceJPGs/image-selection-face5.webp';
import image6 from './ImageSelectionFaceJPGs/image-selection-face6.webp';
import BlackBoarderTextBox from './components/BlackBoarderTextBox';

const DumbPage = () => {
  const characters = ['1', '2', '3', '4', '5'];
  const words = ['apple', 'pen', 'orange', 'drink', 'tea'];
  const images = [image1, image2, image3, image4, image5, image6];
  const handleImageClick = (index) => {
    console.log('Clicked image index:', index);
  };
  return (
    <div>
      <BlackBoarderTextBox>Text</BlackBoarderTextBox>
      <FlashTextBoxes texts={words} />
      <ButtonConnector characters={characters} />
      <ImageSelection images={images} rows={2} cols={3} onImageClick={handleImageClick} />
      <StroopTextBox textColor="red">BLUE</StroopTextBox> 
    </div>
  );
};

export default DumbPage;
