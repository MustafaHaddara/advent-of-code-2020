import { SolveFunc } from './types';

export const solve: SolveFunc = (lines) => {
  let i = 0;
  const fields = [];
  while (lines[i] !== '') {
    const line = lines[i];
    fields.push(parse_ranges(line));
    i++;
  }
  init_indices(fields);

  while (lines[i] !== 'your ticket:') {
    i++;
  }
  i++; // skip the header
  const my_ticket = lines[i].split(',').map((c) => parseInt(c));

  while (lines[i] !== 'nearby tickets:') {
    i++;
  }
  i++; // skip the header
  const valid_lines: number[][] = [];
  while (i < lines.length) {
    if (lines[i] === '') break;
    const ticket = lines[i].split(',').map((c) => parseInt(c));
    if (ticket_is_valid(ticket, fields)) {
      valid_lines.push(ticket);
    }
    i++;
  }
  determine_field_indices(valid_lines, fields);

  return add_departure_fields(my_ticket, fields);
};

export const testInput = [
  'class: 1-3 or 5-7',
  'row: 6-11 or 33-44',
  'seat: 13-40 or 45-50',
  '',
  'your ticket:',
  '7,1,14',
  '',
  'nearby tickets:',
  '7,3,47',
  '40,4,50',
  '55,2,20',
  '38,6,12',
];

type Field = {
  name: string;
  ranges: Range[];
  indices: number[];
};

type Range = {
  min: number;
  max: number;
};

const parse_ranges = (line: string): Field => {
  const [name, spec] = line.split(': ');
  return {
    name: name,
    indices: [],
    ranges: spec.split(' or ').map((c) => {
      const [min, max] = c.split('-');
      return {
        min: parseInt(min),
        max: parseInt(max),
      };
    }),
  };
};

const init_indices = (fields: Field[]) => {
  const indices = [];
  for (let i = 0; i < fields.length; i++) indices.push(i);
  fields.forEach((f) => (f.indices = [...indices]));
};

const ticket_is_valid = (line: number[], fields: Field[]) => {
  return line.every((num) => field_is_valid(num, fields));
};

const field_is_valid = (num: number, fields: Field[]) => {
  return fields.some((field) => field_matches(num, field));
};

const field_matches = (num: number, field: Field) => {
  return field.ranges.some((range) => range.min <= num && num <= range.max);
};

const determine_field_indices = (valid_rows: number[][], fields: Field[]) => {
  while (!determined(fields)) {
    let changed = false;
    for (let i = 0; i < valid_rows.length; i++) {
      const nums = valid_rows[i];
      nums.forEach((value, idx) => {
        const potential = potential_fields(value, fields).map((f) => f.name);
        fields
          .filter((f) => f.indices.length > 1)
          .forEach((field) => {
            if (potential.indexOf(field.name) < 0) {
              field.indices = field.indices.filter((i) => i != idx);
              changed = true;
            }
          });
      });
    }

    const found_fields = fields.filter((f) => f.indices.length === 1);
    found_fields.forEach((found) => {
      fields
        .filter((f) => f.indices.length > 1)
        .forEach((f) => {
          f.indices = f.indices.filter((i) => i !== found.indices[0]);
        });
    });

    if (!changed) {
      console.log('deadlock!');
      break;
    }
  }
};

const potential_fields = (num: number, fields: Field[]) => {
  return fields.filter((field) => field.indices.length > 1).filter((field) => field_matches(num, field));
};

const determined = (fields: Field[]) => {
  return departure_fields(fields).every((f) => f.indices.length === 1);
};

const departure_fields = (fields: Field[]) => {
  return fields.filter((f) => f.name.startsWith('departure'));
};

const add_departure_fields = (my_ticket: number[], fields: Field[]) => {
  return departure_fields(fields)
    .map((f) => f.indices[0]) // indices
    .map((idx) => my_ticket[idx]) // vals
    .reduce((total, current) => total * current, 1);
};
