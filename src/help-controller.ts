import { signal } from "./signal";

export class HelpController {
  readonly helpSection: HTMLElement;
  readonly helpButton: HTMLElement;
  readonly newGameButton: HTMLElement;
  readonly helpEvent = signal<void>(undefined);
  readonly newGameEvent = signal<void>(undefined);
  constructor() {
    this.helpSection = document.createElement("div");
    this.helpSection.classList.add("help");
    this.helpButton = document.createElement("button");
    this.helpButton.innerHTML = "Help me! &rarr;";
    this.newGameButton = document.createElement("button");
    this.newGameButton.innerHTML = "Start new game! &rarr;";
    this.helpSection.appendChild(this.helpButton);
    this.helpSection.appendChild(this.newGameButton);

    this.helpButton.addEventListener("click", () => {
      this.helpEvent.dispatch();
    });

    this.newGameButton.addEventListener("click", () => {
      this.newGameEvent.dispatch();
    });
  }
}
