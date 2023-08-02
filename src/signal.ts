export type Listener<VALUE_TYPE> = (value: VALUE_TYPE) => void;

export interface Signal<SIGNAL_TYPE> {
  get current(): SIGNAL_TYPE;

  dispatch(value: SIGNAL_TYPE): void;

  removeListener(listener: Listener<SIGNAL_TYPE>): void;

  addListener(listener: Listener<SIGNAL_TYPE>): void;

  distinct(): this;

  select<DERIVED_TYPE>(
    selector: (value: SIGNAL_TYPE) => DERIVED_TYPE
  ): Signal<DERIVED_TYPE>;
}

export function signal<SIGNAL_TYPE>(
  lastValue: SIGNAL_TYPE
): Signal<SIGNAL_TYPE> {
  let listeners: Listener<SIGNAL_TYPE>[] = [];
  let distinct = false;
  return {
    get current(): SIGNAL_TYPE {
      return lastValue;
    },
    dispatch(value: SIGNAL_TYPE) {
      if (distinct) {
        if (value == lastValue) {
          return;
        }

        if (JSON.stringify(value) == JSON.stringify(lastValue)) {
          return;
        }
      }
      lastValue = value;
      [...listeners].forEach((listener) => listener(value));
    },
    removeListener(listener: Listener<SIGNAL_TYPE>) {
      listeners = listeners.filter((p) => listener != p);
    },
    addListener(listener: Listener<SIGNAL_TYPE>) {
      listeners.push(listener);
    },
    distinct(): Signal<SIGNAL_TYPE> {
      distinct = true;
      return this;
    },

    select<DERIVED_TYPE>(
      selector: (value: SIGNAL_TYPE) => DERIVED_TYPE
    ): Signal<DERIVED_TYPE> {
      const result = signal<DERIVED_TYPE>(selector(lastValue));
      this.addListener((newValue) => {
        result.dispatch(selector(newValue));
      });
      return result;
    },
  };
}
