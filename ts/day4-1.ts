import { SolveFunc } from './types';

export const solve: SolveFunc = (lines: string[]) => {
  const passports: Passport[] = parse_passports(lines);
  return passports.filter((p) => is_valid(p)).length.toString();
};

export const testInput = [
  'ecl:gry pid:860033327 eyr:2020 hcl:#fffffd',
  'byr:1937 iyr:2017 cid:147 hgt:183cm',
  '',
  'iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884',
  'hcl:#cfa07d byr:1929',
  '',
  'hcl:#ae17e1 iyr:2013',
  'eyr:2024',
  'ecl:brn pid:760753108 byr:1931',
  'hgt:179cm',
  '',
  'hcl:#cfa07d eyr:2025 pid:166559648',
  'iyr:2011 ecl:brn hgt:59in',
];

type Passport = {
  byr: string;
  iyr: string;
  eyr: string;
  hgt: string;
  hcl: string;
  ecl: string;
  pid: string;
  cid: string;
};

const parse_passports = (lines: string[]): Passport[] => {
  let p: Passport = make_blank_passport();
  const result = [p];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === '') {
      p = make_blank_passport();
      result.push(p);
    }
    line.split(' ').map((chunk) => {
      const [k, v] = chunk.split(':');
      p[k] = v;
    });
  }
  return result;
};

const make_blank_passport = (): Passport => {
  return {
    byr: null,
    iyr: null,
    eyr: null,
    hgt: null,
    hcl: null,
    ecl: null,
    pid: null,
    cid: null,
  };
};

const is_valid = (p: Passport): boolean => {
  const required_fields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
  for (const field of required_fields) {
    if (!p[field]) {
      return false;
    }
  }
  return true;
};
