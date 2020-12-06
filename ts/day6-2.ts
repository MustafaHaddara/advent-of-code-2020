import { SolveFunc } from './types';

export const solve: SolveFunc = (lines: string[]) => {
  let total = 0;
  let answered: Set<string> = new Set();
  let first = true;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === '') {
      total += answered.size;
      answered = new Set();
      first = true;
      continue;
    }

    if (first) {
      lines[i].split('').forEach((c) => answered.add(c));
      first = false;
    } else {
      answered.forEach((c) => {
        if (lines[i].indexOf(c) < 0) {
          answered.delete(c);
        }
      });
    }
  }
  total += answered.size;
  return total.toString();
};

export const testInput = ['abc', '', 'a', 'b', 'c', '', 'ab', 'ac', '', 'a', 'a', 'a', 'a', '', 'b'];
