import { ReactElement, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserIsAdmin } from '@/auth/hooks/useAuthQueries';
import { VideoWithId } from '@/contracts/videodb';
import { VideoCard } from '@/shared/components/video-card';

import { useLookupValue, usePatchVideo } from '../hooks/useVideoDbQueries';

type VideoListItemProps = {
  video: VideoWithId;
  expanded: boolean;
  toggleExpanded: (expanded: boolean) => void;
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
      lengthText = `${video.num_episodes} x ${video.length_mins} mins`;
    } else if (video.length_mins) {
      lengthText = `${video.length_mins} mins`;
    } else if (video.num_episodes) {
      lengthText = `${video.num_episodes} episodes`;
    }

    const otherMediaDesc = otherMediaType ? `${otherMediaType} (${otherMediaLocation})` : undefined;
    const openVideo = () => navigate(`./update/${video.id}`);
    const togglePriorityFlag = (checked: boolean) =>
      mutate({ id: video.id, priority_flag: checked ? 1 : 0 });

    return (
      <VideoCard
        ref={ref}
        expanded={expanded}
        onExpandedChange={toggleExpanded}
        title={video.title}
        categoryDesc={videoCategory}
        formatDesc={primaryMediaType}
        lengthDesc={lengthText}
        locationDesc={primaryMediaLocation}
        otherMediaDesc={otherMediaDesc}
        tags={video.tags}
        watched={video.watched}
        mediaWatched={video.primary_media_watched}
        flagged={isPending ? undefined : video.priority_flag ? true : false}
        onFlaggedChange={!userIsAdmin ? undefined : togglePriorityFlag}
        onPressEdit={userIsAdmin ? openVideo : undefined}
        mediaNotes={video.media_notes}
        progress={video.progress}
      />
    );
  },
);
