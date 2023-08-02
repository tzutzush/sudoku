import { beforeEach, describe, expect, test, vi } from "vitest";
import { Signal, signal } from "./signal";

describe("Signal", () => {
  let testSignal: Signal<number>;

  beforeEach(() => {
    testSignal = signal<number>(5);
  });

  test("Should have correct initial value", () => {
    expect(testSignal.current).toBe(5);
  });

  test("Should dispatch new value", () => {
    testSignal.dispatch(1);
    expect(testSignal.current).toBe(1);
  });

  test("Should call listeners", () => {
    const listener = vi.fn();
    testSignal.addListener(listener);
    testSignal.dispatch(10);
    expect(listener).toHaveBeenCalledOnce();
    expect(listener).toHaveBeenCalledWith(10);
  });

  test("Should remove listeners", () => {
    const listener = vi.fn();
    testSignal.addListener(listener);
    testSignal.removeListener(listener);
    testSignal.dispatch(10);
    expect(listener).not.toHaveBeenCalled();
  });

  test("Should create a distinct signal that ignores duplicate values", () => {
    const listener = vi.fn();
    testSignal.distinct().addListener(listener);
    testSignal.dispatch(20);
    testSignal.dispatch(20);

    expect(listener).toHaveBeenCalledOnce();
    expect(listener).toHaveBeenCalledWith(20);
  });

  test("Should create derived signal that works when original signal is called", () => {
    const listener = vi.fn();
    const derivedSignal = testSignal.select((value: number) => value * 2);
    derivedSignal.addListener(listener);

    testSignal.dispatch(25);

    expect(listener).toHaveBeenCalledOnce();
    expect(listener).toHaveBeenCalledWith(50);
  });

  test("Should not dispatch if JSON is incorrect", () => {
    const mySignal = signal({ key: "value" }).distinct();
    const listener = vi.fn();
    mySignal.addListener(listener);

    mySignal.dispatch({ key: "value" });
    expect(listener).not.toHaveBeenCalled();
  });
});
