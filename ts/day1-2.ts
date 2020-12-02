import { SolveFunc } from './types';

export const solve: SolveFunc = (lines: string[]) => {
  const nums: number[] = lines.map((line) => parseInt(line));

  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        if (nums[i] + nums[j] + nums[k] === 2020) {
          return (nums[i] * nums[j] * nums[k]).toString();
        }
      }
    }
  }
};

export const testInput = ['1721', '979', '366', '299', '675', '1456'];
