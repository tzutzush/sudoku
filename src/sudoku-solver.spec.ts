import { describe, expect, test } from "vitest";
import {
  checkIfValid,
  findEmptyCell,
  getNumberArrayFromTiles,
  help,
  isPossible,
  solve,
} from "./sudoku-solver";
import {
  deficientNumberArray,
  numberArrayFull,
  numberArraySolved,
  tileInfoArrayFalse,
  tileInfoArrayFull,
  tileInfoArrayFullFalse,
  tileInfoArrayTrue,
} from "./sudoku-solver-grid-constants";

describe("Sudoku solver", () => {
  test("Should get number array from TileInfo array", () => {
    expect(getNumberArrayFromTiles(tileInfoArrayFalse)).toStrictEqual([[1]]);
  });

  test("Should check validity with true value", () => {
    expect(checkIfValid(tileInfoArrayTrue)).toBe(true);
  });

  test("Should check validity with false value", () => {
    expect(checkIfValid(tileInfoArrayFalse)).toBe(false);
  });

  test("Should not help if grid is not 9x9", () => {
    expect(() => help(tileInfoArrayTrue)).toThrowError();
  });

  test("Should help if grid is 9x9", () => {
    expect(help(tileInfoArrayFull)).toStrictEqual({
      numberToSet: 1,
      rowIndex: 0,
      columnIndex: 3,
    });
  });

  test("Should fail to help if there is an invalid number in the grid", () => {
    expect(() => help(tileInfoArrayFullFalse)).toThrowError();
  });

  test("Should return true if number is possible", () => {
    expect(isPossible(0, 3, 1, numberArrayFull)).toBe(true);
  });

  test("Should return false if number is impossible", () => {
    expect(isPossible(0, 3, 4, numberArrayFull)).toBe(false);
  });

  test("Should find next empty cell", () => {
    expect(findEmptyCell(numberArrayFull)).toStrictEqual([0, 3]);
  });

  test("Should return null if there is no empty cell", () => {
    expect(findEmptyCell(numberArraySolved)).toBe(null);
  });

  test("Should throw error if grid is not 9x9", () => {
    expect(() => solve(deficientNumberArray)).toThrowError();
  });

  test("Should return true if solved", () => {
    expect(solve(numberArrayFull)).toBe(true);
  });
});
