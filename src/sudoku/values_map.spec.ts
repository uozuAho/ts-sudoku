import { ValuesMap } from "./values_map";

describe('ValuesMap', () => {
    describe('contains', () => {
        it('return true if square contains value', () => {
            ValuesMap.ofAllValues().contains('A1', '1');
        });
    });

    describe('copy', () => {
        it('should not be the original object', () => {
            const original = ValuesMap.ofAllValues();
            expect(original.copy()).not.toBe(original);
        });

        it('should equal the original values', () => {
            const original = ValuesMap.ofAllValues();
            expect(original.copy().equals(original)).toBe(true);
        });
    });

    it('should format user friendly "possible values" string', () => {
        const valuesMap = ValuesMap.fromString(
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

        expect(valuesMap.toString()).toEqual(
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
});
