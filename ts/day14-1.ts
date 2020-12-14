import { SolveFunc } from './types';

export const solve: SolveFunc = (lines) => {
  lines = lines.filter((l) => l.length > 0);

  let mask = '';
  const mem: Record<number, number> = {};
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('mask')) {
      mask = line.slice('mask = '.length);
    } else {
      const [addr, val] = parse(line);
      mem[addr] = apply_mask(val, mask);
    }
  }
  return Object.values(mem).reduce((total, c) => total + c, 0);
};

export const testInput = ['mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X', 'mem[8] = 11', 'mem[7] = 101', 'mem[8] = 0'];

const parse = (s) => {
  const addr = s.slice(4, s.indexOf(']'));
  const val = s.slice(s.indexOf('=') + 2);
  return [addr, parseInt(val)];
};

const apply_mask = (val: number, mask: string) => {
  const b = leftpad(val.toString(2), mask.length);
  let res = '';
  for (let i = 0; i < mask.length; i++) {
    if (mask[i] === 'X') {
      res += b[i];
    } else {
      res += mask[i];
    }
  }
  return parseInt(res, 2);
};

const leftpad = (s, len) => {
  const len_to_add = len - s.length;
  return '0'.repeat(len_to_add) + s;
};
