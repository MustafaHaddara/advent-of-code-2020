import { SolveFunc } from './types';

export const solve: SolveFunc = (lines: string[]) => {
  //   const total = 0;
  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];
  return slopes
    .map((s) => slopes_encountered(lines, s[0], s[1]))
    .reduce((acc, c) => acc * c, 1)
    .toString();
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

const slopes_encountered = (lines: string[], xd: number, yd: number): number => {
  let x = 0;
  let total = 0;
  for (let y = 0; y < lines.length; y += yd) {
    const line = lines[y];
    if (x >= line.length) {
      x = x % line.length;
    }
    if (line[x] == '#') {
      total += 1;
    }
    x += xd;
  }
  return total;
};
