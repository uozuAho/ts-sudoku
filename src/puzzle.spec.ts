import { Puzzle } from "./puzzle";

describe('puzzle', () => {
    // todo: maybe values map could have this behaviour
    it.skip('should format user friendly game string', () => {
        const puzzle = Puzzle.fromString(
            '003020600' +
            '900305001' +
            '001806400' +
            '008102900' +
            '700000008' +
            '006708200' +
            '002609500' +
            '800203009' +
            '005010300'
        );

        expect(puzzle.toGameString()).toEqual(
            '. . 3 |. 2 . |6 . . \n' +
            '9 . . |3 . 5 |. . 1 \n' +
            '. . 1 |8 . 6 |4 . . \n' +
            '------+------+------\n' +
            '. . 8 |1 . 2 |9 . . \n' +
            '7 . . |. . . |. . 8 \n' +
            '. . 6 |7 . 8 |2 . . \n' +
            '------+------+------\n' +
            '. . 2 |6 . 9 |5 . . \n' +
            '8 . . |2 . 3 |. . 9 \n' +
            '. . 5 |. 1 . |3 . . \n');
    });

    // todo: maybe values map could have this behaviour
    it.skip('should format user friendly "possible values" string', () => {
        const puzzle = Puzzle.fromString(
            '113121611' +
            '911315111' +
            '111816411' +
            '118112911' +
            '711111108' +  // 0 in this row should display as all 9 possible values
            '116718211' +
            '112619511' +
            '811213119' +
            '115111311'
        );

        expect(puzzle.toPossibleValuesString()).toEqual(
            '1         1         3         |1         2         1         |6         1         1         \n' +
            '9         1         1         |3         1         5         |1         1         1         \n' +
            '1         1         1         |8         1         6         |4         1         1         \n' +
            '------------------------------+------------------------------+------------------------------\n' +
            '1         1         8         |1         1         2         |9         1         1         \n' +
            '7         1         1         |1         1         1         |1         123456789 8         \n' +
            '1         1         6         |7         1         8         |2         1         1         \n' +
            '------------------------------+------------------------------+------------------------------\n' +
            '1         1         2         |6         1         9         |5         1         1         \n' +
            '8         1         1         |2         1         3         |1         1         9         \n' +
            '1         1         5         |1         1         1         |3         1         1         \n');
    });

    it('should partially solve first attempt', () => {
        const puzzle = Puzzle.fromString(
            '4.....8.5.3..........7......2.....6.....8.4......1.......6.3.7.5..2.....1.4......');

        puzzle.solve();

        console.log(puzzle.toPossibleValuesString());

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
