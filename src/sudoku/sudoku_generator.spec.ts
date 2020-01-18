import { SudokuGenerator } from "./sudoku_generator";

describe('SudokuGenerator', () => {
    it('should generate puzzles', () => {
        const puzzle = new SudokuGenerator().generate();
        // console.log(puzzle.toString());
    });
});
