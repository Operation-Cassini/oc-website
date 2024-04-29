import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import StroopTextBox from './components/StroopTextBox';
import ImageSelection from './components/ImageSelection';
import image1 from './ImageSelectionFaceJPGs/image-selection-face1.webp';
import image2 from './ImageSelectionFaceJPGs/image-selection-face2.webp';
import image3 from './ImageSelectionFaceJPGs/image-selection-face2.webp';
import image4 from './ImageSelectionFaceJPGs/image-selection-face2.webp';
import image5 from './ImageSelectionFaceJPGs/image-selection-face2.webp';
import image6 from './ImageSelectionFaceJPGs/image-selection-face2.webp';

const DumbPage = () => {
  return (
    <div>
      <ImageSelection
        images={[image1, image2, image3, image4, image5, image6]}
        rows={2}
        cols={3}
      />
    </div>
  );
};

export default DumbPage;
