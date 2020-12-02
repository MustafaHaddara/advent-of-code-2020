import fs = require('fs');
import { DaySolver } from './types';

const getLinesFromFile = (qNum) => {
  const num = qNum.split('-')[0];
  const fname = `inputs/day${num}.txt`;
  return fs
    .readFileSync(fname, 'utf8')
    .split('\n')
    .filter((line: string) => line.length > 0);
};

const getModule = async (qNum) => {
  return await import(`./day${qNum}`);
};

const main = async () => {
  const qNum: string = process.argv[3];
  const code: DaySolver = await getModule(qNum);

  const lines = process.argv[2] === 'test' ? code.testInput : getLinesFromFile(qNum);

  console.log(code.solve(lines));
};

main();
