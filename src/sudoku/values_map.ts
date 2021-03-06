import * as constants from "./constants";
import { zip } from "./utils";

const EMPTY_SQUARE: string = 'EMPTY';

/** Map of square coordinate to possible values */
export class ValuesMap {
    private _values: Map<string, string>;

    public static ofAllValues() {
        return new ValuesMap(new Map(constants.squares.map(s => [s, constants.digits])));
    }

    private constructor(values: Map<string, string>) {
        this._values = values;
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

    public contains = (coord: string, value: string): boolean => {
        return this.get(coord).indexOf(value) !== -1;
    }

    public get = (coord: string): string => {
        if (!this._values.has(coord)) throw new Error('dont do that');
        return this._values.get(coord)!;
    };

    public any(square: string) {
        return this.get(square).length > 0;
    }

    public count(square: string): number {
        return this.get(square).length;
    }

    public all = (): string[] => {
        return constants.squares.map(s => this.get(s));
    };

    public copy = (): ValuesMap => {
        return new ValuesMap(new Map(constants.squares.map(s => [s, this.get(s)])));
    }

    public equals(other: ValuesMap): boolean {
        for (const square of constants.squares) {
            if (this.get(square) !== other.get(square)) return false;
        }
        return true;
    }

    public set = (coord: string, values: string): void => {
        this._values.set(coord, values);
    };

    public remove(coord: string, value: string) {
        if (value.length > 1) throw new Error("can only remove 1 value");
        this.set(coord, this.get(coord).replace(value, ''));
    }

    /** Returns a string of the grid, with empty squares displaying the possible
     *  values they could contain
     */
    public toString = (): string => {
        const max_width = Math.max(...this.all().map(v => v.length));
        const render_square = (v: string) => {
            const rem = max_width - v.length;
            return v + ' '.repeat(rem);
        }
        const squares = this.all().map(v => render_square(v));
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
                if (row === 'C' || row === 'F') {
                    output_arr.push(line + '\n');
                }
            }
        }
        return output_arr.join('');
    }
}

function is_1to9(c: string) {
    return c >= '1' && c <= '9';
}
