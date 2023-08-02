import { BoardController } from "./board-controller";
import {
  checkForEnd,
  createBoardState,
  getTileDataForUpdate,
  getTileInfoFromBoardState,
} from "./game-controller-utils";
import { HelpController } from "./help-controller";
import { LeaderBoardState } from "./leaderboard-controller";
import { LocalStorageService } from "./local-storage-service";
import { NumberLineController } from "./number-line-controller";
import { Signal, signal } from "./signal";
import { gameURL, leaderBoardURL, version } from "./sudoku-constants";
import { help } from "./sudoku-solver";
import { TileData } from "./tile-controller";
import { TimerController } from "./timer-controller";

export type GlobalState = Readonly<{
  boardState: ReadonlyArray<ReadonlyArray<TileData>>;
  selectedNumber: number;
  startTime: number;
  version: string;
}>;

export class GameController {
  public globalStateSignal: Signal<GlobalState>;
  private board: BoardController;
  private numberLine: NumberLineController;
  private helpSection: HelpController;
  private timerSection: TimerController;
  private leaderBoardState: LeaderBoardState;
  private storageService: LocalStorageService;

  constructor() {
    //STORAGE SERVICE
    this.storageService = new LocalStorageService();

    //LEADER BOARD
    this.leaderBoardState = this.storageService.getStateFromLocalStorage(
      "leaderBoardState",
      version,
      () => {
        return {
          scores: [],
          version,
        };
      }
    );

    //STATE
    const globalState = this.storageService.getStateFromLocalStorage(
      "globalState",
      version,
      () => {
        return {
          boardState: createBoardState(),
          selectedNumber: 0,
          startTime: Date.now(),
          version,
        };
      }
    );

    this.globalStateSignal = signal<GlobalState>(globalState);
    this.onGlobalStateChange(globalState);
    this.globalStateSignal.addListener((newState) =>
      this.onGlobalStateChange(newState)
    );

    //TIMER
    this.timerSection = new TimerController();
    this.timerSection.updateState(globalState.startTime);
    document.body.appendChild(this.timerSection.timerSection);

    //BOARD
    this.board = new BoardController();
    const boardSignal = this.globalStateSignal
      .select((p) => p.boardState)
      .distinct();
    boardSignal.addListener((boardState) => {
      this.board.updateState(boardState);
      if (
        checkForEnd(
          getTileInfoFromBoardState(this.globalStateSignal.current.boardState)
        )
      ) {
        this.endGame();
      }
    });
    this.board.updateState(globalState.boardState);
    document.body.appendChild(this.board.board);

    this.board.newNumberPosition.addListener(([rowIndex, columnIndex]) => {
      const tileData: TileData = getTileDataForUpdate(
        rowIndex,
        columnIndex,
        this.globalStateSignal.current.selectedNumber,
        this.globalStateSignal.current.boardState
      );
      const boardState = JSON.parse(
        JSON.stringify(this.globalStateSignal.current.boardState)
      );
      boardState[rowIndex][columnIndex] = tileData;

      this.globalStateSignal.dispatch({
        ...this.globalStateSignal.current,
        boardState: boardState,
      });
    });

    // NUMBER LINE
    this.numberLine = new NumberLineController();
    document.body.appendChild(this.numberLine.numberLine);
    this.numberLine.selectedNumber.addListener((selectedNumber) => {
      this.globalStateSignal.dispatch({
        ...this.globalStateSignal.current,
        selectedNumber,
      });
    });

    // HELP SECTION
    this.helpSection = new HelpController();
    document.body.appendChild(this.helpSection.helpSection);
    this.helpSection.helpEvent.addListener(() => {
      const info = help(
        getTileInfoFromBoardState(this.globalStateSignal.current.boardState)
      );

      if (!info) return;
      const tileData: TileData = getTileDataForUpdate(
        info.rowIndex,
        info.columnIndex,
        info.numberToSet,
        this.globalStateSignal.current.boardState
      );

      const boardState = JSON.parse(
        JSON.stringify(this.globalStateSignal.current.boardState)
      );
      boardState[info.rowIndex][info.columnIndex] = tileData;

      this.globalStateSignal.dispatch({
        ...this.globalStateSignal.current,
        boardState: boardState,
      });
    });
    this.helpSection.newGameEvent.addListener(() => {
      if (!confirm("Are you sure? Your current progress will be lost.")) return;
      localStorage.removeItem("globalState");
      window.location.assign(gameURL);
    });
  }

  private onGlobalStateChange(globalState: GlobalState) {
    this.storageService.setStateToLocalStorage("globalState", globalState);
  }

  private endGame() {
    this.timerSection.clearTimer();
    this.leaderBoardState.scores.push(
      Date.now() - this.globalStateSignal.current.startTime
    );
    this.storageService.setStateToLocalStorage(
      "leaderBoardState",
      this.leaderBoardState
    );
    this.storageService.setStateToLocalStorage("globalState", null);
    window.location.assign(leaderBoardURL);
  }
}
