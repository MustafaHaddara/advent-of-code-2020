import { SolveFunc } from './types';

export const solve: SolveFunc = (lines: string[]) => {
  const passports: Passport[] = parse_passports(lines);
  return passports.filter((p) => is_valid(p)).length.toString();
};

export const testInput = [
  'eyr:1972 cid:100',
  'hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926',
  '',
  'pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980',
  'hcl:#623a2f',
  //   'ecl:gry pid:860033327 eyr:2020 hcl:#fffffd',
  //   'byr:1937 iyr:2017 cid:147 hgt:183cm',
  //   '',
  //   'iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884',
  //   'hcl:#cfa07d byr:1929',
  //   '',
  //   'hcl:#ae17e1 iyr:2013',
  //   'eyr:2024',
  //   'ecl:brn pid:760753108 byr:1931',
  //   'hgt:179cm',
  //   '',
  //   'hcl:#cfa07d eyr:2025 pid:166559648',
  //   'iyr:2011 ecl:brn hgt:59in',
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
  return (
    check_int(p.byr, 1920, 2002) &&
    check_int(p.iyr, 2010, 2020) &&
    check_int(p.eyr, 2020, 2030) &&
    check_height(p.hgt) &&
    check_hair_color(p.hcl) &&
    check_eye_color(p.ecl) &&
    check_passport_id(p.pid)
  );
};

const check_int = (strval, min, max) => {
  if (!strval) return false;
  const val = parseInt(strval);
  return min <= val && val <= max;
};

const check_height = (strval) => {
  if (!strval) return false;
  if (strval.endsWith('cm')) {
    const [h] = strval.split('cm');
    return check_int(h, 150, 193);
  } else if (strval.endsWith('in')) {
    const [h] = strval.split('in');
    return check_int(h, 59, 76);
  }
  return false;
};

const check_hair_color = (strval) => {
  if (!strval) return false;
  if (strval.startsWith('#') && strval.length === 7) {
    return strval.split('').filter((c) => '1234567890abcdef'.indexOf(c) < 0).length === 1;
  }
  return false;
};

const check_eye_color = (strval) => {
  if (!strval) return false;
  const accepted = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
  return accepted.indexOf(strval) >= 0;
};

const check_passport_id = (strval) => {
  if (!strval) return false;
  if (strval.length !== 9) return false;
  strval.split('').map((c) => parseInt(c));
  return true;
};
