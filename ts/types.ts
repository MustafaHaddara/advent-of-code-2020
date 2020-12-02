interface SolveFunc {
  (lines: string[]): string;
}
interface DaySolver {
  solve: SolveFunc;
  testInput: string[];
}
