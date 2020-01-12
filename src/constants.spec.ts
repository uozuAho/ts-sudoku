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
        });
    });

    describe('peer lookup', () => {
        it('should have 20 peers', () => {
            for (const square of constants.squares) {
                expect(constants.peersOf(square)).toHaveLength(20);
            }
        });

        it('should get peers for C2', () => {
            expect(constants.peersOf('C2').sort()).toEqual([
                'A2', 'B2', 'D2', 'E2', 'F2', 'G2', 'H2', 'I2',
                'C1', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9',
                'A1', 'A3', 'B1', 'B3'].sort());
        })
    });
});
