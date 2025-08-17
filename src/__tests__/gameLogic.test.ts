import { describe, it, expect } from 'vitest';
import { calculateWinner, checkDraw } from '../utils/gameLogic';

describe('Game Logic', () => {
  describe('calculateWinner', () => {
    it('should return null when there is no winner', () => {
      const board = [null, null, null, null, null, null, null, null, null];
      expect(calculateWinner(board)).toBeNull();
    });

    it('should return null for a partially filled board with no winner', () => {
      const board = ['X', null, 'O', null, 'X', null, 'O', null, null];
      expect(calculateWinner(board)).toBeNull();
    });

    // Horizontal win tests
    it('should detect horizontal win in top row for X', () => {
      const board = ['X', 'X', 'X', null, 'O', 'O', null, null, null];
      const result = calculateWinner(board);
      expect(result).not.toBeNull();
      expect(result?.winner).toBe('X');
      expect(result?.line).toEqual([0, 1, 2]);
    });

    it('should detect horizontal win in middle row for X', () => {
      const board = [null, null, 'O', 'X', 'X', 'X', 'O', null, null];
      const result = calculateWinner(board);
      expect(result).not.toBeNull();
      expect(result?.winner).toBe('X');
      expect(result?.line).toEqual([3, 4, 5]);
    });

    it('should detect horizontal win in bottom row for O', () => {
      const board = ['X', 'X', null, null, 'X', null, 'O', 'O', 'O'];
      const result = calculateWinner(board);
      expect(result).not.toBeNull();
      expect(result?.winner).toBe('O');
      expect(result?.line).toEqual([6, 7, 8]);
    });

    // Vertical win tests
    it('should detect vertical win in left column for X', () => {
      const board = ['X', 'O', null, 'X', 'O', null, 'X', null, null];
      const result = calculateWinner(board);
      expect(result).not.toBeNull();
      expect(result?.winner).toBe('X');
      expect(result?.line).toEqual([0, 3, 6]);
    });

    it('should detect vertical win in middle column for O', () => {
      const board = ['X', 'O', 'X', null, 'O', 'X', null, 'O', null];
      const result = calculateWinner(board);
      expect(result).not.toBeNull();
      expect(result?.winner).toBe('O');
      expect(result?.line).toEqual([1, 4, 7]);
    });

    it('should detect vertical win in right column for X', () => {
      const board = [null, 'O', 'X', null, 'O', 'X', null, null, 'X'];
      const result = calculateWinner(board);
      expect(result).not.toBeNull();
      expect(result?.winner).toBe('X');
      expect(result?.line).toEqual([2, 5, 8]);
    });

    // Diagonal win tests
    it('should detect diagonal win from top-left to bottom-right', () => {
      const board = ['X', 'O', 'O', null, 'X', 'O', null, null, 'X'];
      const result = calculateWinner(board);
      expect(result).not.toBeNull();
      expect(result?.winner).toBe('X');
      expect(result?.line).toEqual([0, 4, 8]);
    });

    it('should detect diagonal win from top-right to bottom-left', () => {
      const board = [null, null, 'O', 'X', 'O', null, 'O', 'X', 'X'];
      const result = calculateWinner(board);
      expect(result).not.toBeNull();
      expect(result?.winner).toBe('O');
      expect(result?.line).toEqual([2, 4, 6]);
    });

    it('should detect win on a full board', () => {
      // This board has X winning in the middle row
      const board = ['O', 'X', 'O', 'X', 'X', 'X', 'O', 'O', 'X'];
      const result = calculateWinner(board);
      expect(result).not.toBeNull();
      expect(result?.winner).toBe('X');
      expect(result?.line).toEqual([3, 4, 5]);
    });
  });

  describe('checkDraw', () => {
    it('should return false when board is empty', () => {
      const board = [null, null, null, null, null, null, null, null, null];
      expect(checkDraw(board)).toBe(false);
    });

    it('should return false when board is not full', () => {
      const board = ['X', 'O', 'X', 'O', null, 'X', 'O', 'X', 'O'];
      expect(checkDraw(board)).toBe(false);
    });

    it('should return false when there is a winner', () => {
      const board = ['X', 'X', 'X', 'O', 'O', null, null, null, null];
      expect(checkDraw(board)).toBe(false);
    });

    it('should return true when board is full with no winner', () => {
      const board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
      expect(checkDraw(board)).toBe(true);
    });

    it('should return false when there is a winner on a full board', () => {
      // This board has X winning in the middle row
      const board = ['O', 'X', 'O', 'X', 'X', 'X', 'O', 'O', 'X'];
      expect(checkDraw(board)).toBe(false);
    });
  });
});