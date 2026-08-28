export type FluteKey =
  | 'L1-Bb'
  | 'L1-B'
  | 'L2-C'
  | 'L3-A'
  | 'L4-G'
  | 'L5-G#'
  | 'R2-F#'
  | 'R3-E'
  | 'R4-D'
  | 'R5-D#'
  | 'R5-LowC#'
  | 'R5-LowC'
  | 'IceLever'
  | 'DTrill'
  | 'D#Trill';

export type FluteNotes = {
  [abcNote: string]: FluteKey[];
};

export const FLUTE_NOTES: FluteNotes = {
  C: ['L1-B', 'L2-C', 'L3-A', 'L4-G', 'R2-F#', 'R3-E', 'R4-D', 'R5-LowC'],
  '^C': ['L1-B', 'L2-C', 'L3-A', 'L4-G', 'R2-F#', 'R3-E', 'R4-D', 'R5-LowC#'],
};
