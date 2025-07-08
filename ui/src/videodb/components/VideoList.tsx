import { startTransition, useRef } from 'react';

import { useElementIsVisible } from '@/shared/hooks/useElementIsVisible';

import { useVideoDb } from '../hooks/useVideoDb';
import { useVideos } from '../hooks/useVideoDbQueries';

import { VideoListItem } from './VideoListItem';

import './VideoList.css';

export const VideoList = () => {
  const { state, dispatch } = useVideoDb();

  const { videos, currentPage, totalPages } = useVideos();
  const refLastVideo = useRef<HTMLDivElement>(null);

  useElementIsVisible(refLastVideo, () => {
    startTransition(() => {
      dispatch({ type: 'setPages', payload: Math.min(totalPages, currentPage + 1) });
    });
  });

  return (
    <div className='video-list'>
      {videos.map((video, index) => {
        const lastVideo = index === videos.length - 1;
        return (
          <VideoListItem
            key={`${video.id}${lastVideo}`} // forces replacement and therefore unwatching of any previously-watched element
            video={video}
            ref={lastVideo ? refLastVideo : null}
            expanded={state.expandedVideoIds.includes(video.id)}
            toggleExpanded={() => dispatch({ type: 'toggleVideoExpanded', payload: video.id })}
          />
        );
      })}
    </div>
  );
};
