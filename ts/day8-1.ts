import { SolveFunc } from './types';

export const solve: SolveFunc = (lines) => {
  let acc = 0;
  let i = 0;
  const seen = new Set();
  while (true) {
    if (seen.has(i)) {
      break;
    }
    seen.add(i);

    const [op, arg] = lines[i].split(' ');

    if (op === 'nop') {
      // pass
      i++;
    } else if (op === 'acc') {
      acc += parseInt(arg);
      i++;
    } else if (op === 'jmp') {
      i += parseInt(arg);
    }
  }
  return acc;
};

export const testInput = ['nop +0', 'acc +1', 'jmp +4', 'acc +3', 'jmp -3', 'acc -99', 'acc +1', 'jmp -4', 'acc +6'];
