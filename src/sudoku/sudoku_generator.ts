import * as constants from './constants';
import * as random from './random';
import { ValuesMap } from "./values_map";
import { assign } from "./assign_elim";

export class SudokuGenerator {
    public generate(): ValuesMap {
        return random_puzzle();
    }
}

const random_puzzle = (N: number = 17): ValuesMap => {
    // """Make a random puzzle with N or more assignments. Restart on contradictions.
    // Note the resulting puzzle is not guaranteed to be solvable, but empirically
    // about 99.8% of them are solvable. Some have multiple solutions."""
    const values = ValuesMap.ofAllValues();

    for (const square of random.shuffle(constants.squares.slice())) {
        if (!assign(values, square, random.choice(values.get(square)))) {
            break;
        }
        
        const single_values = constants.squares
            .filter(s => values.get(s).length === 1)
            .map(s => values.get(s));
        
        const num_unique_values = new Set(single_values).size;
        
        if (single_values.length >= N && num_unique_values >= 8) {
            const puzzle_values = constants.squares
                .map(s => values.count(s) === 1 ? values.get(s) : '.');
            return ValuesMap.fromString(puzzle_values.join(''));
        }
    }

    return random_puzzle(N); // Give up and make a new puzzle
}
