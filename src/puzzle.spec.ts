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
            '9 . . |3 . 5 |. . 1 \n');
    });
});
