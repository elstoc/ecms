import { Icon } from '@blueprintjs/core';

const watchedColorLookup = { Y: 'green', N: 'crimson', P: 'orange', '': 'white' } as {
  [key: string]: string;
};

type WatchedIconProps = { watchedStatus?: string; medium?: string };

export const WatchedIcon = ({ watchedStatus }: WatchedIconProps) => {
  return <Icon icon='record' size={20} color={watchedColorLookup[watchedStatus || '']} />;
};
