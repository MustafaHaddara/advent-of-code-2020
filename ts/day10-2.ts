import { SolveFunc } from './types';

export const solve: SolveFunc = (lines) => {
  const nums = [
    0,
    ...lines
      .filter((l) => l.length > 0)
      .map((l) => parseInt(l))
      .sort((a, b) => a - b),
  ];
  nums.push(nums[nums.length - 1] + 3);

  return count_choices(0, nums, {});
};

// export const testInput = ['16', '10', '15', '5', '1', '11', '7', '19', '6', '12', '4'];
export const testInput = [
  '28',
  '33',
  '18',
  '42',
  '31',
  '14',
  '46',
  '20',
  '48',
  '47',
  '24',
  '23',
  '49',
  '45',
  '19',
  '38',
  '39',
  '11',
  '1',
  '32',
  '25',
  '35',
  '8',
  '17',
  '7',
  '9',
  '4',
  '2',
  '34',
  '10',
  '3',
];

const count_choices = (i: number, nums: number[], seen: Record<number, number>) => {
  if (i === nums.length - 1) {
    return 1;
  }
  if (seen[nums[i]]) {
    return seen[nums[i]];
  }

  let choices = 0;
  for (let j = 1; j < 4; j++) {
    if (nums[i + j] - nums[i] <= 3) {
      choices += count_choices(i + j, nums, seen);
    }
  }
  seen[nums[i]] = choices;
  return choices;
};
