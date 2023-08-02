import { beforeEach, describe, expect, test } from "vitest";
import { LeaderBoardController } from "./leaderboard-controller";

describe("Leaderboard controller", () => {
  let leaderboardController: LeaderBoardController;
  beforeEach(() => {
    const root = document.createElement("div");
    root.classList.add("leader-board");
    leaderboardController = new LeaderBoardController(root);
  });

  test("Should exist after creation", () => {
    expect(leaderboardController).toBeDefined();
  });

  test("Should display scores", () => {
    leaderboardController.updateState({
      scores: [665600, 5600, 125600],
      version: "0.0.1",
    });
    expect(leaderboardController.root.children.length).toStrictEqual(3);
  });

  test("Should display lowest time as first score", () => {
    leaderboardController.updateState({
      scores: [665600, 5600, 125600],
      version: "0.0.1",
    });
    expect(leaderboardController.root.children[0].innerHTML).toStrictEqual(
      "00:05"
    );
  });

  test("Should display longest time as last score", () => {
    leaderboardController.updateState({
      scores: [125600, 5600, 665600],
      version: "0.0.1",
    });
    expect(leaderboardController.root.children[2].innerHTML).toStrictEqual(
      "11:05"
    );
  });

  test("Should display current time as current time", () => {
    leaderboardController.updateState({
      scores: [125600, 5600, 665600],
      version: "0.0.1",
    });
    expect(
      leaderboardController.root.children[2].classList.contains("current-time")
    ).toBe(true);
  });
});
