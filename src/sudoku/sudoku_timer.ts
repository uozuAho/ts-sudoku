import { SudokuGenerator } from "./sudoku_generator";
import { SudokuSolver } from "./sudoku_solver";
// import { performance } from "perf_hooks";

export class SudokuTimer {

    private _generator: SudokuGenerator = new SudokuGenerator();
    private _solution_times: number[] = [];

    public run(times: number) {
        for (let i = 0; i < times; i++) {
            const puzzle = this._generator.generate();
            const start = performance.now()
            SudokuSolver.solve(puzzle);
            const end = performance.now();
            this._solution_times.push(end - start);
        }
    }

    public solutionTimes(): number[] {
        return this._solution_times;
    }
}
