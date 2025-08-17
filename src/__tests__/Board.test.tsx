import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Board from '../components/Board';

// Mock the Square component to simplify testing
vi.mock('../components/Square', () => ({
  default: ({ value, onClick, isWinningSquare }: { value: string | null, onClick: () => void, isWinningSquare: boolean }) => (
    <button 
      data-testid={`square-mock`}
      data-value={value || ''} 
      data-winning={isWinningSquare}
      onClick={onClick}
    >
      {value}
    </button>
  )
}));

describe('Board Component', () => {
  it('renders 9 squares', () => {
    const squares = Array(9).fill(null);
    render(<Board squares={squares} onClick={() => {}} winningLine={null} />);
    
    const renderedSquares = screen.getAllByTestId('square-mock');
    expect(renderedSquares.length).toBe(9);
  });

  it('passes the correct value to each square', () => {
    const squares = [
      'X', null, 'O',
      null, 'X', null,
      'O', null, 'X'
    ];
    
    render(<Board squares={squares} onClick={() => {}} winningLine={null} />);
    
    const renderedSquares = screen.getAllByTestId('square-mock');
    
    expect(renderedSquares[0].getAttribute('data-value')).toBe('X');
    expect(renderedSquares[1].getAttribute('data-value')).toBe('');
    expect(renderedSquares[2].getAttribute('data-value')).toBe('O');
    expect(renderedSquares[4].getAttribute('data-value')).toBe('X');
    expect(renderedSquares[6].getAttribute('data-value')).toBe('O');
    expect(renderedSquares[8].getAttribute('data-value')).toBe('X');
  });

  it('marks winning squares correctly', () => {
    const squares = ['X', 'X', 'X', 'O', 'O', null, null, null, null];
    const winningLine = [0, 1, 2]; // Top row
    
    render(<Board squares={squares} onClick={() => {}} winningLine={winningLine} />);
    
    const renderedSquares = screen.getAllByTestId('square-mock');
    
    // Check winning squares
    expect(renderedSquares[0].getAttribute('data-winning')).toBe('true');
    expect(renderedSquares[1].getAttribute('data-winning')).toBe('true');
    expect(renderedSquares[2].getAttribute('data-winning')).toBe('true');
    
    // Check non-winning squares
    expect(renderedSquares[3].getAttribute('data-winning')).toBe('false');
    expect(renderedSquares[4].getAttribute('data-winning')).toBe('false');
  });

  it('calls onClick with the correct index when a square is clicked', () => {
    const squares = Array(9).fill(null);
    const handleClick = vi.fn();
    
    render(<Board squares={squares} onClick={handleClick} winningLine={null} />);
    
    const renderedSquares = screen.getAllByTestId('square-mock');
    
    // Click the first square
    renderedSquares[0].click();
    expect(handleClick).toHaveBeenCalledWith(0);
    
    // Click the fifth square (index 4)
    renderedSquares[4].click();
    expect(handleClick).toHaveBeenCalledWith(4);
  });
});