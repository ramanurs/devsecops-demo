import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Square from '../components/Square';

describe('Square Component', () => {
  it('renders with the correct value when X', () => {
    render(<Square value="X" onClick={() => {}} isWinningSquare={false} />);
    expect(screen.getByText('X')).toBeDefined();
  });

  it('renders with the correct value when O', () => {
    render(<Square value="O" onClick={() => {}} isWinningSquare={false} />);
    expect(screen.getByText('O')).toBeDefined();
  });

  it('renders empty when value is null', () => {
    render(<Square value={null} onClick={() => {}} isWinningSquare={false} />);
    const button = screen.getByRole('button');
    expect(button.textContent).toBe('');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Square value={null} onClick={handleClick} isWinningSquare={false} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies winning square styles when isWinningSquare is true', () => {
    render(<Square value="O" onClick={() => {}} isWinningSquare={true} />);
    const button = screen.getByRole('button');
    expect(button.className).toContain('bg-green-200');
  });

  it('applies X-specific styles when value is X', () => {
    render(<Square value="X" onClick={() => {}} isWinningSquare={false} />);
    const button = screen.getByRole('button');
    expect(button.className).toContain('bg-indigo-100');
    expect(button.className).toContain('text-indigo-600');
  });

  it('applies O-specific styles when value is O', () => {
    render(<Square value="O" onClick={() => {}} isWinningSquare={false} />);
    const button = screen.getByRole('button');
    expect(button.className).toContain('bg-purple-100');
    expect(button.className).toContain('text-purple-600');
  });

  it('has the correct aria-label for accessibility', () => {
    render(<Square value="X" onClick={() => {}} isWinningSquare={false} />);
    const button = screen.getByRole('button');
    expect(button.getAttribute('aria-label')).toBe('Square with X');
  });

  it('has the correct aria-label for empty square', () => {
    render(<Square value={null} onClick={() => {}} isWinningSquare={false} />);
    const button = screen.getByRole('button');
    expect(button.getAttribute('aria-label')).toBe('Empty square');
  });
});