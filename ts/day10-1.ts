import { SolveFunc } from './types';

export const solve: SolveFunc = (lines) => {
  let nums = lines
    .filter((l) => l.length > 0)
    .map((l) => parseInt(l))
    .sort((a, b) => a - b);
  nums.push(nums[nums.length - 1] + 3);
  nums = [0, ...nums];

  let ones = 0;
  let threes = 0;
  for (let i = 1; i < nums.length; i++) {
    const diff = nums[i] - nums[i - 1];
    if (diff === 1) ones++;
    else if (diff === 3) threes++;
  }
  return ones * threes;
};

export const testInput = ['16', '10', '15', '5', '1', '11', '7', '19', '6', '12', '4'];
