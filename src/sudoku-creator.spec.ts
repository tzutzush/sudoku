import { beforeEach, describe, expect, test, vi } from "vitest";
import { SudokuCreator } from "./sudoku-creator";
import { solve } from "./sudoku-solver";

let useMockedSolve = false;

vi.mock("./sudoku-solver", async (importOriginal) => {
  const mod = (await importOriginal()) as { solve: typeof solve };
  return {
    ...mod,
    solve: (grid: number[][]) => {
      if (useMockedSolve) {
        return false;
      } else {
        return mod.solve(grid);
      }
    },
  };
});

describe("Sudoku creator", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    useMockedSolve = false;
  });

  test("Should create solvable puzzle", () => {
    const puzzle = new SudokuCreator().getPuzzle();
    expect(solve(puzzle)).toBe(true);
  });

  test("May create unsolvable puzzle", () => {
    useMockedSolve = true;
    const puzzle = new SudokuCreator().getPuzzle();
    puzzle.forEach((row) => {
      row.forEach((cell) => {
        expect(cell).toEqual(0);
      });
    });
  });
});
