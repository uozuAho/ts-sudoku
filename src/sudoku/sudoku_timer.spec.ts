import { SudokuTimer } from "./sudoku_timer";

describe('SudokuTimer', () => {
    it('should solve 10 puzzles', () => {
        const timer = new SudokuTimer();

        timer.run(10);

        expect(timer.solutionTimes()).toHaveLength(10);
    });
});
