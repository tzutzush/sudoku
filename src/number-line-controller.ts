import { signal } from "./signal";

export class NumberLineController {
  public numberLine: HTMLElement;
  public selectedNumber = signal<number>(-1).distinct();
  public selectedNumberKey!: HTMLElement;
  constructor() {
    this.numberLine = this.createNumberLine();
  }

  createNumberLine() {
    const numberLine = document.createElement("div");
    numberLine.classList.add("number-keys");
    for (let index = 1; index <= 9; index++) {
      const numberKey = document.createElement("div");
      numberKey.id = index.toString();
      numberKey.innerText = index.toString();
      numberKey.classList.add("number-key");
      numberKey.addEventListener("click", () => {
        this.selectedNumber.dispatch(index);
        this.selectNumberKey(numberKey);
      });
      numberLine.appendChild(numberKey);
    }
    return numberLine;
  }

  selectNumberKey(newSelectedNumberKey: HTMLElement) {
    if (this.selectedNumberKey != null) {
      this.selectedNumberKey.classList.remove("selected");
    }

    this.selectedNumberKey = newSelectedNumberKey;
    this.selectedNumberKey.classList.add("selected");
  }
}
