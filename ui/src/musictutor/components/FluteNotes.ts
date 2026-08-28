export type FluteKey =
  | 'L1-Bb'
  | 'L1-B'
  | 'L2-C'
  | 'L3-A'
  | 'L4-G'
  | 'L5-G#'
  | 'R2-F'
  | 'R3-E'
  | 'R4-D'
  | 'R5-D#'
  | 'R5-LowC#'
  | 'R5-LowC'
  | 'IceLever'
  | 'DTrill'
  | 'D#Trill';

export type FluteNoteFingering = {
  [abcNote: string]: FluteKey[];
};

export const FLUTE_NOTES_ABC = [
  'C',
  '^C',
  '_D',
  'D',
  '^D',
  '_E',
  'E',
  'F',
  '^F',
  '_G',
  'G',
  '^G',
  '_A',
  'A',
  '^A',
  '_B',
  'B',
  'c',
];

export const FLUTE_NOTE_FINGERING: FluteNoteFingering = {
  C: ['L1-B', 'L2-C', 'L3-A', 'L4-G', 'R2-F', 'R3-E', 'R4-D', 'R5-LowC', 'R5-LowC#'],
  '^C': ['L1-B', 'L2-C', 'L3-A', 'L4-G', 'R2-F', 'R3-E', 'R4-D', 'R5-LowC#'],
  _D: ['L1-B', 'L2-C', 'L3-A', 'L4-G', 'R2-F', 'R3-E', 'R4-D', 'R5-LowC#'],
  D: ['L1-B', 'L2-C', 'L3-A', 'L4-G', 'R2-F', 'R3-E', 'R4-D'],
  '^D': ['L1-B', 'L2-C', 'L3-A', 'L4-G', 'R2-F', 'R3-E', 'R4-D', 'R5-D#'],
  _E: ['L1-B', 'L2-C', 'L3-A', 'L4-G', 'R2-F', 'R3-E', 'R4-D', 'R5-D#'],
  E: ['L1-B', 'L2-C', 'L3-A', 'L4-G', 'R2-F', 'R3-E', 'R5-D#'],
  F: ['L1-B', 'L2-C', 'L3-A', 'L4-G', 'R2-F', 'R5-D#'],
  '^F': ['L1-B', 'L2-C', 'L3-A', 'L4-G', 'R4-D', 'R5-D#'],
  _G: ['L1-B', 'L2-C', 'L3-A', 'L4-G', 'R4-D', 'R5-D#'],
  G: ['L1-B', 'L2-C', 'L3-A', 'L4-G', 'R5-D#'],
  '^G': ['L1-B', 'L2-C', 'L3-A', 'L4-G', 'L5-G#', 'R5-D#'],
  _A: ['L1-B', 'L2-C', 'L3-A', 'L4-G', 'L5-G#', 'R5-D#'],
  A: ['L1-B', 'L2-C', 'L3-A', 'R5-D#'],
  '^A': ['L1-B', 'L2-C', 'R2-F', 'R5-D#'],
  _B: ['L1-B', 'L2-C', 'R2-F', 'R5-D#'],
  B: ['L1-B', 'L2-C', 'R5-D#'],
  c: ['L2-C', 'R5-D#'],
};
