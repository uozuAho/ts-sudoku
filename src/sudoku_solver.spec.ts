import { SudokuSolver } from "./sudoku_solver";
import { ValuesMap } from "./values_map";

describe('SudokuSolver', () => {
    it('should solve easy puzzle', () => {
        const initial_values = ValuesMap.fromString(
            '003020600900305001001806400008102900700000008006708200002609500800203009005010300');

        const solution = SudokuSolver.solve(initial_values);

        expect(solution.toString()).toEqual(
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

        expect(solution.equals(initial_values)).toBe(true);
    });

    it('should return null for unsolvable puzzle', () => {
        const initial_values = ValuesMap.fromString('1'.repeat(81));

        expect(SudokuSolver.solve(initial_values)).toBe(null);
    });

    // todo: stack overflow here
    it('should partially solve first attempt', () => {
        const initial_values = ValuesMap.fromString(
            '4.....8.5.3..........7......2.....6.....8.4......1.......6.3.7.5..2.....1.4......');

        const solution = SudokuSolver.solve(initial_values);

        /* Just check a few values from this. cbf converting it to my format
              4      1679   12679  |  139     2369    269   |   8      1239     5    
            26789     3    1256789 | 14589   24569   245689 | 12679    1249   124679 
            2689   15689   125689 |   7     234569  245689 | 12369   12349   123469 
            ------------------------+------------------------+------------------------
            3789     2     15789  |  3459   34579    4579  | 13579     6     13789  
            3679   15679   15679  |  359      8     25679  |   4     12359   12379  
            36789     4     56789  |  359      1     25679  | 23579   23589   23789  
            ------------------------+------------------------+------------------------
            289      89     289   |   6      459      3    |  1259     7     12489  
            5      6789     3    |   2      479      1    |   69     489     4689  
            1      6789     4    |  589     579     5789  | 23569   23589   23689  */
        expect(solution.get('A1')).toBe('4');
        expect(solution.get('A2')).toBe('1679');
        expect(solution.get('F9')).toBe('23789');
    });
});
