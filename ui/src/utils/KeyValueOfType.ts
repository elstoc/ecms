export type KeyValueOfType<T> = {
  [P in keyof T]: {
    key: P;
    value: T[P];
  };
}[keyof T];
