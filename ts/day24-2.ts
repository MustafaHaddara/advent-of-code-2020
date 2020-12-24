import { SolveFunc } from './types';

export const solve: SolveFunc = (lines) => {
  const tiles: Map<number, Map<number, boolean>> = new Map();
  const min = { x: null, y: null };
  const max = { x: null, y: null };

  // populate day 0 state
  lines
    .filter((line) => line.length > 0)
    .map((line) => resolve_addr(line))
    .forEach(([x, y]) => {
      if (!tiles.has(x)) {
        tiles.set(x, new Map());
      }

      tiles.get(x).set(y, !tiles.get(x).get(y));

      if (min.x === null || x < min.x) min.x = x;
      if (max.x === null || x > max.x) max.x = x;
      if (min.y === null || y < min.y) min.y = y;
      if (max.y === null || y > max.y) max.y = y;
    });

  const state: ConwayHex = {
    tiles,
    min,
    max,
  };

  //   print_grid(state);
  for (let i = 0; i < 100; i++) {
    conway(state);
  }

  return num_black(state);
};

export const testInput = [
  'sesenwnenenewseeswwswswwnenewsewsw',
  'neeenesenwnwwswnenewnwwsewnenwseswesw',
  'seswneswswsenwwnwse',
  'nwnwneseeswswnenewneswwnewseswneseene',
  'swweswneswnenwsewnwneneseenw',
  'eesenwseswswnenwswnwnwsewwnwsene',
  'sewnenenenesenwsewnenwwwse',
  'wenwwweseeeweswwwnwwe',
  'wsweesenenewnwwnwsenewsenwwsesesenwne',
  'neeswseenwwswnwswswnw',
  'nenwswwsewswnenenewsenwsenwnesesenew',
  'enewnwewneswsewnwswenweswnenwsenwsw',
  'sweneswneswneneenwnewenewwneswswnese',
  'swwesenesewenwneswnwwneseswwne',
  'enesenwswwswneneswsenwnewswseenwsese',
  'wnwnesenesenenwwnenwsewesewsesesew',
  'nenewswnwewswnenesenwnesewesw',
  'eneswnwswnwsenenwnwnwwseeswneewsenese',
  'neswnwewnwnwseenwseesewsenwsweewe',
  'wseweeenwnesenwwwswnew',
  '',
];

type ConwayHex = {
  tiles: Map<number, Map<number, boolean>>;
  min: Vec2;
  max: Vec2;
};

type Vec2 = {
  x: number;
  y: number;
};

const resolve_addr = (directions: string): [number, number] => {
  let x = 0;
  let y = 0;

  for (let i = 0; i < directions.length; i++) {
    const c = directions[i];
    if (c === 's' || c === 'n') {
      if (c === 'n') y++;
      else if (c === 's') y--;
      else console.log(`invalid c: ${c}`);

      const c2 = directions[i + 1];
      if (c2 === 'e') x++;
      else if (c2 === 'w') x--;
      else console.log(`invalid c2: ${c2}`);
      i++;
    } else {
      if (c === 'e') x += 2;
      else if (c === 'w') x -= 2;
      else console.log(`invalid c: ${c}`);
    }
  }

  //   console.log(`${directions} ${x} ${y}`);

  return [x, y];
};

const print_grid = (state: ConwayHex) => {
  for (let y = state.max.y; y >= state.min.y; y--) {
    let row = '';
    let startx = state.min.x;
    if (y % 2 === 0) {
      row += ' ';
      if (startx % 2 !== 0) {
        startx--;
      }
    } else {
      if (startx % 2 === 0) {
        startx--;
      }
    }
    for (let x = startx; x <= state.max.x + 1; x += 2) {
      const c = get(state, x, y) ? 'X' : '.';
      row = row + c + ' ';
    }
    console.log(row);
  }
};

const conway = (state: ConwayHex) => {
  const new_tiles: Map<number, Map<number, boolean>> = new Map();

  for (let y = state.min.y - 1; y <= state.max.y + 1; y++) {
    let startx = state.min.x;
    if (y % 2 === 0) {
      if (startx % 2 !== 0) {
        startx--;
      }
    } else {
      if (startx % 2 === 0) {
        startx--;
      }
    }

    for (let x = startx; x <= state.max.x + 1; x += 2) {
      const current_color = get(state, x, y);
      const num_black = num_black_around(state, x, y);
      let new_color = false;
      if (current_color) {
        // black
        if (num_black === 0 || num_black > 2) {
          new_color = false;
        } else {
          new_color = true;
        }
      } else {
        // white
        if (num_black === 2) {
          new_color = true;
        } else {
          new_color = false;
        }
      }
      set_tile(new_tiles, x, y, new_color);
    }
  }
  // bumping min/max on each iter probably makes this really slow?
  state.min.x -= 2;
  state.min.y -= 1;
  state.max.x += 2;
  state.max.y += 1;
  state.tiles = new_tiles;
};

const num_black_around = (state: ConwayHex, x: number, y: number): number => {
  const around = [
    [x - 1, y + 1], // nw
    [x + 1, y + 1], // ne
    [x + 2, y], // e
    [x + 1, y - 1], // se
    [x - 1, y - 1], // sw
    [x - 2, y], // w
  ];

  return around.map((addr) => get(state, addr[0], addr[1])).filter((c) => c).length;
};

const get = (state: ConwayHex, x: number, y: number) => {
  return !!state.tiles.get(x)?.get(y);
};

const set_tile = (tiles: Map<number, Map<number, boolean>>, x: number, y: number, val: boolean) => {
  if (!tiles.has(x)) {
    tiles.set(x, new Map());
  }
  tiles.get(x).set(y, val);
};

const num_black = (state: ConwayHex) => {
  let total = 0;
  state.tiles.forEach((col) =>
    col.forEach((cell) => {
      if (cell) total++;
    }),
  );
  return total;
};
