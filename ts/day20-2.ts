import { SolveFunc } from './types';

export const solve: SolveFunc = (lines) => {
  const tiles: Record<string, Variant> = parse_tiles(lines);
  Object.values(tiles).forEach((t) => populate_variants(t));

  const grid: GridEntry[][] = find_arrangement(tiles);

  console.log('found grid');
  const image: Tile = collapse_grid(grid, tiles);

  print_image(image);
  const flipped = find_monster_orientation(image);
  //   console.log('aha');
  //   print_image(flipped);

  mark_monster(flipped, base_monster);

  //   console.log('---');
  //   print_image(flipped);
  //   console.log(flipped.map((row) => row.filter((c) => c === '#').length));

  return flipped.map((row) => row.filter((c) => c === '#').length).reduce((total, current) => total + current, 0);
};

export const testInput = [
  'Tile 2311:',
  '..##.#..#.',
  '##..#.....',
  '#...##..#.',
  '####.#...#',
  '##.##.###.',
  '##...#.###',
  '.#.#.#..##',
  '..#....#..',
  '###...#.#.',
  '..###..###',
  '',
  'Tile 1951:',
  '#.##...##.',
  '#.####...#',
  '.....#..##',
  '#...######',
  '.##.#....#',
  '.###.#####',
  '###.##.##.',
  '.###....#.',
  '..#.#..#.#',
  '#...##.#..',
  '',
  'Tile 1171:',
  '####...##.',
  '#..##.#..#',
  '##.#..#.#.',
  '.###.####.',
  '..###.####',
  '.##....##.',
  '.#...####.',
  '#.##.####.',
  '####..#...',
  '.....##...',
  '',
  'Tile 1427:',
  '###.##.#..',
  '.#..#.##..',
  '.#.##.#..#',
  '#.#.#.##.#',
  '....#...##',
  '...##..##.',
  '...#.#####',
  '.#.####.#.',
  '..#..###.#',
  '..##.#..#.',
  '',
  'Tile 1489:',
  '##.#.#....',
  '..##...#..',
  '.##..##...',
  '..#...#...',
  '#####...#.',
  '#..#.#.#.#',
  '...#.#.#..',
  '##.#...##.',
  '..##.##.##',
  '###.##.#..',
  '',
  'Tile 2473:',
  '#....####.',
  '#..#.##...',
  '#.##..#...',
  '######.#.#',
  '.#...#.#.#',
  '.#########',
  '.###.#..#.',
  '########.#',
  '##...##.#.',
  '..###.#.#.',
  '',
  'Tile 2971:',
  '..#.#....#',
  '#...###...',
  '#.#.###...',
  '##.##..#..',
  '.#####..##',
  '.#..####.#',
  '#..#.#..#.',
  '..####.###',
  '..#.#.###.',
  '...#.#.#.#',
  '',
  'Tile 2729:',
  '...#.#.#.#',
  '####.#....',
  '..#.#.....',
  '....#..#.#',
  '.##..##.#.',
  '.#.####...',
  '####.#.#..',
  '##.####...',
  '##..#.##..',
  '#.##...##.',
  '',
  'Tile 3079:',
  '#.#.#####.',
  '.#..######',
  '..#.......',
  '######....',
  '####.#..#.',
  '.#...#.##.',
  '#.#####.##',
  '..#.###...',
  '..#.......',
  '..#.###...',
  '',
];

type Variant = {
  id: string;
  grids: Tile[];
};

type Tile = string[][];

type GridEntry = {
  id: string;
  variant_idx: number;
};

const print_image = (image: Tile) => {
  for (let y = 0; y < image.length; y++) {
    let row = '';
    for (let x = 0; x < image[y].length; x++) {
      row += image[y][x];
    }
    console.log(row);
  }
};

const parse_tiles = (rows: string[]) => {
  let idx = 0;

  const tiles: Record<string, Variant> = {};
  while (idx < rows.length) {
    let id = '';
    let grid = [];
    while (rows[idx] !== '') {
      const row = rows[idx];
      if (row.startsWith('Tile')) {
        id = row.split(' ')[1].split(':')[0];
      } else {
        grid.push(row.split(''));
      }
      idx++;
    }
    idx++;

    tiles[id] = {
      id,
      grids: [grid],
    };
    id = '';
    grid = [];
  }
  return tiles;
};

const populate_variants = (tile: Variant) => {
  tile.grids = generate_variants(tile.grids[0]);
};

const generate_variants = (t: Tile) => {
  const variants = [t];
  for (let i = 0; i < 3; i++) {
    variants.push(rot90(variants[i]));
  }
  for (let i = 0; i < 4; i++) {
    variants.push(flip(variants[i]));
  }
  return variants;
};

const rot90 = (grid: Tile) => {
  const rotated = [];
  for (let y = 0; y < grid.length; y++) {
    const row = grid[y];
    for (let x = 0; x < row.length; x++) {
      const newx = row.length - y - 1;
      const newy = x;
      if (rotated[newy] === undefined) rotated[newy] = [];
      rotated[newy][newx] = row[x];
    }
  }
  return rotated;
};

const flip = (grid: Tile) => {
  const flipped = [];
  for (let y = 0; y < grid.length; y++) {
    const row = grid[y];
    for (let x = 0; x < row.length; x++) {
      const newx = row.length - x - 1;
      const newy = y;
      if (flipped[newy] === undefined) flipped[newy] = [];
      flipped[newy][newx] = row[x];
    }
  }
  return flipped;
};

