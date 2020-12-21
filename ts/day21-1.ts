import { SolveFunc } from './types';

export const solve: SolveFunc = (lines) => {
  const ingredients_counts: Record<string, number> = {};
  const allergens_to_possible_ingredients: Record<string, string[]> = lines
    .filter((line) => line.length > 0)
    .map((line) => parse_line(line))
    .reduce((state, [ingredients, allergens]) => {
      ingredients.forEach((i) => (ingredients_counts[i] ? ingredients_counts[i]++ : (ingredients_counts[i] = 1)));
      const new_state = { ...state };
      allergens.forEach((a) => {
        if (new_state[a] === undefined) {
          new_state[a] = ingredients;
        } else {
          new_state[a] = intersect(new_state[a], ingredients);
        }
      });
      return new_state;
    }, {});

  const bad_ingredients = new Set();
  Object.values(allergens_to_possible_ingredients).forEach((ingredients_list) => {
    ingredients_list.forEach((i) => bad_ingredients.add(i));
  });

  const safe_ingredents = Object.keys(ingredients_counts).filter((i) => !bad_ingredients.has(i));

  return safe_ingredents.map((i) => ingredients_counts[i]).reduce((total, c) => total + c, 0);
};

export const testInput = [
  'mxmxvkd kfcds sqjhc nhms (contains dairy, fish)',
  'trh fvjkl sbzzf mxmxvkd (contains dairy)',
  'sqjhc fvjkl (contains soy)',
  'sqjhc mxmxvkd sbzzf (contains fish)',
  '',
];

const parse_line = (line: string): [string[], string[]] => {
  const [ingredients, allergens] = line.split(' (contains ');
  return [
    ingredients.split(' '),
    allergens.split(', ').map((a: string) => (a.indexOf(')') > 0 ? a.slice(0, a.length - 1) : a)),
  ];
};

const intersect = (l1: string[], l2: string[]) => {
  return l1.filter((item) => l2.indexOf(item) >= 0);
};
