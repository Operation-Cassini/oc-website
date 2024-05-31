// BlackBoarderTextBox.test.js
import React from 'react';
import { render } from '@testing-library/react';
import BlackBoarderTextBox from '../components/BlackBoarderTextBox';

describe('BlackBoarderTextBox', () => {
  test('renders the component with children', () => {
    const { getByText } = render(<BlackBoarderTextBox>Test Content</BlackBoarderTextBox>);
    const element = getByText('Test Content');
    expect(element).toBeInTheDocument();
  });

  test('applies the correct class', () => {
    const { container } = render(<BlackBoarderTextBox>Test Content</BlackBoarderTextBox>);
    const element = container.firstChild;
    expect(element).toHaveClass('text-box');
  });
});
