const readInputFileLines = require('./base').readInputFileLines;

const q:string = process.argv[2];
const num = q.split('-')[0];

const code: DaySolver = require(`./day${q}`);
const lines = readInputFileLines(`inputs/day${num}.txt`);

console.log(code.solve(lines));
