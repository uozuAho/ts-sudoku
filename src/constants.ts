export const digits  = '123456789';
export const rows    = 'ABCDEFGHI';
export const cols    = digits;
export const squares = cross(rows, cols);

// cross product of elements in a and b
// todo: use generator
function cross(A: string, B: string): string[] {
    const results = [];
    for (const a of A) {
        for (const b of B) {
            results.push(a + b);
        }
    }
    return results;
}
