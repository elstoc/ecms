import { pRandom } from './pRandom';

// An implementation of the Durstenfeld shuffle algorithm
export const pShuffle = <T>(array: T[], seed: number, length?: number) => {
  const cloneArray: T[] = structuredClone(array);
  const prng = pRandom(seed);
  const limit = Math.min(length ?? array.length, array.length);

  for (let i = 0; i < limit - 2; i++) {
    const j = Math.floor(prng() * (array.length - i - 1) + i + 1);
    [cloneArray[i], cloneArray[j]] = [cloneArray[j], cloneArray[i]];
  }

  return cloneArray.slice(0, limit);
};
