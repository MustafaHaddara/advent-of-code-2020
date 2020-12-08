export interface SolveFunc {
  (lines: string[]): string | number;
}

export interface DaySolver {
  solve: SolveFunc;
  testInput: string[];
}
