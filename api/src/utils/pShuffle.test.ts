import { getRandomSeed } from './getRandomSeed';
import { pShuffle } from './pShuffle';

jest.mock('./getRandomSeed');

const getRandomSeedMock = getRandomSeed as jest.Mock;

const initialArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

describe('pShuffle', () => {
  it('shuffles an array (retaining all its elements)', () => {
    const seed = (Math.random() * 2 ** 32) >>> 0;
    let newArray = structuredClone(initialArray);

    newArray = pShuffle(newArray, seed);

    expect(newArray.length).toBe(initialArray.length);
    expect(newArray).not.toEqual(initialArray);
    expect(newArray.sort()).toEqual(initialArray.sort());
  });

  it('shuffles the array the same, given the same seed', () => {
    const seed = (Math.random() * 2 ** 32) >>> 0;
    let newArray = structuredClone(initialArray);
    let newArray2 = structuredClone(initialArray);

    newArray = pShuffle(newArray, seed);
    newArray2 = pShuffle(newArray2, seed);

    expect(newArray).toEqual(newArray2);
  });

  it('shuffles the array differently, given a different seed', () => {
    const seed1 = (Math.random() * 2 ** 32) >>> 0;
    const seed2 = (Math.random() * 2 ** 32) >>> 0;
    let newArray = structuredClone(initialArray);
    let newArray2 = structuredClone(initialArray);

    newArray = pShuffle(newArray, seed1);
    newArray2 = pShuffle(newArray2, seed2);

    expect(newArray).not.toEqual(newArray2);
  });

  it('generates its own seed if one is not provided', () => {
    const seed = (Math.random() * 2 ** 32) >>> 0;
    getRandomSeedMock.mockReturnValue(seed);

    let newArray = structuredClone(initialArray);
    let newArray2 = structuredClone(initialArray);

    newArray = pShuffle(newArray);
    newArray2 = pShuffle(newArray2, seed);

    expect(newArray).toEqual(newArray2);
  });
});
