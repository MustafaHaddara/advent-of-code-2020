import { SolveFunc } from './types';

export const solve: SolveFunc = (lines) => {
  lines = lines.filter((l) => l.length > 0);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('acc')) {
      continue;
    }
    const chunks = line.split(' ');
    const newLine = [swap(chunks[0]), chunks[1]].join(' ');
    const oldLine = line;
    lines[i] = newLine;

    const res = vm(lines);
    if (res === -1) {
      lines[i] = oldLine;
      continue;
    }
    return res;
  }
};

export const testInput = ['nop +0', 'acc +1', 'jmp +4', 'acc +3', 'jmp -3', 'acc -99', 'acc +1', 'jmp -4', 'acc +6'];

const swap = (op) => {
  if (op === 'nop') {
    return 'jmp';
  } else {
    return 'nop';
  }
};
const vm = (lines: string[]): number => {
  //   console.log(lines);
  let acc = 0;
  let i = 0;
  const seen = new Set();
  while (i < lines.length) {
    if (seen.has(i)) {
      return -1; // ew
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
