import { SolveFunc } from './types';

export const solve: SolveFunc = (lines) => {
  const black_tiles: Set<string> = new Set();
  lines
    .filter((line) => line.length > 0)
    .map((line) => resolve_addr(line).toString())
    .forEach((addr) => (black_tiles.has(addr) ? black_tiles.delete(addr) : black_tiles.add(addr)));
  return black_tiles.size;
};

export const testInput = [
  //   'esew',
  //   'nwwswee',
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
