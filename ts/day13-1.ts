import { SolveFunc } from './types';

export const solve: SolveFunc = (lines) => {
  const currentTime = parseInt(lines[0]);
  const available = lines[1]
    .split(',')
    .filter((l) => l !== 'x')
    .map((l) => {
      const id = parseInt(l);
      const n = Math.ceil(currentTime / id) * id;
      return {
        id: id,
        next: n,
      };
    })
    .sort((a, b) => a.next - b.next);
  //   console.log(available);
  const wait = available[0].next - currentTime;
  return wait * available[0].id;
};

export const testInput = ['939', '7,13,x,x,59,x,31,19'];
