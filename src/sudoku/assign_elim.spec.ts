import { ValuesMap } from "./values_map";
import { assign, eliminate } from "./assign_elim";

describe('given all the same single value', () => {

    let all_1_values: ValuesMap;

    beforeEach(() => {
        all_1_values = ValuesMap.fromString('1'.repeat(81));
    });

    describe('assign', () => {
        it('should eliminate value in assigned square then fail', () => {
            expect(assign(all_1_values, 'A1', '2')).toBe(false);
            expect(all_1_values.get('A1')).toBe('');
        });
    });

    describe('eliminate', () => {
        it('should succeed when value to eliminate is not present', () => {
            expect(eliminate(all_1_values, 'A1', '2')).toBe(true);
            expect(all_1_values.get('A1')).toBe('1');
        });

        it('should eliminate given value then fail', () => {
            expect(eliminate(all_1_values, 'A1', '1')).toBe(false);
            expect(all_1_values.get('A1')).toBe('');
        });
    });
});

describe('given unsolvable puzzle with one square with multiple values', () => {

    let values: ValuesMap;

    beforeEach(() => {
        // A1 will start with all possible values
        values = ValuesMap.fromString('.' + '1'.repeat(80));
    });

    describe('eliminate from square with many values', () => {
        it('should not propagate when > 1 possible values and places remain', () => {
            expect(eliminate(values, 'A1', '1')).toBe(true);
            expect(values.get('A1')).toBe('23456789');
        });

        it('should propagate and succeed when 1 possible value remains', () => {
            values.set('A1', '12');
            expect(eliminate(values, 'A1', '1')).toBe(true);
            expect(values.get('A1')).toBe('2');
        });

        it('should fail when propagation removes last possible value from peers', () => {
            values.set('A1', '12');
            expect(eliminate(values, 'A1', '2')).toBe(false);
            expect(values.get('A1')).toBe('1');
        });
    });
});
