import * as constants from "./constants";
import { zip } from "./utils";

const EMPTY_SQUARE: string = null;

/** Represents an unsolved/solved sudoku game,
 *  containing possible values for each square
 */
export class Puzzle {
    public static fromString = (input_string: string) => {
        const values = ValuesMap.fromString(input_string);
        return new Puzzle(values);
    }

    private constructor(values: ValuesMap) {
        this._values = values;
    }

    private _values: ValuesMap;

    /** returns a string that could be used in a game - empty squares are represented by dots */
    public toGameString = (): string => {
        const squares = this._values.all().map(v => v.length > 1 ? '.' : v);
        return this.renderGridString(squares);
    }

    /** Returns a string of the grid, with empty squares displaying the possible
     *  values they could contain
     */
    public toPossibleValuesString = (): string => {
        const max_width = Math.max(...this._values.all().map(v => v.length));
        const render_square = (v: string) => {
            const rem = max_width - v.length;
            return v + ' '.repeat(rem);
        }
        const squares = this._values.all().map(v => render_square(v));
        return this.renderGridString(squares);
    }

    private renderGridString = (rendered_squares: string[]): string => {
        const max_square_width = Math.max(...rendered_squares.map(s => s.length));
        const box_width = 3 * (max_square_width + 1);
        const line_segment = '-'.repeat(box_width);
        const line = `${line_segment}+${line_segment}+${line_segment}`;
        let output_arr = [];
        for (let i = 0; i < 81; i++) {
            const square = rendered_squares[i];
            const row = constants.rows[Math.floor(i / 9)];
            const col = constants.cols[i % 9];
            output_arr.push(square + ' ');
            if (col === '3' || col === '6') {
                output_arr.push('|');
            }
            if (col === '9') {
                output_arr.push('\n');
                if (row == 'C' || row == 'F') {
                    output_arr.push(line + '\n');
                }
            }
        }
        return output_arr.join('');
    }
}

/** Map of square coordinate to possible values */
class ValuesMap {
    private _values: Map<string, string>;

    public static ofAllValues() {
        const map = new ValuesMap();
        map._values = new Map(constants.squares.map(s => [s, constants.digits]));
        return map;
    }

    public static fromString(input: string) {
        const is_square = (c: string) => is_1to9(c) || c === '0' || c === '.';

        const input_squares = Array.from(input)
            .filter(c => is_square(c))
            .map(square => is_1to9(square) ? square : EMPTY_SQUARE);

        if (input_squares.length !== 81) {
            throw new Error(`Need 81 chars, got ${input_squares.length}`);
        }

        const map = ValuesMap.ofAllValues();

        for (const entry of zip(constants.squares, input_squares)) {
            const square = entry[0];
            const value = entry[1];
            if (value !== EMPTY_SQUARE) {
                map.set(square, value);
            }
        }

        return map;
    }

    /** get possible values at this coord */
    public get = (coord: string): string => {
        return this._values.get(coord);
    }

    /** set possible values at this coord */
    public set = (coord: string, values: string): void => {
        this._values.set(coord, values);
    }

    public all = (): string[] => {
        return constants.squares.map(s => this._values.get(s));
    }
}

function is_1to9(c: string) {
    return c >= '1' && c <= '9';
}
