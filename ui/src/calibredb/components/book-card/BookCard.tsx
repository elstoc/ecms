import { forwardRef } from 'react';

import { Card } from '@/shared/components/card';
import { Disclosure, DisclosurePanel, DisclosureTrigger } from '@/shared/components/disclosure';
import { Icon } from '@/shared/components/icon';
import { Rating } from '@/shared/components/rating';
import { Tag, TagList } from '@/shared/components/tag-list';

import './BookCard.css';

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
};

export const BookCard = forwardRef<HTMLDivElement, BookCardProps>(
  (
    {
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
    },
    ref,
  ) => {
    return (
      <Card className='book-card' highlight={expanded} ref={ref}>
        <Disclosure open={expanded} onOpenChange={onExpandedChange}>
          <div className='info-panel'>
            <div className='left'>
              <DisclosureTrigger heading={title} clearButtonFormatting />
              <div>{authors}</div>
            </div>
            <div className='right'>
              <div className='format'>{format}</div>
              {read && <Icon label='this book has been read' className='read-icon' icon='check' />}
            </div>
          </div>
          <DisclosurePanel>
            <div className='info-panel'>
              <div className='devices-and-rating'>
                {devices && (
                  <TagList label='devices'>
                    {devices?.map((device) => <Tag key={device} label={device} dark />)}
                  </TagList>
                )}
                <Rating stars={rating} />
              </div>
              {path && <div className='book-path'>{path}</div>}
              <div className='cover-and-desc'>
                <img className='cover' alt='' src={coverUrl} />
                {description && (
                  <div className='description' dangerouslySetInnerHTML={{ __html: description }} />
                )}
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>
      </Card>
    );
  },
);
