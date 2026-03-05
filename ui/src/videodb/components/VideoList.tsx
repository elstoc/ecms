import { startTransition, useRef } from 'react';

import { useElementIsVisible } from '@/shared/hooks/useElementIsVisible';

import { useVideoDb } from '../hooks/useVideoDb';
import { useVideos } from '../hooks/useVideoDbQueries';

import { VideoListItem } from './VideoListItem';

import './VideoList.css';

export const VideoList = () => {
  const refLastVideo = useRef<HTMLDivElement>(null);
  const { state, dispatch } = useVideoDb();
  useElementIsVisible(refLastVideo, () => {
    startTransition(() => {
      dispatch({ type: 'setPages', payload: Math.max(Math.min(totalPages, currentPage + 1), 1) });
    });
  });

  const videoData = useVideos();

  if (!videoData) return null;

  const { videos, currentPage, totalPages } = videoData;

  return (
    <div className='videos'>
      <div className='video-list'>
        {videos.map((video, index) => {
          const lastVideo = index === videos.length - 1;
          return (
            <VideoListItem
              key={`${video.id}${lastVideo}`} // forces replacement and therefore unwatching of any previously-watched element
              video={video}
              ref={lastVideo ? refLastVideo : null}
              expanded={state.expandedVideoIds.includes(video.id)}
              toggleExpanded={(expanded) =>
                dispatch({ type: 'setVideoExpanded', payload: { videoId: video.id, expanded } })
              }
            />
          );
        })}
      </div>
    </div>
  );
};
