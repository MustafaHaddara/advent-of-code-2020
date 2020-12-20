import { SolveFunc } from './types';

export const solve: SolveFunc = (lines) => {
  let i = 0;
  const rules = {};
  while (lines[i] !== '') {
    const [id, rule] = parse_rule(lines[i]);
    rules[id] = rule;
    i++;
  }
  i++;

  let total = 0;
  while (lines[i] !== '') {
    const [res, next_idx] = match(lines[i], 0, '0', rules);
    console.log(res, next_idx);
    if (res && next_idx === lines[i].length) {
      total++;
    }
    i++;
  }
  return total;
};

export const testInput = [
  '0: 4 1 5',
  '1: 2 3 | 3 2',
  '2: 4 4 | 5 5',
  '3: 4 5 | 5 4',
  '4: "a"',
  '5: "b"',
  '',
  'ababbb',
  'bababa',
  'abbbab',
  'aaabbb',
  'aaaabbb',
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
  curr_idx: number,
  rule_id: string,
  rules: Record<string, Rule>,
  buffer = '',
): [boolean, number] => {
  const rule_to_check = rules[rule_id];
  //   console.log(`${buffer}checking ${line} against ${rule_to_check.id} at pos ${curr_idx}`);

  if (rule_to_check.leaf) {
    // console.log(`${buffer}${line[curr_idx]} ${line[curr_idx] === rule_to_check.leaf}`);
    if (line[curr_idx] === rule_to_check.leaf) {
      return [true, curr_idx + 1];
    }
    return [false, 0];
  } else {
    for (let subrule_idx = 0; subrule_idx < rule_to_check.subnode_ids.length; subrule_idx++) {
      const rule_ids = rule_to_check.subnode_ids[subrule_idx];

      let i = curr_idx;
      let success = true;
      for (let ruleidx = 0; ruleidx < rule_ids.length; ruleidx++) {
        const [res, next_i] = match(line, i, rule_ids[ruleidx], rules, buffer + '    ');
        // console.log(`${buffer}check result ${res} ${next_i}`);
        if (!res) {
          success = false;
          break;
        }
        // if (next_i > line.length) {
        //   // consumed too far
        //   success = false;
        //   break;
        // }
        i = next_i;
      }
      if (success) {
        return [true, i];
      }
    }
    return [false, 0];
  }

  //   console.log(`${buffer} ${curr_idx}`);
  return [true, 0];
};
