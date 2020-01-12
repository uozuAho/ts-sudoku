import * as constants from "./constants";

/** Represents an unsolved/solved sudoku game,
 *  containing possible values for each square
 */
export class Puzzle {
    public static fromString = (input_string: string) => {
        const is_square = (c: string) => is_digit(c) || c === '0' || c === '.';
        const input_values = Array.from(input_string).filter(c => is_square(c));
        if (input_values.length !== 81) {
            throw new Error(`Need 81 chars, got ${input_values.length}`);
        }

        const puzzle = new Puzzle();
        const input_map = new Map(zip(constants.squares, input_values));
        for (const square of constants.squares) {

        }
        return puzzle;
    }

    /** map of {square: possible values} */
    private _values: Map<string, string>;

    private constructor() {
        this._values = new Map(constants.squares.map(s => [s, constants.digits]));
    }

    /** returns a string that could be used in a game - empty squares are represented by dots */
    public toGameString = (): string => {
        const line = '------+------+------'
        let output_arr = [];
        for (const row of constants.rows) {
            for (const col of constants.cols) {
                const values = this._values.get(row + col);
                const square_display = values.length === 1 ? values[0] + ' ' : '. ';
                output_arr.push(square_display);
                if (col === '3' || col === '6') {
                    output_arr.push('|');
                }
                if (col === '9') {
                    output_arr.push('\n');
                }
            }
            if (row == 'C' || row == 'F') {
                output_arr.push(line + '\n');
            }
        }
        return output_arr.join('');
    }

    /** Returns a string of the grid, with empty squares displaying the possible
     *  values they could contain
     */
    public toPossibleValuesString = (): string => {
        const max_num_values = Math.max(...constants.squares.map(s => this._values.get(s).length));
        const values_width =  1 + max_num_values;
        const line_segment = '-'.repeat(values_width * 3);
        const line = `${line_segment}+${line_segment}+${line_segment}`;
        let output_arr = [];
        for (const row of constants.rows) {
            for (const col of constants.cols) {
                output_arr.push(this._values.get(row + col))
                if (col == '3' || col == '6') {
                    output_arr.push('|');
                }
                if (row == 'C' || row == 'F') {
                    output_arr.push('\n');
                }
            }
        }
        return output_arr.join('');
    }
}

function is_digit(c: string) {
    return c >= '0' && c <= '9';
}

function zip(a: Array<any>, b: Array<any>): Array<any> {
    return a.map((x, i) => [x, b[i]]);
}
