import * as constants from "./constants";
import { ValuesMap } from "./values_map";
import { assign } from "./assign_elim";

export class SudokuSolver {
    public static solve = (startingValues: ValuesMap): ValuesMap | null => {
        const values = ValuesMap.ofAllValues();

        for (const square of constants.squares) {
            const startingValue = startingValues.get(square);
            if (startingValue.length === 1) {
                if (!assign(values, square, startingValue)) {
                    return null;
                }
            }
        }

        return search(values);
    }
}

/** search possible solutions, returning values if there is one, else null */
const search = (values: ValuesMap): ValuesMap | null => {
    if (values === null) return null;

    if (values.all().every(v => v.length === 1)) {
        return values;
    }

    let min_square = square_with_fewest_digits(values);

    for (const digit of values.get(min_square)) {
        const new_values = values.copy();
        // assign an arbitrary choice of digit to this square
        if (!assign(new_values, min_square, digit)) return null;

        // continue the search
        const result = search(new_values);
        if (result !== null) {
            return result;
        }
    }

    return null;
}

const square_with_fewest_digits = (values: ValuesMap): string => {
    let min_digits = 9;
    let min_square = 'A1';
    for (const square of constants.squares) {
        const num_digits = values.get(square).length;
        // fewest... but greater than 1
        if (num_digits > 1 && num_digits < min_digits) {
            min_digits = num_digits;
            min_square = square;
        }
    }
    return min_square;
}
