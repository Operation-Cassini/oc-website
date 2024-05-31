// MultiWordSelectionContainer.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MultiWordSelectionContainer from '../components/MultiWordSelectionContainer';
import WordSelectionButton from '../components/WordSelectionButton';

jest.mock('../components/WordSelectionButton', () => (props) => (
  <button onClick={props.onClick} style={props.style} className={props.className}>
    {props.children}
  </button>
));

describe('MultiWordSelectionContainer Component', () => {
  const mockOnClick = jest.fn();
  const rows = 3;
  const columns = 3;
  const buttonDimensions = { width: '50px', height: '50px' };
  const words = ['Word1', 'Word2', 'Word3', 'Word4', 'Word5', 'Word6', 'Word7', 'Word8', 'Word9'];
  const styledWords = [
    { content: 'Word1', style: ['red'] },
    { content: 'Word2', style: ['green'] },
  ];
  const pageNumber = 1;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => render(
    <MultiWordSelectionContainer
      rows={rows}
      columns={columns}
      buttonDimensions={buttonDimensions}
      onClick={mockOnClick}
      words={words}
      styledWords={styledWords}
      pageNumber={pageNumber}
    />
  );

  test('renders the component with the correct number of buttons', () => {
    renderComponent();
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(rows * columns);
  });

  test('applies styles correctly to buttons', () => {
    renderComponent();
    const button1 = screen.getByText('Word1');
    const button2 = screen.getByText('Word2');

    expect(button1).toHaveStyle('color: red');
    expect(button2).toHaveStyle('color: green');
  });

  test('handles button click correctly', () => {
    renderComponent();
    const button1 = screen.getByText('Word1');
    const button2 = screen.getByText('Word2');

    // Select Word1
    fireEvent.click(button1);
    expect(mockOnClick).toHaveBeenCalledWith(['Word1']);

    // Select Word2
    fireEvent.click(button2);
    expect(mockOnClick).toHaveBeenCalledWith(['Word1', 'Word2']);

    // Deselect Word1
    fireEvent.click(button1);
    expect(mockOnClick).toHaveBeenCalledWith(['Word2']);
  });

  test('resets selected words when pageNumber changes', () => {
    const { rerender } = renderComponent();

    const button1 = screen.getByText('Word1');
    fireEvent.click(button1);
    expect(mockOnClick).toHaveBeenCalledWith(['Word1']);

    rerender(
      <MultiWordSelectionContainer
        rows={rows}
        columns={columns}
        buttonDimensions={buttonDimensions}
        onClick={mockOnClick}
        words={words}
        styledWords={styledWords}
        pageNumber={2} // Change the pageNumber prop
      />
    );

    expect(mockOnClick).toHaveBeenCalledWith([]);
  });
});
