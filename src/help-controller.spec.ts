import { describe, expect, test } from "vitest";
import { HelpController } from "./help-controller";

describe("Help controller", () => {
  const helpController = new HelpController();

  test("Should exist after creation", () => {
    expect(helpController).toBeDefined();
  });

  test("Should dispatch help event", async () =>
    new Promise<void>((done) => {
      helpController.helpEvent.addListener(() => {
        done();
      });

      const helpButton = helpController.helpButton;
      helpButton.click();
    }));

  test("Should dispatch new game event", async () =>
    new Promise<void>((done) => {
      helpController.newGameEvent.addListener(() => {
        done();
      });

      const newGameButton = helpController.newGameButton;
      newGameButton.click();
    }));
});
