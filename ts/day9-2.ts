import { SolveFunc } from './types';

export const solve: SolveFunc = (lines) => {
  const nums = lines.filter((l) => l.length > 0).map((l) => parseInt(l));
  const target = target_val(nums);
  const range = find_range(nums, target);
  const sorted = range.sort();
  return sorted[0] + sorted[range.length - 1];
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

const find_range = (nums: number[], target: number) => {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] == target) {
      continue;
    }
    const end = find_range_end(i, nums, target);
    if (end != -1) {
      return nums.slice(i, end);
    }
  }
  return null;
};

const find_range_end = (st: number, lines: number[], target: number) => {
  let total = 0;
  let i = st;
  while (total < target) {
    total += lines[i];
    i++;
  }
  console.log(total);
  if (total === target) {
    return i;
  }
  return -1;
};

const target_val = (nums: number[]) => {
  const window = 25;
  return nums.filter((num, i, nums) => {
    if (i < window) return false;
    return !has_sum(nums.slice(i - window, i + 1), num);
  })[0];
};
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
