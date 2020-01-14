import * as constants from "./constants";
import { ValuesMap } from "./values_map";
import { assign } from "./assign_elim";

/** Represents an unsolved/solved sudoku game,
 *  containing possible values for each square
 */
export class Puzzle {
    public static fromString = (input_string: string) => {
        const values = ValuesMap.fromString(input_string);
        return new Puzzle(values);
    }
    
    private constructor(values: ValuesMap) {
        this._startingValues = values;
    }
    
    private _startingValues: ValuesMap;
    private _resultingValues: ValuesMap;

    public solve = () => {
        const working_values = ValuesMap.ofAllValues();

        for (const square of constants.squares) {
            const startingValue = this._startingValues.get(square);
            if (startingValue.length === 1) {
                assign(working_values, square, startingValue);
            }
        }

        this._resultingValues = working_values;
    }

    public valuesAt(square: string): string {
        return this._resultingValues.get(square);
    }

    public toString = (): string => {
        return this._resultingValues.toString();
    }
}
