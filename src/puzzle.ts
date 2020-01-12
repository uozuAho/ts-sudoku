import * as constants from "./constants";

/** Represents an unsolved/solved sudoku game,
 *  containing possible values for each square
 */
export class Puzzle {
    public static fromString = (s: string) => {
        return new Puzzle();
    }

    private constructor() {
        this._values
    }

    public toString = (): string => {
        const width =  1 + Math.max(len(values[s]) for s in constants.squares)
        line = '+'.join(['-'*(width*3)]*3)
        for r in rows:
            print ''.join(values[r+c].center(width)+('|' if c in '36' else '')
                          for c in cols)
            if r in 'CF': print line
    }
}

Math.max