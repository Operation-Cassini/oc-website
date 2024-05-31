import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ConnectTheBoxes from '../components/ConnectTheBoxes';

// describe('ConnectTheBoxes', () => {
//   const mockCharacters = ['A', 'B', 'C'];
//   const mockPositions = [{ x: 10, y: 20 }, { x: 30, y: 40 }, { x: 50, y: 60 }];

//   test('renders without crashing', () => {
//     render(<ConnectTheBoxes characters={mockCharacters} positions={mockPositions} pageNumber={1} />);
//     const canvasElement = screen.getByRole('canvas');
//     const buttons = screen.getAllByRole('button');
//     expect(canvasElement).toBeInTheDocument();
//     expect(buttons).toHaveLength(mockCharacters.length);
//   });

//   test('updates sequence on button click', () => {
//     render(<ConnectTheBoxes characters={mockCharacters} positions={mockPositions} pageNumber={1} />);
//     const button = screen.getByRole('button', { name: /A/i });
//     fireEvent.click(button);
//     expect(screen.getByRole('button', { name: /A/i })).toHaveStyle({ backgroundColor: 'green' });
//   });

//   // Add more tests as needed for other functionality and effects
// });
