import { beforeEach, describe, expect, test } from "vitest";
import { TileController } from "./tile-controller";

const BOTTOM_BORDER = "tile-bottom-border";
const SIDE_BORDER = "tile-side-border";

describe("Tile controller", () => {
  let tileController: TileController;

  beforeEach(() => {
    tileController = new TileController(0, 0);
  });

  test("Should exist after creation", () => {
    expect(tileController).toBeDefined();
  });

  test("Should create tile with right borders", () => {
    for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
      for (let columnIndex = 0; columnIndex < 8; columnIndex++) {
        const tileController = new TileController(rowIndex, columnIndex);
        if (rowIndex === 2 || rowIndex === 5) {
          expect(tileController.tile.classList.contains(BOTTOM_BORDER)).toBe(
            true
          );
        } else if (columnIndex === 2 || columnIndex === 5) {
          expect(tileController.tile.classList.contains(SIDE_BORDER)).toBe(
            true
          );
        } else {
          expect(tileController.tile.classList.contains(SIDE_BORDER)).toBe(
            false
          );
          expect(tileController.tile.classList.contains(BOTTOM_BORDER)).toBe(
            false
          );
        }
      }
    }
  });

  test("Should update state with normal mode", () => {
    tileController.updateState({ value: 1, mode: "normal" });
    expect(tileController.tile.classList.contains("wrong")).toBe(false);
    expect(tileController.tile.classList.contains("immutable")).toBe(false);
  });

  test("Should update state with normal mode", () => {
    tileController.updateState({ value: 2, mode: "wrong" });
    expect(tileController.tile.classList.contains("wrong")).toBe(true);
    expect(tileController.tile.classList.contains("immutable")).toBe(false);
  });

  test("Should update state with normal mode", () => {
    tileController.updateState({ value: 3, mode: "immutable" });
    expect(tileController.tile.classList.contains("wrong")).toBe(false);
    expect(tileController.tile.classList.contains("immutable")).toBe(true);
  });
});
