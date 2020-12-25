import { SolveFunc } from './types';

export const solve: SolveFunc = (lines) => {
  const cardPubKey = parseInt(lines[0]);
  const doorPubKey = parseInt(lines[1]);

  const cardLoopSize = find_loop_size(7, cardPubKey);
  // const doorLoopSize = find_loop_size(7, doorPubKey);

  const encryptionKey = transform(doorPubKey, cardLoopSize);

  return encryptionKey;
};

export const testInput = ['5764801', '17807724', ''];

const find_loop_size = (subject: number, publicKey: number): number => {
  let value = 1;
  let i = 1;
  while (true) {
    value = value * subject;
    value = value % 20201227;
    if (value === publicKey) {
      return i;
    }
    i++;
  }
};

const transform = (subject: number, loopSize: number): number => {
  let value = 1;
  let i = 0;
  while (i < loopSize) {
    value = value * subject;
    value = value % 20201227;
    i++;
  }
  return value;
};
