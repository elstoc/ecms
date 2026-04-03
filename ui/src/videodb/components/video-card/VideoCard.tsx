import { Ref } from 'react';

import { ExpandableCard } from '@/shared/components/expandable-card';
import { Flag } from '@/shared/components/flag';
import { IconButton } from '@/shared/components/icon-button';
import { Tag, TagList } from '@/shared/components/tag-list';

import { WatchedIcon } from './WatchedIcon';

import * as styles from './VideoCard.module.css';

type VideoCardProps = {
  expanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
  title: string;
  categoryDesc: string;
  formatDesc: string;
  lengthDesc: string;
  locationDesc?: string;
  otherMediaDesc?: string;
  tags?: string[];
  watched: string;
  mediaWatched?: string;
  flagged?: boolean;
  onFlaggedChange?: (flagged: boolean) => void;
  onPressEdit?: () => void;
  mediaNotes?: string;
  progress?: string;
  ref?: Ref<HTMLDivElement>;
};

type TitleAndDataProps = {
  title: string;
  data?: string;
};

export const TitleAndData = ({ title, data }: TitleAndDataProps) => {
  if (!data) return <></>;
  return (
    <div>
      <strong>{title}:</strong> {data}{' '}
    </div>
  );
};

export const VideoCard = ({
  expanded,
  onExpandedChange,
  title,
  categoryDesc,
  formatDesc,
  lengthDesc,
  locationDesc,
  otherMediaDesc,
  tags,
  watched,
  mediaWatched,
  flagged,
  onFlaggedChange,
  onPressEdit,
  mediaNotes,
  progress,
  ref,
}: VideoCardProps) => (
  <ExpandableCard.Root expanded={expanded} onExpandedChange={onExpandedChange} ref={ref}>
    <ExpandableCard.Top className={styles.Panel}>
      <div className={styles.Left}>
        <div className={styles.Title}>{title}</div>
        <div>
          <WatchedIcon watchedStatus={watched} />
          <WatchedIcon watchedStatus={mediaWatched} />
          <span>
            {' '}
            {formatDesc} {lengthDesc ? `(${lengthDesc})` : ''}
          </span>
        </div>
      </div>
      <div className={styles.Right}>
        <Flag flagged={flagged} onChange={onFlaggedChange} />
      </div>
    </ExpandableCard.Top>
    <ExpandableCard.Bottom className={styles.Panel} keepMounted>
      <div className={styles.Left}>
        <div className={styles.Tags}>
          <TagList label='tags'>
            <Tag label={categoryDesc} dark />
            {tags?.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </TagList>
        </div>
        <TitleAndData title='Location' data={locationDesc} />
        <TitleAndData title='Other Media' data={otherMediaDesc} />
        <TitleAndData title='Media notes' data={mediaNotes} />
        <TitleAndData title='Progress' data={progress} />
      </div>
      <div className={styles.Right}>
        {onPressEdit && <IconButton label='edit video' icon='edit' onClick={onPressEdit} />}
      </div>
    </ExpandableCard.Bottom>
  </ExpandableCard.Root>
);
