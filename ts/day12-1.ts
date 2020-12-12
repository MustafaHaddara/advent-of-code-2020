import { SolveFunc } from './types';

export const solve: SolveFunc = (lines) => {
  const p = follow(lines);
  return Math.abs(p.y) + Math.abs(p.x);
};

export const testInput = ['F10', 'N3', 'F7', 'R90', 'F11'];

type Position = {
  orientation: string; // N E S W
  x: number;
  y: number;
};

const follow = (directions: string[]) => {
  const pos: Position = {
    orientation: 'E',
    x: 0,
    y: 0,
  };
  for (let i = 0; i < directions.length; i++) {
    const [op, arg] = [directions[i][0], parseInt(directions[i].slice(1))];
    if ('NEWS'.indexOf(op) >= 0) {
      move(pos, op, arg);
    } else if (op === 'F') {
      move(pos, pos.orientation, arg);
    } else if (op === 'L') {
      pos.orientation = rot(pos.orientation, arg);
    } else if (op === 'R') {
      pos.orientation = rot(pos.orientation, -1 * arg);
    } else {
      console.log('nope!');
    }
  }
  return pos;
};

const move = (pos: Position, dir: string, amount: number) => {
  if (dir === 'N') {
    pos.y += amount;
  } else if (dir === 'S') {
    pos.y -= amount;
  } else if (dir === 'E') {
    pos.x += amount;
  } else if (dir === 'W') {
    pos.x -= amount;
  }
};

const rot = (dir: string, deg: number): string => {
  const cur = dirToDeg(dir);
  let newDeg = cur + deg;
  if (newDeg < 0) newDeg += 360;
  if (newDeg >= 360) newDeg -= 360;
  return degToDir(newDeg);
};

const dirToDeg = (dir: string): number => {
  return {
    N: 90,
    E: 0,
    S: 270,
    W: 180,
  }[dir];
};

const degToDir = (deg: number): string => {
  return {
    90: 'N',
    0: 'E',
    270: 'S',
    180: 'W',
  }[deg];
};
