import { SolveFunc } from './types';

export const solve: SolveFunc = (lines) => {
  let cups = lines[0].split('').map((c) => parseInt(c));

  let current_idx = 0;
  let current = cups[current_idx];
  for (let i = 0; i < 100; i++) {
    cups = rotate(cups, current_idx);
    current_idx = (cups.indexOf(current) + 1) % cups.length;
    current = cups[current_idx];
    // console.log('--');
  }

  const endIdx = cups.indexOf(1);
  const res = [];
  for (let i = endIdx + 1; i !== endIdx; i++) {
    if (i === cups.length) i = 0;
    res.push(cups[i]);
  }
  return res.join('');
};

export const testInput = ['389125467'];

const rotate = (cups: number[], current_idx: number): number[] => {
  const current = cups[current_idx];

  const toMove = [];
  for (let i = 1; i <= 3; i++) {
    const selected_idx = (current_idx + i) % cups.length;
    toMove.push(cups[selected_idx]);
  }

  const removed = cups.filter((c) => toMove.indexOf(c) < 0);

  //   console.log(`current: ${current}`);
  let target = current - 1;
  let target_idx;
  while (true) {
    target_idx = removed.indexOf(target);
    if (target_idx >= 0) {
      break;
    }
    target -= 1;
    if (target <= 0) {
      target = 9;
    }
  }
  //   console.log(`target: ${target}`);

  const result = [...removed.slice(0, target_idx + 1), ...toMove, ...removed.slice(target_idx + 1)];

  //   console.log(`result: ${result}`);

  return result;
};
