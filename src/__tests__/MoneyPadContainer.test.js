// MoneyPadContainer.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MoneyPadContainer from '../components/MoneyPadContainer';
import NumberSelectionButton from '../components/NumberSelectionButton';

jest.mock('../components/NumberSelectionButton', () => (props) => (
  <button onClick={props.onClick} style={props.style}>{props.children}</button>
));

describe('MoneyPadContainer Component', () => {
  const mockOnClick = jest.fn();
  const rows = 3;
  const columns = 3;
  const buttonDimensions = { width: '50px', height: '50px' };
  const words = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const styledWords = [
    { content: '1', style: ['red'] },
    { content: '2', style: ['green'] },
  ];
  const pageNumber = 1;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => render(
    <MoneyPadContainer
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
    expect(buttons).toHaveLength(rows * columns + 1); // +1 for the delete button
  });

  test('applies styles correctly to buttons', () => {
    renderComponent();
    const button1 = screen.getByText('1');
    const button2 = screen.getByText('2');

    expect(button1).toHaveStyle('color: red');
    expect(button2).toHaveStyle('color: green');
  });

  test('handles button click correctly', () => {
    renderComponent();
    const button1 = screen.getByText('1');

    fireEvent.click(button1);

    expect(mockOnClick).toHaveBeenCalledWith('1');
  });

  test('handles delete button click correctly', () => {
    renderComponent();
    const button1 = screen.getByText('1');
    const deleteButton = screen.getByText('DELETE');

    fireEvent.click(button1);
    fireEvent.click(deleteButton);

    expect(mockOnClick).toHaveBeenCalledWith('1');
    expect(mockOnClick).toHaveBeenCalledWith('');
  });

  test('resets selected numbers when pageNumber changes', () => {
    const { rerender } = renderComponent();

    const button1 = screen.getByText('1');
    fireEvent.click(button1);
    expect(mockOnClick).toHaveBeenCalledWith('1');

    rerender(
      <MoneyPadContainer
        rows={rows}
        columns={columns}
        buttonDimensions={buttonDimensions}
        onClick={mockOnClick}
        words={words}
        styledWords={styledWords}
        pageNumber={2} // Change the pageNumber prop
      />
    );

    expect(mockOnClick).toHaveBeenCalledWith('');
  });
});
