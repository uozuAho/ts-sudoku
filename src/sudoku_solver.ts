import * as constants from "./constants";
import { ValuesMap } from "./values_map";
import { assign } from "./assign_elim";

export class SudokuSolver {
    public static solve = (startingValues: ValuesMap): ValuesMap => {
        const values = ValuesMap.ofAllValues();

        for (const square of constants.squares) {
            const startingValue = startingValues.get(square);
            if (startingValue.length === 1) {
                assign(values, square, startingValue);
            }
        }

        return values;
    }
}
