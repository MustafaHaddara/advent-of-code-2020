import { SolveFunc } from './types';

export const solve: SolveFunc = (lines) => {
  const constraints: Constraint[] = lines[1]
    .split(',')
    .map((l, idx) => {
      if (l === 'x') return null;
      return {
        id: parseInt(l),
        index: idx,
      };
    })
    .filter((c) => c !== null);

  /*
  courtesy of @prdoyle
  so you want a number n such that n%a=1 and n%b=2, for example.
  Let's say a & b are coprime, or else there's no answer.
  You can start with n=1 and keep adding a (which has no effect on n%a) until n%b=2.
  Then if you want n%c=3, you can keep adding ab (which has no effect on n%a or n%b) until n%c=3
  */

  let timestamp = 0;
  let jump = constraints[0].id;
  for (let i = 1; i < constraints.length; i++) {
    const c = constraints[i];
    while ((timestamp + c.index) % c.id !== 0) {
      timestamp += jump;
    }
    jump *= c.id;
  }
  return timestamp;
};

type Constraint = {
  id: number;
  index: number;
};

export const testInput = ['939', '7,13,x,x,59,x,31,19'];
// export const testInput = ['939', '17,x,13,19'];
