import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { BoardController } from "./board-controller";
import { TileData } from "./tile-controller";

describe("Board controller", () => {
  let boardController: BoardController;

  beforeEach(() => {
    boardController = new BoardController();
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  test("Should exist after creation", () => {
    expect(boardController).toBeDefined();
  });

  test("Board should have right class", () => {
    expect(boardController.board.classList.contains("board")).toBe(true);
  });

  test("Should initialize the board with 9x9 tiles", () => {
    expect(boardController.tiles.length).toBe(9);
    expect(boardController.tiles[0].length).toBe(9);
  });

  test("Should update state", () => {
    const allTiles = boardController.tiles;

    const allSpies = allTiles
      .map((row, rowIndex) => {
        return row.map((cell, columnIndex) => {
          return {
            rowIndex,
            columnIndex,
            updateStateSpy: vi.spyOn(cell, "updateState"),
          };
        });
      })
      .flat();

    boardController.updateState(tileDataArray);

    allSpies.forEach((spy) => {
      expect(spy.updateStateSpy).toHaveBeenCalledWith(
        tileDataArray[spy.rowIndex][spy.columnIndex]
      );
    });
  });

  test("Should dispatch signal", async () =>
    new Promise<void>((done) => {
      boardController.newNumberPosition.addListener(
        ([rowIndex, columnIndex]) => {
          expect(rowIndex).toStrictEqual(0);
          expect(columnIndex).toStrictEqual(0);
          done();
        }
      );

      const firstTile = boardController.tiles[0][0];
      firstTile.tile.click();
    }));
});

const tileDataArray: TileData[][] = [
  [
    {
      value: 5,
      mode: "immutable",
    },
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 4,
      mode: "immutable",
    },
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 8,
      mode: "immutable",
    },
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 7,
      mode: "immutable",
    },
  ],
  [
    {
      value: 1,
      mode: "immutable",
    },
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 9,
      mode: "immutable",
    },
    {
      value: 3,
      mode: "immutable",
    },
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 0,
      mode: "normal",
    },
  ],
  [
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 3,
      mode: "immutable",
    },
    {
      value: 7,
      mode: "immutable",
    },
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 0,
      mode: "normal",
    },
  ],
  [
    {
      value: 3,
      mode: "immutable",
    },
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 5,
      mode: "immutable",
    },
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 4,
      mode: "immutable",
    },
  ],
  [
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 5,
      mode: "immutable",
    },
    {
      value: 3,
      mode: "immutable",
    },
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 6,
      mode: "immutable",
    },
    {
      value: 0,
      mode: "normal",
    },
  ],
  [
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 4,
      mode: "immutable",
    },
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 7,
      mode: "immutable",
    },
    {
      value: 9,
      mode: "immutable",
    },
    {
      value: 8,
      mode: "immutable",
    },
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 3,
      mode: "immutable",
    },
  ],
  [
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 6,
      mode: "immutable",
    },
  ],
  [
    {
      value: 8,
      mode: "immutable",
    },
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 3,
      mode: "immutable",
    },
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 2,
      mode: "immutable",
    },
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 5,
      mode: "immutable",
    },
    {
      value: 0,
      mode: "normal",
    },
  ],
  [
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 0,
      mode: "normal",
    },
    {
      value: 0,
      mode: "normal",
    },
  ],
];
