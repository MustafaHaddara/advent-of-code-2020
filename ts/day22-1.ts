import { SolveFunc } from './types';

export const solve: SolveFunc = (lines) => {
  let i = 1;
  const p1 = [];
  const p2 = [];
  while (lines[i] !== '') {
    p1.push(parseInt(lines[i]));
    i++;
  }

  i++; // skip the blank line
  i++; // skip the header
  while (lines[i] !== '') {
    p2.push(parseInt(lines[i]));
    i++;
  }

  const winning_deck: number[] = conflict(p1, p2);

  return winning_deck.map((card, idx) => card * (winning_deck.length - idx)).reduce((total, value) => total + value, 0);
};

export const testInput = ['Player 1:', '9', '2', '6', '3', '1', '', 'Player 2:', '5', '8', '4', '7', '10', ''];

const conflict = (p1: number[], p2: number[]): number[] => {
  let i = 1;
  while (p1.length !== 0 && p2.length !== 0) {
    // console.log(`turn #${i}`);
    // console.log(`p1's deck: ${p1.join(',')}`);
    // console.log(`p2's deck: ${p2.join(',')}`);
    i++;

    const p1card = p1[0];
    const p2card = p2[0];

    if (p1card > p2card) {
      p1.push(p1card);
      p1.push(p2card);
    } else {
      p2.push(p2card);
      p2.push(p1card);
    }

    p1 = p1.slice(1);
    p2 = p2.slice(1);
  }
  if (p1.length === 0) return p2;
  else return p1;
};
