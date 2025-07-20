import { Collapse, Tag } from '@blueprintjs/core';
import { ReactElement, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserIsAdmin } from '@/auth/hooks/useAuthQueries';
import { VideoWithId } from '@/contracts/videodb';
import { Card } from '@/shared/components/card';
import { Flag } from '@/shared/components/forms';
import { Icon } from '@/shared/components/icon';

import { useLookupValue, usePatchVideo } from '../hooks/useVideoDbQueries';

import { WatchedIcon } from './WatchedIcon';

import './VideoListItem.scss';

type VideoListItemProps = {
  video: VideoWithId;
  expanded: boolean;
  toggleExpanded: () => void;
};

export const VideoListItem = forwardRef<HTMLDivElement, VideoListItemProps>(
  ({ video, expanded, toggleExpanded }, ref): ReactElement => {
    const navigate = useNavigate();
    const userIsAdmin = useUserIsAdmin();
    const { mutate, isPending } = usePatchVideo('flag updated');

    const videoCategory = useLookupValue('categories', video.category);
    const primaryMediaType = useLookupValue('media_types', video.primary_media_type);
    const otherMediaType = useLookupValue('media_types', video.other_media_type);
    const primaryMediaLocation = useLookupValue('media_locations', video.primary_media_location);
    const otherMediaLocation = useLookupValue('media_locations', video.other_media_location);

    let lengthText = '';
    if (video.num_episodes && video.length_mins) {
      lengthText = `(${video.num_episodes} x ${video.length_mins} mins)`;
    } else if (video.length_mins) {
      lengthText = `(${video.length_mins} mins)`;
    } else if (video.num_episodes) {
      lengthText = `(${video.num_episodes} episodes)`;
    }

    const preventCardClick = (e: React.MouseEvent) => e.stopPropagation();
    const openVideo = () => navigate(`./update/${video.id}`);
    const togglePriorityFlag = (checked: boolean) =>
      mutate({ id: video.id, priority_flag: checked ? 1 : 0 });

    return (
      <Card className='video-list-item' ref={ref} onClick={toggleExpanded} highlight={expanded}>
        <div className='primary-info'>
          <div className='left'>
            <div className='video-title'>{video.title}</div>
            <div>
              <WatchedIcon watchedStatus={video.watched} />
              <WatchedIcon watchedStatus={video.primary_media_watched} />
              <span>
                {' '}
                {primaryMediaType} {lengthText}
              </span>
            </div>
          </div>
          <div className='right' onClick={preventCardClick}>
            <Flag
              flagged={isPending ? undefined : video.priority_flag ? true : false}
              className='priority'
              onChange={!userIsAdmin ? undefined : togglePriorityFlag}
            />
          </div>
        </div>
        <Collapse isOpen={expanded}>
          <div className='secondary-info'>
            <div className='left'>
              <div className='tags'>
                <Tag key='category'>{videoCategory}</Tag>
                {video.tags?.map((tagName) => (
                  <Tag key={tagName} minimal={true}>
                    {tagName}
                  </Tag>
                ))}
              </div>
              <div className='media'>
                <div>
                  <strong>Location:</strong> {primaryMediaLocation}
                </div>
                {otherMediaType && (
                  <div>
                    <strong>Other Media: </strong>
                    {otherMediaType} ({otherMediaLocation})
                  </div>
                )}
                {video.media_notes && (
                  <div>
                    <strong>Media notes:</strong> {video.media_notes}
                  </div>
                )}
                {video.progress && (
                  <div>
                    <strong>Progress:</strong> {video.progress}
                  </div>
                )}
              </div>
            </div>
            <div className='right' onClick={preventCardClick}>
              {userIsAdmin && (
                <Icon label='edit video' icon='edit' color='black' onClick={openVideo} />
              )}
            </div>
          </div>
        </Collapse>
      </Card>
    );
  },
);
