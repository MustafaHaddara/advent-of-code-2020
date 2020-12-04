import { SolveFunc } from './types';

export const solve: SolveFunc = (lines: string[]) => {
  return lines
    .filter((line: string) => line.length > 0)
    .map((line) => parseLine(line))
    .filter((spec) => validatePassword(spec))
    .length.toString();
};

export const testInput = ['1-3 a: abcdef', '1-3 b: cdefg', '2-9 c: ccccccccc'];

type Password = { max: number; min: number; letter: string; password: string };

const parseLine = (line: string): Password => {
  const chunks = line.split(' ');
  const limits = chunks[0].split('-');
  return {
    min: parseInt(limits[0]),
    max: parseInt(limits[1]),
    letter: chunks[1].split(':')[0],
    password: chunks[2],
  };
};

const validatePassword = (spec: Password): boolean => {
  const count = countChars(spec.password, spec.letter);
  return count >= spec.min && count <= spec.max;
};

const countChars = (str: string, chr: string): number => {
  return str.split('').filter((c) => c === chr).length;
};
