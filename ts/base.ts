let fs = require('fs');

export const readInputFileLines = (fname: string) : string[] => {
    return fs.readFileSync(fname,'utf8')
        .split('\n')
        .filter((line: string) => line.length > 0);
}