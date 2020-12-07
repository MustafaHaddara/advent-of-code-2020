import { SolveFunc } from './types';

export const solve: SolveFunc = (lines: string[]) => {
  const bags = lines.filter((l) => l.length > 0).map((l) => parse_bag(l));
  const contains: Record<string, Set<string>> = {};
  const colorLookup: Record<string, Bag> = {};
  bags.forEach((b) => {
    colorLookup[b.color] = b;
    contains[b.color] = new Set();
    Object.keys(b.contains).forEach((child) => {
      contains[b.color].add(child);
    });
  });

  return find_bags_in('shiny gold', colorLookup).toString();
};

// export const testInput = [
//   'light red bags contain 1 bright white bag, 2 muted yellow bags.',
//   'dark orange bags contain 3 bright white bags, 4 muted yellow bags.',
//   'bright white bags contain 1 shiny gold bag.',
//   'muted yellow bags contain 9 faded blue bags, 2 shiny gold bags.',
//   'shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.',
//   'dark olive bags contain 3 faded blue bags, 4 dotted black bags.',
//   'vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.',
//   'faded blue bags contain no other bags.',
//   'dotted black bags contain no other bags.',
// ];

export const testInput = [
  'shiny gold bags contain 2 dark red bags.',
  'dark red bags contain 2 dark orange bags.',
  'dark orange bags contain 2 dark yellow bags.',
  'dark yellow bags contain 2 dark green bags.',
  'dark green bags contain 2 dark blue bags.',
  'dark blue bags contain 2 dark violet bags.',
  'dark violet bags contain no other bags.',
];

type Bag = {
  color: string;
  contains: Record<string, number>;
};

const parse_bag = (line: string): Bag => {
  const [color, contents] = line.split(' bags contain ');
  return {
    color: color,
    contains: parse_colors(contents),
  };
};

const parse_colors = (contents: string): Record<string, number> => {
  if (contents === 'no other bags.') return {};
  const chunks = contents.split(' ');
  const colors = {};
  for (let i = 0; i < chunks.length; i += 4) {
    colors[chunks[i + 1] + ' ' + chunks[i + 2]] = parseInt(chunks[i]);
  }
  return colors;
};

const find_bags_in = (color: string, lookup: Record<string, Bag>): number => {
  const bag = lookup[color];
  let total = 0;
  Object.keys(bag.contains).forEach((child) => {
    const num = bag.contains[child];
    total += num * find_bags_in(child, lookup);
    total += num;
  });
  return total;
};
