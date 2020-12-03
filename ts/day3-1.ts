import { SolveFunc } from './types';

export const solve: SolveFunc = (lines: string[]) => {
  let x = 0;
  let total = 0;
  for (const line of lines) {
    if (x >= line.length) {
      x = x % line.length;
    }
    if (line[x] == '#') {
      total += 1;
    }
    x += 3;
  }
  return total.toString();
};

export const testInput = [
  '..##.......',
  '#...#...#..',
  '.#....#..#.',
  '..#.#...#.#',
  '.#...##..#.',
  '..#.##.....',
  '.#.#.#....#',
  '.#........#',
  '#.##...#...',
  '#...##....#',
  '.#..#...#.#',
];
