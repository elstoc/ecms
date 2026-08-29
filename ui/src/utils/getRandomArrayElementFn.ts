export const getRandomArrayElementFn = <T>(
  array: T[],
  memoryLength: number,
  trys: number,
): (() => T) => {
  let recentElements: T[] = [];

  return () => {
    let count = 0;

    while (true) {
      const tryValue = array[Math.floor(Math.random() * array.length)];

      if (!recentElements.includes(tryValue) || count === trys) {
        recentElements = [tryValue, ...recentElements.slice(0, memoryLength - 1)];
        return tryValue;
      }

      count++;
    }
  };
};
