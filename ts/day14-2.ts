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
      const [base_addr, val] = parse(line);
      const addresses = apply_mask(base_addr, mask);
      addresses.forEach((addr) => {
        mem[addr] = val;
      });
    }
  }
  return Object.values(mem).reduce((total, c) => total + c, 0);
};

export const testInput = [
  'mask = 000000000000000000000000000000X1001X',
  'mem[42] = 100',
  'mask = 00000000000000000000000000000000X0XX',
  'mem[26] = 1',
];

const parse = (s) => {
  const addr = s.slice(4, s.indexOf(']'));
  const val = s.slice(s.indexOf('=') + 2);
  return [parseInt(addr), parseInt(val)];
};

const apply_mask = (val: number, mask: string): number[] => {
  const b = leftpad(val.toString(2), mask.length);
  let res = '';
  for (let i = 0; i < mask.length; i++) {
    if (mask[i] === '0') {
      res += b[i];
    } else {
      res += mask[i];
    }
  }
  return permutations(res);
};

const permutations = (masked: string) => {
  const floating_idx = masked.indexOf('X');
  if (floating_idx < 0) {
    return [masked];
  } else {
    const prefix = masked.slice(0, floating_idx);
    const suffix = masked.slice(floating_idx + 1);
    return [...permutations(prefix + '0' + suffix), ...permutations(prefix + '1' + suffix)];
  }
};

const leftpad = (s, len) => {
  const len_to_add = len - s.length;
  return '0'.repeat(len_to_add) + s;
};
