export type StorageState = "globalState" | "leaderBoardState";

export class LocalStorageService {
  setStateToLocalStorage(storageKey: StorageState, state: unknown) {
    if (!state) {
      localStorage.removeItem(storageKey);
    } else {
      localStorage.setItem(storageKey, JSON.stringify(state));
    }
  }

  getStateFromLocalStorage<T extends { version: string }>(
    storageKey: StorageState,
    version: string,
    fallBackValueProvider: () => T
  ): T {
    const state = localStorage.getItem(storageKey);
    const versionedState: T | null = this.extractVersionedState(state, version);
    if (versionedState) {
      return versionedState;
    } else {
      return fallBackValueProvider();
    }
  }

  private extractVersionedState<T extends { version: string }>(
    storedVersion: string | null,
    version: string
  ): T | null {
    if (!storedVersion) return null;
    try {
      const versionedState: T = JSON.parse(storedVersion);
      if (versionedState.version === version) {
        return versionedState;
      } else return null;
    } catch (error) {
      return null;
    }
  }
}
