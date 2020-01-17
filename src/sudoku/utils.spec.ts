import { zip } from "./utils";

describe('utils', () => {
    describe('zip', () => {
        it('should return empty array when both empty', () => {
            const result = Array.from(zip([], []));
            expect(result).toStrictEqual([]);
        });

        it('should return empty when either input is empty', () => {
            expect(Array.from(zip([], ['a']))).toStrictEqual([]);
            expect(Array.from(zip(['a'], []))).toStrictEqual([]);
        })

        it('should return with length of shorter input', () => {
            const result = Array.from(zip([1, 2, 3], ['a', 'b']));

            expect(result).toStrictEqual([[1, 'a'], [2, 'b']]);
        })
    });
});
