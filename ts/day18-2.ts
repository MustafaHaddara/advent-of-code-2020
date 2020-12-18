import { SolveFunc } from './types';

export const solve: SolveFunc = (lines) => {
  return lines
    .filter((line) => line.length > 0)
    .map((line) => eval_expr(line, 0)[0])
    .reduce(add, 0);
};

export const testInput = [
  '1 + 2 * 3 + 4 * 5 + 6', // 231
  '2 * 3 + (4 * 5)', // 46
  '5 + (8 * 3 + 9 + 3 * 4 * 3)', // 1445
  '5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))', // 669060
  '(5 + 6 + 6 * 8 * 9) + 9', // 1233
];

const eval_expr = (e: string, pos: number): [number, number] => {
  const terms = [];
  let curr = '';
  let c2 = null;
  let op;
  let i = 0;
  for (i = pos; i < e.length; i++) {
    if (e[i] === ' ') {
      if (curr !== '') {
        if (c2 === null) c2 = parseInt(curr);
        else c2 = op(c2, parseInt(curr));
      }
      continue;
    }
    if (e[i] === '(') {
      const [res, newidx] = eval_expr(e, i + 1);
      if (c2 === null) c2 = res;
      else c2 = op(c2, res);
      i = newidx;
      continue;
    }
    if (e[i] === ')') {
      break;
    }
    if (e[i] === '*') {
      op = mult;
      terms.push(c2);
      c2 = null;
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
    if (c2 === null) c2 = parseInt(curr);
    else c2 = op(c2, parseInt(curr));
  }
  if (c2 !== null) terms.push(c2);
  const total = terms.reduce(mult, 1);
  return [total, i];
};

const mult = (a, b) => a * b;
const add = (a, b) => a + b;
