import * as constants from "./constants";
import { ValuesMap } from "./values_map";

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
        this._workingValues = ValuesMap.ofAllValues();
    }
    
    private _startingValues: ValuesMap;
    private _workingValues: ValuesMap;

    public solve = () => {
        for (const square of constants.squares) {
            const startingValue = this._startingValues.get(square);
            if (startingValue.length === 1) {
                this.assignValue(square, startingValue);
            }
        }
    }

    // assign value to square, propagate changes
    private assignValue = (square: string, value: string): boolean => {
        if (value.length > 1) throw new Error('cant assign multiple values to a square');

        const other_values = this._workingValues.get(square).replace(value, '');
        for (const v of other_values) {
            const result = this.eliminateValue(square, v);
            if (!result) return false;
        }
        return true;
    }

    // eliminate possible value from square, propagate changes
    private eliminateValue = (square: string, value: string): boolean => {
        if (!this.containsValue(square, value)) return true;

        // eliminate value from this square
        this._workingValues.set(square, this._workingValues.get(square).replace(value, ''));

        // no possible values in this square, no solution
        if (this._workingValues.get(square).length === 0) return false;

        if (this._workingValues.get(square).length === 1) {
            const remaining_value = this._workingValues.get(square);
            this.removeFromPeers(square, remaining_value);
        }

        for (const unit of constants.unitsOf(square)) {
            const places_for_value = unit.filter(square => this.containsValue(square, value));

            // no place for this value, no solution
            if (places_for_value.length === 0) return false;

            if (places_for_value.length === 1) {
                // value can only be in one place, put it there (and propagate changes)
                const result = this.assignValue(places_for_value[0], value);
                if (!result) return false;
            }
        }

        return true;
    }

    private removeFromPeers = (square: string, value: string) => {
        for (const peer of constants.peersOf(square)) {
            const result = this.eliminateValue(peer, value);
            if (!result) return false;
        }
    }

    private containsValue = (square: string, value: string): boolean => {
        return this._workingValues.get(square).indexOf(value) === -1;
    }

    public valuesAt(square: string): string {
        return this._workingValues.get(square);
    }
}
