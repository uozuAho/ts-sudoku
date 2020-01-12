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
}

function is_1to9(c: string) {
    return c >= '1' && c <= '9';
}
