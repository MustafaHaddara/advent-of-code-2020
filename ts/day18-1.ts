import { SolveFunc } from './types';

export const solve: SolveFunc = (lines) => {
  return lines
    .filter((line) => line.length > 0)
    .map((line) => eval_expr(line, 0)[0])
    .reduce(add, 0);
};

export const testInput = [
  '1 + 2 * 3 + 4 * 5 + 6', //71
  '2 * 3 + (4 * 5)', //26
  '5 + (8 * 3 + 9 + 3 * 4 * 3)', //437
  '5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))', // 12240
  '(5 + 6 + 6 * 8 * 9) + 9', // 1233
];

const eval_expr = (e: string, pos: number): [number, number] => {
  let total = null;
  let curr = '';
  let op;
  let i = 0;
  for (i = pos; i < e.length; i++) {
    if (e[i] === ' ') {
      if (curr !== '') {
        if (total === null) total = parseInt(curr);
        else total = op(total, parseInt(curr));
      }
      continue;
    }
    if (e[i] === '(') {
      const [res, newidx] = eval_expr(e, i + 1);
      if (total === null) total = res;
      else total = op(total, res);
      i = newidx;
      continue;
    }
    if (e[i] === ')') {
      break;
    }
    if (e[i] === '*') {
      op = mult;
      curr = '';
      continue;
    }
    if (e[i] === '+') {
      curr = '';
      op = add;
      continue;
    }

    curr += e[i];
  }
  if (curr !== '') {
    if (total === null) total = parseInt(curr);
    else total = op(total, parseInt(curr));
  }
  return [total, i];
};

const mult = (a, b) => a * b;
const add = (a, b) => a + b;
