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

export const FLUTE_NOTE_FINGERING_MAIN: FluteNoteFingering = {
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
  '^c': ['R5-D#'],
  _d: ['R5-D#'],
  d: ['L1-B', 'L3-A', 'L4-G', 'R2-F', 'R3-E', 'R4-D'],
  '^d': ['L1-B', 'L3-A', 'L4-G', 'R2-F', 'R3-E', 'R4-D', 'R5-D#'],
  _e: ['L1-B', 'L3-A', 'L4-G', 'R2-F', 'R3-E', 'R4-D', 'R5-D#'],
};

export const FLUTE_NOTE_FINGERING: FluteNoteFingering = {
  ...FLUTE_NOTE_FINGERING_MAIN,
  e: FLUTE_NOTE_FINGERING_MAIN['E'],
  f: FLUTE_NOTE_FINGERING_MAIN['F'],
  '^f': FLUTE_NOTE_FINGERING_MAIN['^F'],
  _g: FLUTE_NOTE_FINGERING_MAIN['_G'],
  g: FLUTE_NOTE_FINGERING_MAIN['G'],
  '^g': FLUTE_NOTE_FINGERING_MAIN['^G'],
  _a: FLUTE_NOTE_FINGERING_MAIN['_A'],
  a: FLUTE_NOTE_FINGERING_MAIN['A'],
  '^a': FLUTE_NOTE_FINGERING_MAIN['^A'],
  _b: FLUTE_NOTE_FINGERING_MAIN['_B'],
  b: FLUTE_NOTE_FINGERING_MAIN['B'],
  "c'": FLUTE_NOTE_FINGERING_MAIN['c'],
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
  '^c',
  '_d',
  'd',
  '^d',
  '_e',
  'e',
  'f',
  '^f',
  '_g',
  'g',
  '^g',
  '_a',
  'a',
  '^a',
  '_b',
  'b',
  "c'",
];

export const FLUTE_NOTES_ABC_SHARP_ONLY = FLUTE_NOTES_ABC.filter((note) => !note.startsWith('_'));
export const FLUTE_NOTES_ABC_FLAT_ONLY = FLUTE_NOTES_ABC.filter((note) => !note.startsWith('^'));
