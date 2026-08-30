import { AbcStaffRender } from './AbcStaffRender';

export type NoteRenderProps = {
  abcNote: string;
};

export const AbcNoteRender = ({ abcNote }: NoteRenderProps) => {
  const tune = 'L: 1/4\n ' + abcNote;

  return <AbcStaffRender tune={tune} />;
};
