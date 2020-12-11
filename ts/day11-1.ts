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
  // If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
  // If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
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
      const adj = num_adj(y, x, seats);
      if (cell === 'L' && adj === 0) {
        newrow += '#';
        changed = true;
      } else if (cell === '#' && adj >= 4) {
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

const num_adj = (y, x, seats) => {
  let total = 0;
  for (let y_ = -1; y_ <= 1; y_++) {
    if (y + y_ < 0) continue;
    if (y + y_ >= seats.length) continue;
    const row = seats[y + y_];
    for (let x_ = -1; x_ <= 1; x_++) {
      if (y_ === 0 && x_ === 0) continue;
      if (x + x_ < 0) continue;
      if (x + x_ >= row.length) continue;
      const cell = row[x + x_];
      if (cell === '#') total++;
    }
  }
  return total;
};
