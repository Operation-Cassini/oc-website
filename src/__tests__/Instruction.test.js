// Instruction.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Instruction from '../components/Instruction';

describe('Instruction Component', () => {
  test('renders the text prop', () => {
    render(<Instruction text="Test Instruction" />);
    const instructionElement = screen.getByText('Test Instruction');
    expect(instructionElement).toBeInTheDocument();
  });

  test('applies the className prop', () => {
    render(<Instruction text="Test Instruction" className="test-class" />);
    const instructionElement = screen.getByText('Test Instruction');
    expect(instructionElement).toHaveClass('test-class');
  });

  test('applies the style prop', () => {
    const style = { color: 'red' };
    render(<Instruction text="Test Instruction" style={style} />);
    const instructionElement = screen.getByText('Test Instruction');
    expect(instructionElement).toHaveStyle('color: red');
  });

  test('renders with both className and style props', () => {
    const style = { color: 'blue' };
    render(<Instruction text="Test Instruction" className="test-class" style={style} />);
    const instructionElement = screen.getByText('Test Instruction');
    expect(instructionElement).toHaveClass('test-class');
    expect(instructionElement).toHaveStyle('color: blue');
  });
});
