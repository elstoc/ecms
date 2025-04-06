import { Card } from '@blueprintjs/core';
import { createRef, startTransition } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useElementIsVisible } from '@/shared/hooks/useElementIsVisible';

import { useVideoDb } from '../hooks/useVideoDb';
import { useGetVideos } from '../hooks/useVideoDbQueries';

import { VideoListItem } from './VideoListItem';

import './VideoList.scss';

export const VideoList = () => {
  const [searchParams] = useSearchParams();
  const {
    state: { apiPath, limit },
    dispatch,
  } = useVideoDb();
  const {
    maxLength,
    titleContains,
    categories,
    tags,
    watched,
    mediaWatched,
    minResolution,
    flaggedOnly,
  } = Object.fromEntries(searchParams.entries());

  const videos = useGetVideos(apiPath, {
    maxLength,
    titleContains,
    categories,
    tags,
    watched,
    mediaWatched,
    minResolution,
    flaggedOnly,
    limit: limit?.toString(),
  });

  const refLastVideo = createRef<HTMLDivElement>();

  useElementIsVisible(refLastVideo, () => {
    startTransition(() => {
      dispatch({ type: 'increaseLimit', currentlyLoaded: videos.length });
    });
  });

  return (
    <Card className='video-list'>
      {videos.map((video, index) => (
        <VideoListItem
          key={video.id}
          video={video}
          ref={index === limit - 1 ? refLastVideo : null}
        />
      ))}
    </Card>
  );
};
