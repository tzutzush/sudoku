import { MEDIUM, EMPTY, possibleNumbers } from "./sudoku-constants";
import { solve } from "./sudoku-solver";

export class SudokuCreator {
  private puzzle;
  private emptyGrid: number[][] = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  constructor() {
    this.puzzle = this.createPuzzle();
  }

  getPuzzle() {
    return this.puzzle;
  }

  private createPuzzle(): number[][] {
    const grid: number[][] = JSON.parse(JSON.stringify(this.emptyGrid));
    //fill in top left 3x3
    let indexTL = 0;
    const numbersTL = this.randomNumberArray();
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
      for (let columnIndex = 0; columnIndex < 3; columnIndex++) {
        grid[rowIndex][columnIndex] = numbersTL[indexTL];
        indexTL++;
      }
    }

    //fill middle 3x3
    let indexM = 0;
    const numbersM = this.randomNumberArray();
    for (let rowIndex = 3; rowIndex < 6; rowIndex++) {
      for (let columnIndex = 3; columnIndex < 6; columnIndex++) {
        grid[rowIndex][columnIndex] = numbersM[indexM];
        indexM++;
      }
    }

    //fill bottom right 3x3
    let indexBR = 0;
    const numbersBR = this.randomNumberArray();
    for (let rowIndex = 6; rowIndex < 9; rowIndex++) {
      for (let columnIndex = 6; columnIndex < 9; columnIndex++) {
        grid[rowIndex][columnIndex] = numbersBR[indexBR];
        indexBR++;
      }
    }

    if (solve(grid)) {
      return this.takeOutNumbers(grid, MEDIUM);
    }

    return this.emptyGrid;
  }

  private takeOutNumbers(grid: number[][], difficulty: number): number[][] {
    const puzzle: number[][] = grid;
    let removedCells = 0;

    while (removedCells < difficulty) {
      const rowIndex = Math.floor(Math.random() * 9);
      const columnIndex = Math.floor(Math.random() * 9);

      if (puzzle[rowIndex][columnIndex] === EMPTY) continue;

      puzzle[rowIndex][columnIndex] = EMPTY;

      removedCells++;
    }

    return puzzle;
  }

  private randomNumberArray(): number[] {
    return possibleNumbers.sort(() => 0.5 - Math.random());
  }
}
