export const solve: SolveFunc = (lines: string[]) => {
  return lines
    .map((line) => parseLine(line))
    .filter((spec) => validatePassword(spec))
    .length.toString();
};

export const testInput = ['1-3 a: abcdef', '1-3 b: cdefg', '2-9 c: ccccccccc'];

type Password = { p1: number; p2: number; letter: string; password: string };

const parseLine = (line: string): Password => {
  const chunks = line.split(' ');
  const limits = chunks[0].split('-');
  return {
    p1: parseInt(limits[0]),
    p2: parseInt(limits[1]),
    letter: chunks[1].split(':')[0],
    password: chunks[2],
  };
};

const validatePassword = (spec: Password): boolean => {
  const first = spec.password[spec.p1 - 1] === spec.letter;
  const second = spec.password[spec.p2 - 1] === spec.letter;
  return (first || second) && first !== second;
};
