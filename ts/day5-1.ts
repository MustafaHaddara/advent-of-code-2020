import { SolveFunc } from './types';

export const solve: SolveFunc = (lines: string[]) => {
  return lines
    .filter((l) => l.length > 0)
    .map((l) => {
      const r = get_row(l);
      const c = get_col(l);
      return r * 8 + c;
    })
    .reduce((max, c) => (c > max ? c : max), 0)
    .toString();
};

export const testInput = [
  'BFFFBBFRRR', // row 70, col 7, id 567
  'FFFBBBFRRR', // row 14, col 7, id 119
];

const get_row = (sid: string) => {
  const b = sid
    .slice(0, 7)
    .split('')
    .map((c) => (c == 'B' ? '1' : '0'))
    .join('');
  return parseInt(b, 2);
};

const get_col = (sid: string) => {
  const b = sid
    .slice(7, 10)
    .split('')
    .map((c) => (c == 'R' ? '1' : '0'))
    .join('');
  return parseInt(b, 2);
};
