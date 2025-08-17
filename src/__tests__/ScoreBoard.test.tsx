import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ScoreBoard from '../components/ScoreBoard';

describe('ScoreBoard Component', () => {
  it('renders the score board title', () => {
    render(<ScoreBoard scores={{ X: 0, O: 0, draws: 0 }} />);
    expect(screen.getByText('Score Board')).toBeDefined();
  });

  it('displays player names correctly', () => {
    render(<ScoreBoard scores={{ X: 0, O: 0, draws: 0 }} />);
    expect(screen.getByText('Pushpa Raj')).toBeDefined();
    expect(screen.getByText('Appanna')).toBeDefined();
    expect(screen.getByText('Draws')).toBeDefined();
  });

  it('displays scores correctly when all scores are 0', () => {
    render(<ScoreBoard scores={{ X: 0, O: 0, draws: 0 }} />);
    
    // Get all score elements (they're the only bold numbers in the component)
    const scoreElements = screen.getAllByText(/^[0-9]+$/);
    
    expect(scoreElements.length).toBe(3);
    expect(scoreElements[0].textContent).toBe('0');
    expect(scoreElements[1].textContent).toBe('0');
    expect(scoreElements[2].textContent).toBe('0');
  });

  it('displays scores correctly with non-zero values', () => {
    render(<ScoreBoard scores={{ X: 3, O: 2, draws: 1 }} />);
    
    // Find score elements by their values
    expect(screen.getByText('3')).toBeDefined();
    expect(screen.getByText('2')).toBeDefined();
    expect(screen.getByText('1')).toBeDefined();
  });

  it('updates when scores change', () => {
    const { rerender } = render(<ScoreBoard scores={{ X: 0, O: 0, draws: 0 }} />);
    
    // Initial render - use data-testid attributes instead
    const scoreElements = screen.getAllByText('0');
    expect(scoreElements.length).toBe(3);
    
    // Update props and rerender
    rerender(<ScoreBoard scores={{ X: 5, O: 3, draws: 2 }} />);
    
    // Check updated scores
    expect(screen.getByText('5')).toBeDefined();
    expect(screen.getByText('3')).toBeDefined();
    expect(screen.getByText('2')).toBeDefined();
  });
});