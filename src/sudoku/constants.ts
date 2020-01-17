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

/** returns units that the given square is in */
export const unitsOf = (square: string): string[][] => {
    const result = _unit_lookup.get(square);
    if (!result) throw new Error('dont do that');
    return result;
}

/** returns peers of the given square
 * 
 *  Squares that share the same unit are 'peers'
 */
export const peersOf = (square: string): string[] => {
    const result = _peer_lookup.get(square);
    if (!result) throw new Error('dont do that');
    return result;
}

const _unit_lookup = build_unit_lookup();

const _peer_lookup = build_peer_lookup();

function build_unit_lookup(): Map<string, string[][]> {
    const lookup = new Map<string, string[][]>();

    for (const square of squares) {
        const square_units = [];
        for (const unit of units) {
            if (unit.indexOf(square) !== -1) {
                square_units.push(unit);
            }
        }
        lookup.set(square, square_units)
    }

    return lookup;
}

function build_peer_lookup(): Map<string, string[]> {
    const lookup = new Map<string, string[]>();

    for (const square of squares) {
        const peers = new Set<string>();
        for (const unit of unitsOf(square)) {
            for (const unit_square of unit) {
                peers.add(unit_square);
            }
        }
        // peers shouldn't contain the given square
        peers.delete(square);
        lookup.set(square, Array.from(peers))
    }

    return lookup;
}

function col_units() {
    return Array.from(cols).map(c => cross(rows, c));
}

function row_units() {
    return Array.from(rows).map(r => cross(r, cols));
}

// todo: generator
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
