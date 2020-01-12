import * as constants from "./constants";

describe('constants', () => {
    it('should have 81 squares', () => {
        expect(constants.squares.length).toBe(81);
    });

    it('should have 27 units', () => {
        expect(constants.units.length).toBe(27);
    });
});
