import { SolveFunc } from './types';

export const solve: SolveFunc = (lines) => {
  const window = 25;
  return lines
    .filter((l) => l.length > 0)
    .map((l) => parseInt(l))
    .filter((num, i, nums) => {
      if (i < window) return false;
      return !has_sum(nums.slice(i - window, i + 1), num);
    })[0];
};

export const testInput = [
  '35',
  '20',
  '15',
  '25',
  '47',
  '40',
  '62',
  '55',
  '65',
  '95',
  '102',
  '117',
  '150',
  '182',
  '127',
  '219',
  '299',
  '277',
  '309',
  '576',
];

const has_sum = (nums: number[], total: number) => {
  for (let i = 0; i < nums.length; i++) {
    const target = total - nums[i];
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] == target) {
        return true;
      }
    }
  }
  return false;
};
