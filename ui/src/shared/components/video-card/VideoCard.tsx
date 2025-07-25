import 'modern-normalize';
import { forwardRef } from 'react';

import { Card } from '../card';
import { Disclosure, DisclosurePanel, TriggerButton } from '../disclosure';
import { Flag } from '../flag';
import { Icon } from '../icon';
import { Tag, TagListStatic } from '../tag-list-static/TagListStatic';

import { WatchedIcon } from './WatchedIcon';

import './VideoCard.css';

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
  onEditClick?: () => void;
  mediaNotes?: string;
  progress?: string;
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

export const VideoCard = forwardRef<HTMLDivElement, VideoCardProps>(
  (
    {
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
      onEditClick,
      mediaNotes,
      progress,
    },
    ref,
  ) => {
    return (
      <Card className='video-card' highlight={expanded} ref={ref}>
        <Disclosure isExpanded={expanded} onExpandedChange={onExpandedChange}>
          <div className='info-panel'>
            <div className='left'>
              <TriggerButton heading={title} clearButtonFormatting />
              <div>
                <WatchedIcon watchedStatus={watched} />
                <WatchedIcon watchedStatus={mediaWatched} />
                <span>
                  {' '}
                  {formatDesc} ({lengthDesc})
                </span>
              </div>
            </div>
            <div className='right'>
              <Flag flagged={flagged} className='priority' onChange={onFlaggedChange} />
            </div>
          </div>
          <DisclosurePanel>
            <div className='info-panel'>
              <div className='left'>
                <TagListStatic label='tags'>
                  <Tag label={categoryDesc} dark />
                  {tags?.map((tag) => <Tag key={tag} label={tag} />)}
                </TagListStatic>
                <TitleAndData title='Location' data={locationDesc} />
                <TitleAndData title='Other Media' data={otherMediaDesc} />
                <TitleAndData title='Media notes' data={mediaNotes} />
                <TitleAndData title='Progress' data={progress} />
              </div>
              <div className='right'>
                {onEditClick && <Icon label='edit video' icon='edit' onClick={onEditClick} />}
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>
      </Card>
    );
  },
);
