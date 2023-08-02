import { beforeEach, describe, expect, test } from "vitest";
import { LocalStorageService } from "./local-storage-service";

describe("Local storage service", () => {
  const localStorageService = new LocalStorageService();
  beforeEach(() => localStorage.clear());

  test("Should set state to local storage & and retrieve it", () => {
    localStorageService.setStateToLocalStorage("globalState", {
      dummy_data: 0,
      version: "0.0.1",
    });
    const state = localStorageService.getStateFromLocalStorage(
      "globalState",
      "0.0.1",
      () => {
        return { version: "0.0.1" };
      }
    );
    expect(state).toStrictEqual({
      dummy_data: 0,
      version: "0.0.1",
    });
  });

  test("Should return with default state if set state is invalid", () => {
    localStorageService.setStateToLocalStorage("globalState", {
      dummy_data: 0,
    });
    const state = localStorageService.getStateFromLocalStorage(
      "globalState",
      "0.0.1",
      () => {
        return { version: "0.0.1" };
      }
    );
    expect(state).toStrictEqual({ version: "0.0.1" });
  });

  test("Should remove state from localstorage", () => {
    localStorageService.setStateToLocalStorage("globalState", {
      version: "0.0.1",
    });
    localStorageService.setStateToLocalStorage("globalState", null);
    expect(localStorage.key(0)).toBe(null);
  });

  test("Should return fallback value if stored version is invalid", () => {
    const storageKey = "globalState";
    const version = "0.0.1";

    localStorage.setItem(storageKey, "invalid JSON");

    const result = localStorageService.getStateFromLocalStorage(
      storageKey,
      version,
      () => ({ version: "fallback", data: "fallback data" })
    );

    expect(result).toStrictEqual({
      version: "fallback",
      data: "fallback data",
    });
  });
});
