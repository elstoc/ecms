import { StaffRender } from './StaffRender';

export type NoteRenderProps = {
  note: string;
};

export const NoteRender = ({ note }: NoteRenderProps) => {
  const tune = 'L: 1/4\n ' + note;

  return <StaffRender tune={tune} />;
};
