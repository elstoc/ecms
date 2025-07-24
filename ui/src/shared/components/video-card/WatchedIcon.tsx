const watchedColorLookup = { Y: 'green', N: 'crimson', P: 'orange', '': 'white' } as {
  [key: string]: string;
};

type WatchedIconProps = { watchedStatus?: string; medium?: string };

export const WatchedIcon = ({ watchedStatus }: WatchedIconProps) => {
  return (
    <svg height='14' width='20' role='img'>
      <circle r='7' cx='10' cy='7' fill={watchedColorLookup[watchedStatus || '']} />
    </svg>
  );
};
