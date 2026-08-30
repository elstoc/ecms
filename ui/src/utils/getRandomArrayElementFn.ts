export const getRandomArrayElementFn = <T>(array: T[], memoryLength: number): (() => T) => {
  let recentElements: T[] = [];

  return () => {
    console.log(recentElements);
    const filteredArray = array.filter((el) => !recentElements.includes(el));
    const returnValue = filteredArray[Math.floor(Math.random() * filteredArray.length)];
    recentElements = [returnValue, ...recentElements.slice(0, memoryLength - 1)];
    return returnValue;
  };
};
