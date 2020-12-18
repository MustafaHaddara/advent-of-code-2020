import { SolveFunc } from './types';

export const solve: SolveFunc = (lines) => {
  let state: ConwayCube = parse_initial_state(lines);
  let rounds = 6;
  //   print(state);
  while (rounds > 0) {
    state = process_one_round(state);
    // console.log('--');
    // print(state);
    rounds--;
  }
  return count_active_cells(state);
};

export const testInput = ['.#.', '..#', '###'];

type ConwayCube = {
  max: {
    x: number;
    y: number;
    z: number;
  };
  min: {
    x: number;
    y: number;
    z: number;
  };
  cells: Map<number, Map<number, Map<number, string>>>;
};

const empty_cube = (): ConwayCube => {
  return {
    cells: new Map(),
    max: {
      x: 0,
      y: 0,
      z: 0,
    },
    min: {
      x: 0,
      y: 0,
      z: 0,
    },
  };
};

const set = (cube: ConwayCube, x: number, y: number, z: number, c: string) => {
  if (!cube.cells.has(z)) cube.cells.set(z, new Map());
  if (!cube.cells.get(z).has(y)) cube.cells.get(z).set(y, new Map());
  cube.cells.get(z).get(y).set(x, c);

  // update min/max
  if (z < cube.min.z) cube.min.z = z;
  if (z > cube.max.z) cube.max.z = z;

  if (y < cube.min.y) cube.min.y = y;
  if (y > cube.max.y) cube.max.y = y;

  if (x < cube.min.x) cube.min.x = x;
  if (x > cube.max.x) cube.max.x = x;
};

const get = (cube: ConwayCube, x: number, y: number, z: number): string => {
  return cube.cells.get(z)?.get(y)?.get(x) ?? '.';
};

const print = (state) => {
  console.log(state.min);
  console.log(state.max);
  for (let z = state.min.z; z <= state.max.z; z++) {
    console.log(`z = ${z}`);
    for (let y = state.min.y; y <= state.max.y; y++) {
      let row = '';
      for (let x = state.min.x; x <= state.max.x; x++) {
        row += get(state, x, y, z);
      }
      console.log(row);
    }
  }
};

const parse_initial_state = (lines: string[]) => {
  const state = empty_cube();
  const z = 0;
  lines.forEach((line, y) => {
    line.split('').forEach((c, x) => {
      set(state, x, y, z, c);
    });
  });
  return state;
};

const process_one_round = (state: ConwayCube): ConwayCube => {
  const newState = empty_cube();

  for (let z = state.min.z - 1; z <= state.max.z + 1; z++) {
    for (let y = state.min.y - 1; y <= state.max.y + 1; y++) {
      for (let x = state.min.x - 1; x <= state.max.x + 1; x++) {
        set(newState, x, y, z, get_new_state(state, x, y, z));
      }
    }
  }

  return newState;
};

const get_new_state = (state, x: number, y: number, z: number): string => {
  const current = get(state, x, y, z);
  let active = 0;
  for (let dz = -1; dz <= 1; dz++) {
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx == 0 && dy == 0 && dz == 0) continue;
        if (get(state, x + dx, y + dy, z + dz) === '#') {
          active++;
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
        if (get(state, x, y, z) === '#') {
          active++;
        }
      }
    }
  }
  return active;
};
