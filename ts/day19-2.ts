import { SolveFunc } from './types';

export const solve: SolveFunc = (lines) => {
  let i = 0;
  const rules = {};
  while (lines[i] !== '') {
    const [id, rule] = parse_rule(lines[i]);
    rules[id] = rule;
    i++;
  }

  // part 2 modified input
  rules['8'] = parse_rule('8: 42 8 | 42')[1];
  rules['11'] = parse_rule('11: 42 11 31 | 42 31')[1];

  i++;

  let total = 0;
  while (lines[i] !== '') {
    const next_idx = match(lines[i], [0], '0', rules);
    // console.log(lines[i], lines[i].length, next_idx);
    if (next_idx.indexOf(lines[i].length) >= 0) {
      total++;
    }
    i++;
  }
  return total;
};

// export const testInput = [
//   '0: 8 11',
//   '8: 42 8 | 42',
//   '11: 42 31 | 42 11 31',
//   '42: "a"',
//   '31: "b"',
//   '',
//   'aaaabb',
//   //   'aaa',
//   '',
// ];
export const testInput = [
  '42: 9 14 | 10 1',
  '9: 14 27 | 1 26',
  '10: 23 14 | 28 1',
  '1: "a"',
  '11: 42 31',
  '5: 1 14 | 15 1',
  '19: 14 1 | 14 14',
  '12: 24 14 | 19 1',
  '16: 15 1 | 14 14',
  '31: 14 17 | 1 13',
  '6: 14 14 | 1 14',
  '2: 1 24 | 14 4',
  '0: 8 11',
  '13: 14 3 | 1 12',
  '15: 1 | 14',
  '17: 14 2 | 1 7',
  '23: 25 1 | 22 14',
  '28: 16 1',
  '4: 1 1',
  '20: 14 14 | 1 15',
  '3: 5 14 | 16 1',
  '27: 1 6 | 14 18',
  '14: "b"',
  '21: 14 1 | 1 14',
  '25: 1 1 | 1 14',
  '22: 14 14',
  '8: 42',
  '26: 14 22 | 1 20',
  '18: 15 15',
  '7: 14 5 | 1 21',
  '24: 14 1',
  '',
  'abbbbbabbbaaaababbaabbbbabababbbabbbbbbabaaaa',
  'bbabbbbaabaabba',
  'babbbbaabbbbbabbbbbbaabaaabaaa',
  'aaabbbbbbaaaabaababaabababbabaaabbababababaaa',
  'bbbbbbbaaaabbbbaaabbabaaa',
  'bbbababbbbaaaaaaaabbababaaababaabab',
  'ababaaaaaabaaab',
  'ababaaaaabbbaba',
  'baabbaaaabbaaaababbaababb',
  'abbbbabbbbaaaababbbbbbaaaababb',
  'aaaaabbaabaaaaababaa',
  'aaaabbaaaabbaaa',
  'aaaabbaabbaaaaaaabbbabbbaaabbaabaaa',
  'babaaabbbaaabaababbaabababaaab',
  'aabbbbbaabbbaaaaaabbbbbababaaaaabbaaabba',
  '',
];

type Rule = {
  id: string;
  leaf: string;
  subnode_ids: string[];
};

const parse_rule = (line: string): [string, Rule] => {
  const [id, body] = line.split(': ');
  const rule = {
    id,
    leaf: null,
    subnode_ids: null,
  };

  if (body.startsWith('"')) {
    rule.leaf = body[1]; // only single chars allowed
  } else {
    rule.subnode_ids = body.split(' | ').map((chunk) => chunk.split(' '));
  }

  return [id, rule];
};

// returns true if the first part of the line is a match
// returns the idx of the first non matching char
const match = (
  line: string,
  starting_indices: number[],
  rule_id: string,
  rules: Record<string, Rule>,
  buffer = '',
): number[] => {
  const rule_to_check = rules[rule_id];
  //   console.log(`${buffer}checking ${line} against ${rule_to_check.id} at pos ${curr_idx}`);

  const successes = [];
  if (rule_to_check.leaf) {
    // console.log(`${buffer}>${line[curr_idx]} ${line[curr_idx] === rule_to_check.leaf}`);
    starting_indices
      .filter((curr_idx) => line[curr_idx] === rule_to_check.leaf)
      .forEach((curr_idx) => successes.push(curr_idx + 1));
  } else {
    for (let subrule_idx = 0; subrule_idx < rule_to_check.subnode_ids.length; subrule_idx++) {
      const rule_ids = rule_to_check.subnode_ids[subrule_idx]; // 8 11

      let next_indices = starting_indices;
      let success = true;

      for (let ruleidx = 0; ruleidx < rule_ids.length; ruleidx++) {
        // console.log(`${buffer}checking ${rule_ids[ruleidx]} starting from ${next_indices}`);
        const next_idxs = match(line, next_indices, rule_ids[ruleidx], rules, buffer + '    ');
        // console.log(`${buffer}${rule_ids[ruleidx]} (idx: ${ruleidx}) found ${next_idxs}`);
        // next_idxs = [1, 2, 3, 4]
        // console.log(`${buffer}check result ${next_idxs}`);
        if (next_idxs.length === 0) {
          success = false;
          break;
        }

        next_indices = next_idxs;
      }

      if (success) {
        successes.push(...next_indices);
      }
    }
  }
  return successes;
};
