import { LocalStorageService } from "./local-storage-service";
import { version } from "./sudoku-constants";
import { formatTime } from "./timer-controller";

window.addEventListener("load", () => {
  const root = document.querySelector(".leader-board") as HTMLElement;
  new LeaderBoardController(root);
});

export type LeaderBoardState = {
  scores: number[];
  version: string;
};

export class LeaderBoardController {
  private state: LeaderBoardState;
  private storageService: LocalStorageService;

  constructor(public root: HTMLElement) {
    this.storageService = new LocalStorageService();
    this.state = this.storageService.getStateFromLocalStorage(
      "leaderBoardState",
      version,
      () => {
        return {
          scores: [],
          version,
        };
      }
    );
    this.updateState(this.state);
  }

  private renderScores(scores: number[]) {
    if (!this.root) return;
    const currentScore = scores[scores.length - 1];
    scores
      .sort(function (a, b) {
        return a - b;
      })
      .forEach((score) => {
        const listItem = document.createElement("div");
        if (currentScore === score) {
          listItem.classList.add("current-time");
        }
        listItem.innerText = formatTime(score);
        this.root?.appendChild(listItem);
      });
  }

  updateState(newState: LeaderBoardState) {
    this.state = newState;
    this.renderScores(newState.scores);
  }
}
