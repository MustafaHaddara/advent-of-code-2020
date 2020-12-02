let fs = require('fs');

const q:string = process.argv[2];
const num = q.split('-')[0];

const code: DaySolver = require(`./day${q}`);
const lines = fs.readFileSync(`inputs/day${num}.txt`,'utf8')
        .split('\n')
        .filter((line: string) => line.length > 0);


console.log(code.solve(lines));
