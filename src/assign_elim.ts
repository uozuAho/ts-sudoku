import * as constants from "./constants";
import { ValuesMap } from "./values_map";

// assign value to square, propagate changes
export function assign(values: ValuesMap, square: string, value: string): boolean {
    if (value.length > 1) throw new Error('cant assign multiple values to a square');

    const other_values = values.get(square).replace(value, '');
    for (const v of other_values) {
        const result = eliminate(values, square, v);
        if (!result) return false;
    }
    return true;
}

// eliminate possible value from square, propagate changes
export function eliminate(values: ValuesMap, square: string, value: string): boolean {
    if (!values.contains(square, value)) return true;

    // eliminate value from this square
    values.set(square, values.get(square).replace(value, ''));

    // no possible values in this square, no solution
    if (values.get(square).length === 0) return false;

    if (values.get(square).length === 1) {
        const remaining_value = values.get(square);
        if (!removeFromPeers(values, square, remaining_value)) return false;
    }

    for (const unit of constants.unitsOf(square)) {
        const places_for_value = unit.filter(square => values.contains(square, value));

        // no place for this value, no solution
        if (places_for_value.length === 0) return false;

        if (places_for_value.length === 1) {
            // value can only be in one place, put it there (and propagate changes)
            const result = assign(values, places_for_value[0], value);
            if (!result) return false;
        }
    }

    return true;
}

const removeFromPeers = (values: ValuesMap, square: string, value: string) => {
    for (const peer of constants.peersOf(square)) {
        const result = eliminate(values, peer, value);
        if (!result) return false;
    }
    return true;
}
