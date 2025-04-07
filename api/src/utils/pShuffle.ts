import { pRandom } from './pRandom';

// An implementation of the Durstenfeld shuffle algorithm
export const pShuffle = <T>(array: T[], seed: number) => {
  const prng = pRandom(seed);

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(prng() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};
