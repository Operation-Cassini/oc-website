// FlashTextBoxes.test.js

import React from 'react';
import { render, screen, act } from '@testing-library/react';
import FlashTextBox from '../components/FlashTextBox';
import { createMemoryHistory } from 'history';
import { BrowserRouter as Router } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.useFakeTimers(); // Use fake timers for the interval

describe('FlashTextBox', () => {
  const texts = ['Text 1', 'Text 2', 'Text 3'];
  const nextPage = 2;

  // Create a memory history object
  const history = createMemoryHistory();

  const renderComponent = () => {
    render(
      <Router>
        <FlashTextBox texts={texts} nextPage={nextPage} />
      </Router>
    );
  };

  test('renders the component with initial text', () => {
    renderComponent();
    expect(screen.getByText('Text 1')).toBeInTheDocument();
  });

  test('cycles through the texts and shows overlay', () => {
    renderComponent();

    // Check initial state
    expect(screen.getByText('Text 1')).toBeInTheDocument();
    // expect(screen.queryByText('Text 2')).not.toBeInTheDocument();

    // Advance timers by 4 seconds to the next text
    act(() => {
      jest.advanceTimersByTime(4000);
    });

    // Check state after advancing timers
    expect(screen.getByText('Text 2')).toBeInTheDocument();
    // expect(screen.queryByText('Text 1')).not.toBeInTheDocument();

    // Advance timers by another 4 seconds to the next text
    act(() => {
      jest.advanceTimersByTime(4000);
    });

    expect(screen.getByText('Text 3')).toBeInTheDocument();
    // expect(screen.queryByText('Text 2')).not.toBeInTheDocument();
  });

  test('navigates to the next page after all cycles are completed', () => {
    render(
      <Router history={history}>
        <FlashTextBox texts={texts} nextPage={nextPage} />
      </Router>
    );
  
    // Advance timers to complete all cycles
    act(() => {
      jest.advanceTimersByTime(12000); // 3 texts * 4 seconds each = 12 seconds
    });
  
    // Check the current location (route) after the navigation
    expect(history.location.pathname).toBe('/page/2');
  });
});
