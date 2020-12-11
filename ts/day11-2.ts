import { SolveFunc } from './types';

export const solve: SolveFunc = (lines) => {
  let seats = lines.filter((l) => l.length > 0);
  while (true) {
    const res = apply_rules(seats);
    seats = res.newseats;
    if (!res.changed) {
      break;
    }
  }
  return seats.map((row) => row.split('').filter((c) => c == '#').length).reduce((total, c) => total + c);
};

export const testInput = [
  'L.LL.LL.LL',
  'LLLLLLL.LL',
  'L.L.L..L..',
  'LLLL.LL.LL',
  'L.LL.LL.LL',
  'L.LLLLL.LL',
  '..L.L.....',
  'LLLLLLLLLL',
  'L.LLLLLL.L',
  'L.LLLLL.LL',
];

const apply_rules = (seats) => {
  // If a seat is empty (L) and it sees no occupied seats in any of the 8 directions, the seat becomes occupied.
  // If a seat is occupied (#) and it sees five or more seats in any of the 8 directions to it are also occupied, the seat becomes empty.
  // Otherwise, the seat's state does not change.
  let changed = false;
  const newseats = [];
  for (let y = 0; y < seats.length; y++) {
    const row = seats[y];
    let newrow = '';
    for (let x = 0; x < row.length; x++) {
      const cell = row[x];
      if (cell === '.') {
        newrow += '.';
        continue;
      }
      const visible = num_visible(y, x, seats);
      if (cell === 'L' && visible === 0) {
        newrow += '#';
        changed = true;
      } else if (cell === '#' && visible >= 5) {
        newrow += 'L';
        changed = true;
      } else {
        newrow += cell;
      }
    }
    newseats.push(newrow);
  }
  return { newseats, changed };
};

const num_visible = (y, x, seats) => {
  // 8 directions
  let total = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dy === 0 && dx === 0) continue;

      let inside = true;
      let mult = 1;
      while (inside) {
        const y_ = y + mult * dy;
        const x_ = x + mult * dx;
        if (y_ < 0) {
          inside = false;
          continue;
        }
        if (y_ >= seats.length) {
          inside = false;
          continue;
        }
        const row = seats[y_];

        if (x_ < 0) {
          inside = false;
          continue;
        }
        if (x_ >= row.length) {
          inside = false;
          continue;
        }

        const cell = row[x_];
        if (cell === '#') {
          total++;
          inside = false;
        } else if (cell === 'L') {
          inside = false;
        }
        mult++;
      }
    }
  }
  return total;
};
