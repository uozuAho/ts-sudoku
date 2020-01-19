import * as constants from "./constants";
import { ValuesMap } from "./values_map";

/** Assign value to square and propagate.
 *  Returns false if a contradiction is found, else true;
 */
export function assign(values: ValuesMap, square: string, value: string): boolean {
    if (value.length > 1) throw new Error('cant assign multiple values to a square');

    if (!eliminate_values_other_than(values, square, value)) return false;

    return true;
}

function eliminate_values_other_than(
    values: ValuesMap, square: string, value: string): boolean
{
    const other_values = values.get(square).replace(value, '');

    for (const v of other_values) {
        const result = eliminate(values, square, v);
        if (!result) return false;
    }

    return true;
}

/** Eliminate possible value from square and propagate.
 *  Returns false if a contradiction is found, else true.
 */
export function eliminate(values: ValuesMap, square: string, value: string): boolean {
    if (value.length > 1) throw new Error('cant eliminate multiple values from a square');

    const square_initial_values = values.get(square);

    if (square_initial_values.indexOf(value) === -1) return true;

    const square_updated_values = square_initial_values.replace(value, '');

    values.set(square, square_updated_values);

    if (square_updated_values.length === 0) return false;

    if (square_updated_values.length === 1) {
        // this square can only contain this value, so remove from peers
        const remaining_value = square_updated_values;
        if (!removeFromPeers(values, square, remaining_value)) return false;
    }

    for (const unit of constants.unitsOf(square)) {
        const places_for_value = unit.filter(square => values.contains(square, value));

        // no place for this value, no solution
        if (places_for_value.length === 0) return false;

        if (places_for_value.length === 1) {
            // value can only be in one place, put it there (and propagate changes)
            if (!assign(values, places_for_value[0], value)) return false;
        }
    }

    return true;
}

const removeFromPeers = (values: ValuesMap, square: string, value: string) => {
    for (const peer of constants.peersOf(square)) {
        if (!eliminate(values, peer, value)) return false;
    }
    return true;
}
