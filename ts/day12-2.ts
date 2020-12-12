import { SolveFunc } from './types';

export const solve: SolveFunc = (lines) => {
  const p = follow(lines);
  return Math.abs(p.y) + Math.abs(p.x);
};

export const testInput = ['F10', 'N3', 'F7', 'R90', 'F11'];

type Position = {
  x: number;
  y: number;
  wx: number;
  wy: number;
};

const follow = (directions: string[]) => {
  const pos: Position = {
    x: 0,
    y: 0,
    wx: 10,
    wy: 1,
  };
  for (let i = 0; i < directions.length; i++) {
    const [op, arg] = [directions[i][0], parseInt(directions[i].slice(1))];
    if ('NEWS'.indexOf(op) >= 0) {
      move_waypoint(pos, op, arg);
    } else if (op === 'F') {
      move(pos, arg);
    } else if (op === 'L') {
      rotL(pos, arg / 90);
    } else if (op === 'R') {
      rotR(pos, arg / 90);
    } else {
      console.log('nope!');
    }
  }
  return pos;
};

const move_waypoint = (pos: Position, dir: string, times: number) => {
  if (dir === 'N') {
    pos.wy += times;
  } else if (dir === 'S') {
    pos.wy -= times;
  } else if (dir === 'E') {
    pos.wx += times;
  } else if (dir === 'W') {
    pos.wx -= times;
  }
};

const move = (pos: Position, times: number) => {
  for (let i = 0; i < times; i++) {
    pos.x += pos.wx;
    pos.y += pos.wy;
  }
};

const rotL = (pos: Position, times: number) => {
  for (let i = 0; i < times; i++) {
    const { wx, wy } = pos;
    pos.wx = -1 * wy;
    pos.wy = wx;
  }
};

const rotR = (pos: Position, times: number) => {
  for (let i = 0; i < times; i++) {
    const { wx, wy } = pos;
    pos.wx = wy;
    pos.wy = -1 * wx;
  }
};
