import { SolveFunc } from './types';

export const solve: SolveFunc = (lines) => {
  let state: ConwayCube = parse_initial_state(lines);
  let rounds = 6;
  while (rounds > 0) {
    state = process_one_round(state);
    rounds--;
  }
  return count_active_cells(state);
};

export const testInput = ['.#.', '..#', '###'];

type ConwayCube = {
  max: {
    w: number;
    x: number;
    y: number;
    z: number;
  };
  min: {
    w: number;
    x: number;
    y: number;
    z: number;
  };
  cells: Map<number, Map<number, Map<number, Map<number, string>>>>;
};

const empty_cube = (): ConwayCube => {
  return {
    cells: new Map(),
    max: {
      w: 0,
      x: 0,
      y: 0,
      z: 0,
    },
    min: {
      w: 0,
      x: 0,
      y: 0,
      z: 0,
    },
  };
};

const set = (cube: ConwayCube, w: number, x: number, y: number, z: number, c: string) => {
  if (!cube.cells.has(z)) cube.cells.set(z, new Map());
  if (!cube.cells.get(z).has(y)) cube.cells.get(z).set(y, new Map());
  if (!cube.cells.get(z).get(y).has(x)) cube.cells.get(z).get(y).set(x, new Map());
  cube.cells.get(z).get(y).get(x).set(w, c);

  // update min/max
  if (z < cube.min.z) cube.min.z = z;
  if (z > cube.max.z) cube.max.z = z;

  if (y < cube.min.y) cube.min.y = y;
  if (y > cube.max.y) cube.max.y = y;

  if (x < cube.min.x) cube.min.x = x;
  if (x > cube.max.x) cube.max.x = x;

  if (w < cube.min.w) cube.min.w = w;
  if (w > cube.max.w) cube.max.w = w;
};

const get = (cube: ConwayCube, w: number, x: number, y: number, z: number): string => {
  return cube.cells.get(z)?.get(y)?.get(x)?.get(w) ?? '.';
};

const parse_initial_state = (lines: string[]) => {
  const state = empty_cube();
  const z = 0;
  const w = 0;
  lines.forEach((line, y) => {
    line.split('').forEach((c, x) => {
      set(state, w, x, y, z, c);
    });
  });
  return state;
};

const process_one_round = (state: ConwayCube): ConwayCube => {
  const newState = empty_cube();

  for (let z = state.min.z - 1; z <= state.max.z + 1; z++) {
    for (let y = state.min.y - 1; y <= state.max.y + 1; y++) {
      for (let x = state.min.x - 1; x <= state.max.x + 1; x++) {
        for (let w = state.min.w - 1; w <= state.max.w + 1; w++) {
          set(newState, w, x, y, z, get_new_state(state, w, x, y, z));
        }
      }
    }
  }

  return newState;
};

const get_new_state = (state, w: number, x: number, y: number, z: number): string => {
  const current = get(state, w, x, y, z);
  let active = 0;
  for (let dz = -1; dz <= 1; dz++) {
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        for (let dw = -1; dw <= 1; dw++) {
          if (dx == 0 && dy == 0 && dz == 0 && dw == 0) continue;
          if (get(state, w + dw, x + dx, y + dy, z + dz) === '#') {
            active++;
          }
        }
      }
    }
  }
  if (current === '#') {
    return active === 2 || active === 3 ? '#' : '.';
  }
  if (current === '.') {
    return active === 3 ? '#' : '.';
  }
};

const count_active_cells = (state: ConwayCube): number => {
  let active = 0;
  for (let z = state.min.z; z <= state.max.z; z++) {
    for (let y = state.min.y; y <= state.max.y; y++) {
      for (let x = state.min.x; x <= state.max.x; x++) {
        for (let w = state.min.w; w <= state.max.w; w++) {
          if (get(state, w, x, y, z) === '#') {
            active++;
          }
        }
      }
    }
  }
  return active;
};
