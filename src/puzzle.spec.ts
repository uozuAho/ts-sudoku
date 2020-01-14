import { Puzzle } from "./puzzle";

describe('puzzle', () => {
    // FAILING: unskip when assign/elim tests are working
    it.skip('should partially solve first attempt', () => {
        const puzzle = Puzzle.fromString(
            '4.....8.5.3..........7......2.....6.....8.4......1.......6.3.7.5..2.....1.4......');

        puzzle.solve();

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
        expect(puzzle.valuesAt('A1')).toBe('4');
        expect(puzzle.valuesAt('A2')).toBe('1679');
        expect(puzzle.valuesAt('F9')).toBe('23789');
    });
});
