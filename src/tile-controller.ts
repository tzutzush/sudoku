import { signal } from "./signal";

export type TileData = {
  value: number;
  mode: "normal" | "immutable" | "wrong";
};

export class TileController {
  private state: TileData = { value: 0, mode: "normal" };
  public tile: HTMLElement;
  public clickSignal = signal<void>(undefined);
  constructor(rowIndex: number, columnIndex: number) {
    this.tile = document.createElement("div");
    if (rowIndex === 2 || rowIndex === 5) {
      this.tile.classList.add("tile-bottom-border");
    }
    if (columnIndex === 2 || columnIndex === 5) {
      this.tile.classList.add("tile-side-border");
    }
    this.tile.classList.add("tile");
    this.tile.addEventListener("click", () => {
      if (this.state.mode === "immutable") return;
      this.clickSignal.dispatch();
    });
  }

  updateState(newState: TileData) {
    this.state = newState;
    this.tile.innerText = !this.state.value ? "" : this.state.value.toString();
    this.tile.classList.toggle("wrong", this.state.mode === "wrong");

    this.tile.classList.toggle("immutable", this.state.mode === "immutable");
  }
}
