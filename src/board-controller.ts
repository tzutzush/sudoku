import { signal } from "./signal";
import { TileController, TileData } from "./tile-controller";

export class BoardController {
  public board: HTMLElement;
  public tiles: TileController[][];
  public newNumberPosition = signal<[number, number]>([-1, -1]);

  constructor() {
    this.board = document.createElement("div");
    this.board.classList.add("board");
    this.tiles = [];
    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
      const row = [];
      for (let columnIndex = 0; columnIndex < 9; columnIndex++) {
        const tile = new TileController(rowIndex, columnIndex);
        tile.clickSignal.addListener(() => {
          this.newNumberPosition.dispatch([rowIndex, columnIndex]);
        });
        row.push(tile);
        this.board.appendChild(tile.tile);
      }
      this.tiles.push(row);
    }
  }

  updateState(newState: ReadonlyArray<ReadonlyArray<TileData>>) {
    this.tiles.forEach((row, rowIndex) =>
      row.forEach((tile, columnIndex) => {
        tile.updateState(newState[rowIndex][columnIndex]);
      })
    );
  }
}
