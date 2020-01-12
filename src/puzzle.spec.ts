import { Puzzle } from "./puzzle";

describe('puzzle', () => {
    it('should initialise from string', () => {
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
});
