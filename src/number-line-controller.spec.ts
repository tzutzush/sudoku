import { beforeEach, describe, expect, test } from "vitest";
import { NumberLineController } from "./number-line-controller";

describe("Number line", () => {
  let numberLineController: NumberLineController;
  let mockedNumberKey: HTMLElement;
  let numberLine: HTMLDivElement;

  beforeEach(() => {
    numberLineController = new NumberLineController();
    mockedNumberKey = document.createElement("div");
    mockedNumberKey.classList.add("number-key");
    numberLine = numberLineController.createNumberLine();
  });

  test("Number line should exist", () => {
    expect(numberLineController).toBeDefined();
  });

  test("Number line should create 9 number keys", () => {
    expect(numberLine.classList.contains("number-keys")).toBe(true);
    expect(numberLine.childElementCount).toBe(9);
  });

  test("Number keys should have right class, id and value", () => {
    for (let index = 1; index <= 9; index++) {
      const numberKey = numberLine.querySelector(`#${index}`);
      expect(numberKey).toBeDefined();
      expect(numberKey?.innerHTML).toBe(index.toString());
      expect(numberKey?.classList.contains("number-key")).toBe(true);
    }
  });

  test("Should select the number key when clicked", () => {
    numberLineController.selectNumberKey(mockedNumberKey);
    expect(numberLineController.selectedNumberKey).toBe(mockedNumberKey);
    expect(mockedNumberKey.classList.contains("selected")).toBe(true);
  });

  test("Should remove selected class from previously selected number key", () => {
    const mockedPreviousNumberKey = document.createElement("div");
    mockedPreviousNumberKey.classList.add("number-key", "selected");
    numberLineController.selectedNumberKey = mockedPreviousNumberKey;
    numberLineController.selectNumberKey(mockedNumberKey);

    expect(mockedPreviousNumberKey.classList.contains("selected")).toBe(false);
  });

  test("Should dispatch signal", async () =>
    new Promise<void>((done) => {
      numberLineController.selectedNumber.addListener(() => {
        done();
      });

      const numberKey = numberLine.querySelector<HTMLElement>(`#1`);
      if (!numberKey) return;
      numberKey.click();
    }));
});