const find_arrangement = (tiles: Record<number, Variant>): GridEntry[][] => {
  const result: GridEntry[][] = [];
  const side_length = Math.sqrt(Object.keys(tiles).length);
  for (let i = 0; i < side_length; i++) {
    result[i] = [];
    for (let j = 0; j < side_length; j++) {
      result[i][j] = { id: null, variant_idx: null };
    }
  }

  return inner_find_arrangement(result, tiles);
};

const inner_find_arrangement = (
  grid_so_far: GridEntry[][],
  tiles: Record<number, Variant>,
  x = 0,
  y = 0,
): GridEntry[][] => {
  const used_ids = grid_so_far.flatMap((row) => row.map((e) => e.id)).filter((item) => item !== null);
  //   console.log(used_ids);
  const ids = Object.keys(tiles).filter((tile_id) => used_ids.indexOf(tile_id) < 0);

  for (const available_id of ids) {
    const new_grid = grid_so_far.map((row) => [...row]); // clone the grid
    for (let i = 0; i < 8; i++) {
      //   console.log(`trying tile ${available_id} variant #${i} at ${x} ${y}`);
      const tile: Tile = tiles[available_id].grids[i];
      if (can_fit(new_grid, tiles, x, y, tile)) {
        new_grid[y][x] = { id: available_id, variant_idx: i };
        if (x + 1 === new_grid.length && y + 1 === new_grid.length) {
          return new_grid; // success!!
        }
        let newx = x + 1;
        let newy = y;
        if (newx === new_grid.length) {
          newx = 0;
          newy = y + 1;
        }
        const res = inner_find_arrangement(new_grid, tiles, newx, newy);
        if (res !== null) {
          return res; // success!
        }
      }
    }
  }

  return null;
};

const can_fit = (grid: GridEntry[][], tiles: Record<number, Variant>, x: number, y: number, t: Tile) => {
  if (x > 0) {
    // check left
    const leftTileEntry = grid[y][x - 1];
    const leftTile = tiles[leftTileEntry.id].grids[leftTileEntry.variant_idx];
    if (get_right(leftTile) !== get_left(t)) return false;
  }
  if (y > 0) {
    // check top
    const topTileEntry = grid[y - 1][x];
    const topTile = tiles[topTileEntry.id].grids[topTileEntry.variant_idx];
    if (get_bottom(topTile) !== get_top(t)) return false;
  }
  return true;
};

const get_top = (tile: Tile) => {
  return tile[0].join('');
};

const get_bottom = (tile: Tile) => {
  return tile[tile.length - 1].join('');
};

const get_left = (tile: Tile) => {
  return tile.map((r) => r[0]).join('');
};

const get_right = (tile: Tile) => {
  return tile.map((r) => r[r.length - 1]).join('');
};

const collapse_grid = (grid: GridEntry[][], tiles: Record<number, Variant>): Tile => {
  const tile_array: Tile[][] = grid.map((row) => row.map((entry) => tiles[entry.id].grids[entry.variant_idx]));

  const full_image = [];

  const side_length = tile_array[0][0].length;
  let yoffset = 0;
  for (let y = 0; y < tile_array.length; y++) {
    const row = tile_array[y];
    let xoffset = 0;
    for (let x = 0; x < row.length; x++) {
      const tile = tile_array[y][x];

      for (let ypos = 1; ypos < tile.length - 1; ypos++) {
        for (let xpos = 1; xpos < tile[ypos].length - 1; xpos++) {
          const char = tile[ypos][xpos];
          if (full_image[yoffset + ypos - 1] === undefined) full_image[yoffset + ypos - 1] = [];
          full_image[yoffset + ypos - 1][xoffset + xpos - 1] = char;
        }
      }
      xoffset += side_length - 2;
    }
    yoffset += side_length - 2;
  }

  return full_image;
};

const base_monster = [
  '                  # '.split(''),
  '#    ##    ##    ###'.split(''),
  ' #  #  #  #  #  #   '.split(''),
];

const find_monster_orientation = (image: Tile): Tile => {
  const variations = generate_variants(image);
  for (const imagev of variations) {
    // console.log(' -- ');
    if (contains(imagev, base_monster)) {
      return imagev;
    }
  }
};

const contains = (image: Tile, monster: Tile) => {
  for (let imagey = 0; imagey < image.length - monster.length; imagey++) {
    const row = image[imagey];
    for (let imagex = 0; imagex < row.length - monster[0].length; imagex++) {
      // imagex, imagey is a starting pos
      if (contains_starting_at(image, monster, imagex, imagey)) {
        return true;
      }
    }
  }
  return false;
};

const contains_starting_at = (image: Tile, monster: Tile, imagex: number, imagey: number) => {
  for (let my = 0; my < monster.length; my++) {
    for (let mx = 0; mx < monster[my].length; mx++) {
      const m = monster[my][mx];
      if (m === ' ') continue;
      const pixel = image[imagey + my][imagex + mx];
      if (pixel !== '#') return false;
    }
  }
  return true;
};

const mark_monster = (image: Tile, monster: Tile) => {
  for (let imagey = 0; imagey < image.length - monster.length; imagey++) {
    const row = image[imagey];
    for (let imagex = 0; imagex < row.length - monster[0].length; imagex++) {
      // imagex, imagey is a starting pos
      if (contains_starting_at(image, monster, imagex, imagey)) {
        mark_starting_at(image, monster, imagex, imagey);
      }
    }
  }
  return false;
};

const mark_starting_at = (image: Tile, monster: Tile, imagex: number, imagey: number) => {
  for (let my = 0; my < monster.length; my++) {
    for (let mx = 0; mx < monster[my].length; mx++) {
      const m = monster[my][mx];
      if (m === '#') {
        image[imagey + my][imagex + mx] = 'O';
      }
    }
  }
  return true;
};
