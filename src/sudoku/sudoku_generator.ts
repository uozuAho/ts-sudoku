import { ValuesMap } from "./values_map";

export class SudokuGenerator {
    public generate(): ValuesMap {
        return ValuesMap.fromString('1'.repeat(81));
    }
}
