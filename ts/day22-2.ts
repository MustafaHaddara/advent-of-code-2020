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
// export const testInput = ['Player 1:', '43', '19', '', 'Player 2:', '2', '29', '14', ''];

const conflict = (p1: number[], p2: number[], game_num = 1): number[] => {
  const turns = [];
  while (p1.length !== 0 && p2.length !== 0) {
    // recursive check
    if (turn_happened_before(turns, p1, p2)) {
      return p1;
    }
    turns.push([[...p1], [...p2]]);

    const p1card = p1.shift(); // removes
    const p2card = p2.shift(); // removes

    if (p1card <= p1.length && p2card <= p2.length) {
      // recurse to determine winner
      const subp1 = p1.slice(0, p1card);
      const subp2 = p2.slice(0, p2card);
      conflict(subp1, subp2, game_num + 1);

      // subp1 and subp2 get mutated
      if (subp1.length === 0) {
        // p2 won
        p2.push(p2card);
        p2.push(p1card);
      } else {
        // p1 won
        p1.push(p1card);
        p1.push(p2card);
      }
    } else if (p1card > p2card) {
      p1.push(p1card);
      p1.push(p2card);
    } else {
      p2.push(p2card);
      p2.push(p1card);
    }
  }
  if (p1.length === 0) return p2;
  else return p1;
};

const turn_happened_before = (turns: [number[], number[]][], p1: number[], p2: number[]): boolean => {
  return turns.some((turn) => arr_eq(turn[0], p1) && arr_eq(turn[1], p2));
};

const arr_eq = (a1: number[], a2: number[]): boolean => a1.every((val, idx) => val === a2[idx]);
