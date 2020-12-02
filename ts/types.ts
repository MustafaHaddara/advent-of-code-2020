export interface SolveFunc {
  (lines: string[]): string;
}
export interface DaySolver {
  solve: SolveFunc;
  testInput: string[];
}
