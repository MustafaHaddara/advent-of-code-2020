import { SolveFunc } from './types';

export const solve: SolveFunc = (lines: string[]) => {
  let total = 0;
  let answered = new Set();
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === '') {
      total += answered.size;
      answered = new Set();
      continue;
    }
    lines[i].split('').forEach((c) => answered.add(c));
  }
  total += answered.size;
  return total.toString();
};

export const testInput = ['abc', '', 'a', 'b', 'c', '', 'ab', 'ac', '', 'a', 'a', 'a', 'a', '', 'b'];
