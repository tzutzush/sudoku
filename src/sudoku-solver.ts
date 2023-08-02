import { EMPTY } from "./sudoku-constants";

export type TileInfo = { value: number; possible: boolean };

export function solve(grid: number[][]): boolean {
  if (grid.length != 9 && grid[0].length != 9) {
    throw new Error("Nah, it's not a 9x9 grid.");
  }
  return solveInternal(grid);
}

export function solveInternal(grid: number[][]): boolean {
  //Find empty cell with helper function, if there is none, return true.
  const emptyCell = findEmptyCell(grid);

  if (!emptyCell) {
    return true;
  }

  const [rowIndex, columnIndex] = emptyCell;

  //Try possible numbers (1-9) for the empty cell
  for (let possibleNumber = 1; possibleNumber <= 9; possibleNumber++) {
    //Check if the number is valid in the empty cell, if so set it.
    if (isPossible(rowIndex, columnIndex, possibleNumber, grid)) {
      grid[rowIndex][columnIndex] = possibleNumber;

      //Call the function again to check the next empty cell
      if (solveInternal(grid)) {
        return true;
      }

      //If none of the numbers (1-9) was valid, set the cell back to empty (note that technically
      //we are still in the previous cell => cell, where we are currently => [x][-] <= cell what we are checking recursively).
      grid[rowIndex][columnIndex] = EMPTY;
    }
  }
  //If the for loop fails, the recursive function call will return false,
  //therefore triggering the line 'grid[rowIndex][columnIndex] = EMPTY;'.
  return false;
}

export function findEmptyCell(grid: number[][]) {
  for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
    for (let columnIndex = 0; columnIndex < 9; columnIndex++) {
      if (grid[rowIndex][columnIndex] === EMPTY) {
        return [rowIndex, columnIndex];
      }
    }
  }
  return null;
}

export function isPossible(
  row: number,
  column: number,
  givenNumber: number,
  grid: number[][]
): boolean {
  for (let i = 0; i < 9; i++) {
    if (+grid[row][i] === givenNumber) return false;
    if (+grid[i][column] === givenNumber) return false;
  }

  const checkedRows: number = Math.floor(row / 3) * 3;
  const checkedColumns: number = Math.floor(column / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (+grid[checkedRows + i][checkedColumns + j] === givenNumber) {
        return false;
      }
    }
  }
  return true;
}

export function help(tileArray: TileInfo[][]) {
  if (tileArray.length != 9 && tileArray[0].length != 9) {
    throw new Error("Nah, it's not a 9x9 grid.");
  }

  if (!checkIfValid(tileArray)) throw new Error();
  const puzzleArray = getNumberArrayFromTiles(tileArray);
  const emptyCell = findEmptyCell(puzzleArray);

  if (!emptyCell) return;

  const [rowIndex, columnIndex] = emptyCell;

  solve(puzzleArray);
  const numberToSet = puzzleArray[rowIndex][columnIndex];
  return { numberToSet, rowIndex, columnIndex };
}

export function checkIfValid(tileArray: TileInfo[][]): boolean {
  return tileArray.every((row: TileInfo[]) => {
    return row.every((cell: TileInfo) => cell.possible);
  });
}

export function getNumberArrayFromTiles(tileArray: TileInfo[][]) {
  return tileArray.map((row) => {
    return row.map((tile: TileInfo) => {
      return tile.value;
    });
  });
}
