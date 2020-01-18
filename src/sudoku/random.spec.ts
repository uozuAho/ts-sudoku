import * as random from './random';

describe('random', () => {
    describe('shuffle', () => {
        it('should be unlikely to return items in same order', () => {
            const input = [1,2,3,4,5,6,7,8,9,0];
            const copy = input.slice();

            random.shuffle(copy);

            expect(copy.length).toBe(input.length);
            expect(copy).not.toEqual(input);
        });
    });

    describe('choice', () => {
        it('should choose a random element', () => {
            const items = [1,2,3,4,5,6];

            expect(items).toContain(random.choice(items));
        });
    });
});
