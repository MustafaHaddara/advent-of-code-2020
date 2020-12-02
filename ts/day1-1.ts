export const solve: SolveFunc = (lines: string[]) => {
  const nums: number[] = lines.map((line) => parseInt(line));

  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === 2020) {
        return (nums[i] * nums[j]).toString();
      }
    }
  }
};
