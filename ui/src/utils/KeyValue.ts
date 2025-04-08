export type KeyValue<T> = {
  [P in keyof T]: {
    key: P;
    value: T[P];
  };
}[keyof T];
