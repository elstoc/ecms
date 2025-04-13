import { Card } from '@blueprintjs/core';
import { createRef, startTransition } from 'react';

import { useElementIsVisible } from '@/shared/hooks/useElementIsVisible';

import { useVideoDb } from '../hooks/useVideoDb';
import { useVideos } from '../hooks/useVideoDbQueries';

import { VideoListItem } from './VideoListItem';

import './VideoList.scss';

export const VideoList = () => {
  const { dispatch } = useVideoDb();

  const { videos, currentPage, totalPages } = useVideos();
  const refLastVideo = createRef<HTMLDivElement>();

  useElementIsVisible(refLastVideo, () => {
    startTransition(() => {
      dispatch({ type: 'setPages', payload: Math.min(totalPages, currentPage + 1) });
    });
  });

  return (
    <Card className='video-list'>
      {videos.map((video, index) => {
        const lastVideo = index === videos.length - 1;
        return (
          <VideoListItem
            key={`${video.id}${lastVideo}`} // forces replacement and therefore unwatching of any previously watched element
            video={video}
            ref={lastVideo ? refLastVideo : null}
          />
        );
      })}
    </Card>
  );
};
