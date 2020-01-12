import { zip } from "./utils";

describe('utils', () => {
    describe('zip', () => {
        it('should return empty array when both empty', () => {
            expect(zip([], [])).toStrictEqual([]);
        });

        it('should return empty when either input is empty', () => {
            expect(zip([], ['a'])).toStrictEqual([]);
            expect(zip(['a'], [])).toStrictEqual([]);
        })

        it('should return with lengh of shorter input', () => {
            expect(zip([1, 2, 3], ['a', 'b'])).toStrictEqual([[1, 'a'], [2, 'b']]);
        })
    });
});
