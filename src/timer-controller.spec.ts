import { afterEach, describe, expect, test, vi } from "vitest";
import { TimerController, formatTime } from "./timer-controller";

const startDate = 1687778670000; //Mon Jun 26 2023 13:24:33 GMT+0200 (Central European Summer Time)
const endDate = 1687778690000; // Mon Jun 26 2023 13:24:50 GMT+0200 (Central European Summer Time)

describe("Timer controller", () => {
  const timerController = new TimerController();

  afterEach(() => {
    timerController.clearTimer();
    vi.useRealTimers();
  });

  test("Should exist after creation", () => {
    expect(timerController).toBeDefined();
  });

  test("Should format time correctly", () => {
    expect(formatTime(5600)).toStrictEqual("00:05");
    expect(formatTime(125600)).toStrictEqual("02:05");
    expect(formatTime(665600)).toStrictEqual("11:05");
  });

  test("sdfsd", () => {
    timerController.updateState(Date.now());
    expect(timerController.clock.innerText).toStrictEqual("00:00");
  });

  test("1", () => {
    vi.useFakeTimers();
    vi.setSystemTime(startDate);
    timerController.updateState(startDate);
    expect(timerController.clock.innerText).toStrictEqual("00:00");
  });

  test("2", () => {
    vi.useFakeTimers();
    vi.setSystemTime(endDate);
    timerController.updateState(startDate);
    expect(timerController.clock.innerText).toStrictEqual("00:20");
  });

  test("3", () => {
    vi.useFakeTimers();
    vi.setSystemTime(startDate);
    timerController.updateState(startDate);

    vi.setSystemTime(endDate);
    vi.runOnlyPendingTimers();

    // 00:20 + 00:01 due to the pending set interval
    expect(timerController.clock.innerText).toStrictEqual("00:21");
  });
});
