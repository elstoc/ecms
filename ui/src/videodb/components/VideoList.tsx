import { Card } from '@blueprintjs/core';
import { createRef, startTransition, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useElementIsVisible } from '@/shared/hooks/useElementIsVisible';

import { useGetVideos } from '../hooks/useVideoDbQueries';
import { VideoDbStateContext } from '../hooks/useVideoDbStateContext';

import { VideoListItem } from './VideoListItem';

import './VideoList.scss';

export const VideoList = () => {
  const [searchParams] = useSearchParams();
  const {
    videoDbState: { apiPath, limit },
    videoDbReducer,
  } = useContext(VideoDbStateContext);
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
      videoDbReducer({ action: 'increaseLimit', currentlyLoaded: videos.length });
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
