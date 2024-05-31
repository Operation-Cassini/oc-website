import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders home page', async () => {
  render(<App />);
  
  // Wait for the data to load (if any async operation)
  // For example, if you're waiting for an image to load, you can use findByAltText
  await screen.findByAltText('saturn logo');
  
  // Assert that the home page content is rendered
  expect(screen.getByAltText('saturn logo')).toBeInTheDocument();
  
  // Assert that the link to the first page exists
  expect(screen.getByRole('link', { name: /START/i })).toBeInTheDocument();
});
