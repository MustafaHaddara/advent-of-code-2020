import { SolveFunc } from './types';

export const solve: SolveFunc = (lines: string[]) => {
  const bags = lines.filter((l) => l.length > 0).map((l) => parse_bag(l));
  const contained: Record<string, Set<string>> = {};
  bags.forEach((b) => {
    b.contains.forEach((parent) => {
      if (!contained[parent]) contained[parent] = new Set();
      contained[parent].add(b.color);
    });
  });

  const seen = new Set();
  let next: Set<string> = new Set();
  next.add('shiny gold');
  while (next.size > 0) {
    const nnext: Set<string> = new Set();
    next.forEach((current) => {
      if (!seen.has(current)) {
        seen.add(current);
        if (contained[current]) {
          contained[current].forEach((parent) => {
            nnext.add(parent);
          });
        }
      }
    });
    next = nnext;
  }
  return (seen.size - 1).toString();
};

export const testInput = [
  'light red bags contain 1 bright white bag, 2 muted yellow bags.',
  'dark orange bags contain 3 bright white bags, 4 muted yellow bags.',
  'bright white bags contain 1 shiny gold bag.',
  'muted yellow bags contain 9 faded blue bags, 2 shiny gold bags.',
  'shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.',
  'dark olive bags contain 3 faded blue bags, 4 dotted black bags.',
  'vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.',
  'faded blue bags contain no other bags.',
  'dotted black bags contain no other bags.',
];

type Bag = {
  color: string;
  contains: string[];
};

const parse_bag = (line: string): Bag => {
  const [color, contents] = line.split(' bags contain ');
  return {
    color: color,
    contains: parse_colors(contents),
  };
};

const parse_colors = (contents: string): string[] => {
  if (contents === 'no other bags.') return [];
  const chunks = contents.split(' ');
  const colors = [];
  for (let i = 0; i < chunks.length; i += 4) {
    colors.push(chunks[i + 1] + ' ' + chunks[i + 2]);
  }
  return colors;
};
