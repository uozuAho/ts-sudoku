import * as constants from "./constants";

describe('constants', () => {
    it('should have 81 squares', () => {
        expect(constants.squares.length).toBe(81);
    });

    it('should have 27 units', () => {
        expect(constants.units.length).toBe(27);
    });

    describe('unit lookup', () => {
        it('should have 3 units per square', () => {
            for (const square of constants.squares) {
                expect(constants.unitsOf(square)).toHaveLength(3);
            }
        });

        it('should get units for C2', () => {
            // todo: this test is vulnerable to unit & square order changes
            expect(constants.unitsOf('C2')).toEqual([
                ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'],
                ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9'],
                ['A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2', 'I2'],
            ]);
        })
    });
});
