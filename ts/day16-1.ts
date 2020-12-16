import { SolveFunc } from './types';

export const solve: SolveFunc = (lines) => {
  let i = 0;
  const ranges = [];
  while (lines[i] !== '') {
    const line = lines[i];
    ranges.push(...parse_ranges(line));
    i++;
  }
  while (lines[i] !== 'nearby tickets:') {
    i++;
  }
  i++; // skip the header
  let error_rate = 0;
  while (i < lines.length) {
    if (lines[i] === '') break;
    error_rate += find_invalid_fields(lines[i], ranges);
    i++;
  }
  return error_rate;
};

export const testInput = [
  'class: 1-3 or 5-7',
  'row: 6-11 or 33-44',
  'seat: 13-40 or 45-50',
  '',
  'your ticket:',
  '7,1,14',
  '',
  'nearby tickets:',
  '7,3,47',
  '40,4,50',
  '55,2,20',
  '38,6,12',
];

type Range = {
  min: number;
  max: number;
};

const parse_ranges = (line: string): Range[] => {
  const spec = line.split(': ')[1]; // second half
  return spec.split(' or ').map((c) => {
    const [min, max] = c.split('-');
    return {
      min: parseInt(min),
      max: parseInt(max),
    };
  });
};

const find_invalid_fields = (line: string, ranges: Range[]) => {
  return line
    .split(',')
    .map((c) => parseInt(c))
    .filter((num) => !is_valid(num, ranges))
    .reduce((total, c) => total + c, 0);
};

const is_valid = (num: number, ranges: Range[]) => {
  return !!ranges.find((range) => range.min <= num && num <= range.max);
};
