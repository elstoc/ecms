import cn from 'classnames';
import { Ref } from 'react';

import { ExpandableCard } from '@/shared/components/expandable-card';
import { Icon } from '@/shared/components/icon';
import { Rating } from '@/shared/components/rating';
import { Tag, TagList } from '@/shared/components/tag-list';

import * as styles from './BookCard.module.css';

export type BookCardProps = {
  expanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
  title: string;
  authors: string;
  format: string;
  read?: boolean;
  rating?: number;
  devices?: string[];
  path?: string;
  description?: string;
  coverUrl: string;
  ref?: Ref<HTMLDivElement>;
};

export const BookCard = ({
  expanded,
  onExpandedChange,
  title,
  authors,
  format,
  read,
  rating,
  devices,
  path,
  description,
  coverUrl,
  ref,
}: BookCardProps) => (
  <ExpandableCard.Root expanded={expanded} onExpandedChange={onExpandedChange} ref={ref}>
    <ExpandableCard.Top className={styles.Panel}>
      <div className={styles.TopLeft}>
        <div className={styles.Title}>{title}</div>
        <div>{authors}</div>
      </div>
      <div className={styles.TopRight}>
        <div className={styles.Format}>{format}</div>
        {read && <Icon label='this book has been read' icon='check' />}
      </div>
    </ExpandableCard.Top>
    <ExpandableCard.Bottom className={cn(styles.Panel, styles.Bottom)}>
      <div className={styles.DeviceAndRating}>
        {devices && (
          <TagList label='devices'>
            {devices?.map((device) => (
              <Tag key={device} label={device} dark />
            ))}
          </TagList>
        )}
        <Rating stars={rating} />
      </div>
      {path && <div className={styles.BookPath}>{path}</div>}
      <div className={styles.CoverAndDesc}>
        <div>
          <img className={styles.Cover} alt='' src={coverUrl} />
        </div>
        {description && (
          <div className={styles.Description} dangerouslySetInnerHTML={{ __html: description }} />
        )}
      </div>
    </ExpandableCard.Bottom>
  </ExpandableCard.Root>
);
