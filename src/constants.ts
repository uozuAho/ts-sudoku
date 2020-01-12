export const digits  = '123456789';
export const rows    = 'ABCDEFGHI';
export const cols    = digits;
/** a 'square' is a single cell of the sudoku grid */
export const squares = cross(rows, cols);
/** a 'unit' is a collection of 9 squares - a column, row, or box */
export const units =
    box_units()
        .concat(row_units())
        .concat(col_units());

function build_unit_lookup() {
    
}

function col_units() {
    return Array.from(cols).map(c => cross(c, rows));
}

function row_units() {
    return Array.from(rows).map(r => cross(r, cols));
}

function box_units() {
    const boxes = [];
    for (const rs of ['ABC', 'DEF', 'GHI']) {
        for (const cs of ['123', '456', '789']) {
            boxes.push(cross(rs, cs))
        }
    }
    return boxes;
}

// cross product of characters in a and b
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
