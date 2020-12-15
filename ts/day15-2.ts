import { SolveFunc } from './types';

export const solve: SolveFunc = (lines) => {
  const nums = lines[0].split(',').map((l) => parseInt(l));

  const spoken = {};
  const second = {};
  const end = 30000000;
  let i = 0;
  let last = -1;
  while (i < end) {
    if (i < nums.length) {
      spoken[nums[i]] = i;
      last = i;
    } else {
      const diff = second[last] === undefined ? 0 : spoken[last] - second[last];
      if (spoken[diff] !== undefined) {
        second[diff] = spoken[diff];
      }
      spoken[diff] = i;
      last = diff;
    }
    i++;
    // todo: perf investigation?
    // if (i % 100000 === 0) {
    //   console.log(i);
    // }
  }
  return last;
};

export const testInput = ['0,3,6'];
