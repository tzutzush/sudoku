import { SudokuCreator } from "./sudoku-creator";
import { TileInfo, isPossible } from "./sudoku-solver";
import { TileData } from "./tile-controller";

export function getTileDataForUpdate(
  rowIndex: number,
  columnIndex: number,
  numberToSet: number,
  grid: ReadonlyArray<ReadonlyArray<TileData>>
): TileData {
  if (!numberToSet) throw new Error();
  const possible = isPossible(
    rowIndex,
    columnIndex,
    numberToSet,
    getBoardStateAsNumberArray(grid)
  );
  return { value: numberToSet, mode: possible ? "normal" : "wrong" };
}

export function getTileInfoFromBoardState(
  boardState: ReadonlyArray<ReadonlyArray<TileData>>
) {
  return boardState.map((row) => {
    return row.map((tile: TileData) => {
      const tileInfo: TileInfo = {
        value: tile.value,
        possible: tile.mode != "wrong",
      };
      return tileInfo;
    });
  });
}

export function getBoardStateAsNumberArray(
  grid: ReadonlyArray<ReadonlyArray<TileData>>
) {
  return grid.map((row) => {
    return row.map((tile: TileData) => {
      return tile.value;
    });
  });
}

export function createBoardState() {
  const puzzle = new SudokuCreator().getPuzzle();
  return puzzle.map((row) => {
    return row.map((number) => {
      const tileData: TileData = {
        value: number,
        mode: number ? "immutable" : "normal",
      };
      return tileData;
    });
  });
}

export function checkForEnd(currentState: TileInfo[][]) {
  return currentState.every((row) => {
    return row.every(
      (tileInfo) => tileInfo.value != 0 && tileInfo.possible === true
    );
  });
}
