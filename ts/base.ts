let fs = require('fs');

export const readInputFileLines = () : string[] => {
    return fs.readFileSync(process.argv[2],'utf8')
        .split('\n')
        .filter((line: string) => line.length > 0);
}