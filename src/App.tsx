import React from 'react';
import './App.css';
import { ValuesMap } from './sudoku/values_map';
import { SudokuSolver } from './sudoku/sudoku_solver';

const App: React.FC = () => {
  const puzzle = ValuesMap.fromString(
    '003020600900305001001806400008102900700000008006708200002609500800203009005010300');
  const solution = SudokuSolver.solve(puzzle);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sudoku</h1>
        <div>
          <h2>Puzzle</h2>
          <pre>{puzzle.toString()}</pre>
        </div>
        <div>
          <h2>Solution</h2>
          <pre>{solution?.toString()}</pre>
        </div>
      </header>
    </div>
  );
}

export default App;
