import { SudokuSolver } from "./sudoku_solver";
import { ValuesMap } from "./values_map";

describe('SudokuSolver', () => {
    it('should solve easy puzzle', () => {
        const initial_values = ValuesMap.fromString(
            '003020600900305001001806400008102900700000008006708200002609500800203009005010300');

        const solution = SudokuSolver.solve(initial_values);

        expect(solution).not.toBe(null);
        expect(solution!.toString()).toEqual(
            '4 8 3 |9 2 1 |6 5 7 \n' +
            '9 6 7 |3 4 5 |8 2 1 \n' +
            '2 5 1 |8 7 6 |4 9 3 \n' +
            '------+------+------\n' +
            '5 4 8 |1 3 2 |9 7 6 \n' +
            '7 2 9 |5 6 4 |1 3 8 \n' +
            '1 3 6 |7 9 8 |2 4 5 \n' +
            '------+------+------\n' +
            '3 7 2 |6 8 9 |5 1 4 \n' +
            '8 1 4 |2 5 3 |7 6 9 \n' +
            '6 9 5 |4 1 7 |3 8 2 \n'
        );
    });

    it('should give back already solved puzzle', () => {
        const initial_values = ValuesMap.fromString(
            '4 8 3 |9 2 1 |6 5 7 \n' +
            '9 6 7 |3 4 5 |8 2 1 \n' +
            '2 5 1 |8 7 6 |4 9 3 \n' +
            '------+------+------\n' +
            '5 4 8 |1 3 2 |9 7 6 \n' +
            '7 2 9 |5 6 4 |1 3 8 \n' +
            '1 3 6 |7 9 8 |2 4 5 \n' +
            '------+------+------\n' +
            '3 7 2 |6 8 9 |5 1 4 \n' +
            '8 1 4 |2 5 3 |7 6 9 \n' +
            '6 9 5 |4 1 7 |3 8 2 \n');

        const solution = SudokuSolver.solve(initial_values);

        expect(solution).not.toBe(null);
        expect(solution!.equals(initial_values)).toBe(true);
    });

    it('should return null for unsolvable puzzle', () => {
        const initial_values = ValuesMap.fromString('1'.repeat(81));

        expect(SudokuSolver.solve(initial_values)).toBe(null);
    });

    it('should solve harder puzzle', () => {
        const initial_values = ValuesMap.fromString(
            '4.....8.5.3..........7......2.....6.....8.4......1.......6.3.7.5..2.....1.4......');

        const expected_solution = ValuesMap.fromString(
            '4 1 7 |3 6 9 |8 2 5 \n' +
            '6 3 2 |1 5 8 |9 4 7 \n' +
            '9 5 8 |7 2 4 |3 1 6 \n' +
            '------+------+----- \n' +
            '8 2 5 |4 3 7 |1 6 9 \n' +
            '7 9 1 |5 8 6 |4 3 2 \n' +
            '3 4 6 |9 1 2 |7 5 8 \n' +
            '------+------+----- \n' +
            '2 8 9 |6 4 3 |5 7 1 \n' +
            '5 7 3 |2 9 1 |6 8 4 \n' +
            '1 6 4 |8 7 5 |2 9 3');

        const solution = SudokuSolver.solve(initial_values);
        expect(solution).not.toBe(null);
        expect(solution!.equals(expected_solution)).toBe(true);
    });

    it('should solve hardest puzzle', () => {
        const initial_values = ValuesMap.fromString(
            '8 5 . |. . 2 |4 . . \n' +
            '7 2 . |. . . |. . 9 \n' +
            '. . 4 |. . . |. . . \n' +
            '------+------+------\n' +
            '. . . |1 . 7 |. . 2 \n' +
            '3 . 5 |. . . |9 . . \n' +
            '. 4 . |. . . |. . . \n' +
            '------+------+------\n' +
            '. . . |. 8 . |. 7 . \n' +
            '. 1 7 |. . . |. . . \n' +
            '. . . |. 3 6 |. 4 .');

        const expected_solution = ValuesMap.fromString(
            '8 5 9 |6 1 2 |4 3 7 \n' +
            '7 2 3 |8 5 4 |1 6 9 \n' +
            '1 6 4 |3 7 9 |5 2 8 \n' +
            '------+------+----- \n' +
            '9 8 6 |1 4 7 |3 5 2 \n' +
            '3 7 5 |2 6 8 |9 1 4 \n' +
            '2 4 1 |5 9 3 |7 8 6 \n' +
            '------+------+----- \n' +
            '4 3 2 |9 8 1 |6 7 5 \n' +
            '6 1 7 |4 2 5 |8 9 3 \n' +
            '5 9 8 |7 3 6 |2 4 1 ');

        const solution = SudokuSolver.solve(initial_values);
        expect(solution).not.toBe(null);
        expect(solution!.equals(expected_solution)).toBe(true);
    });
});
