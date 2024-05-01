import React, { FC, ReactElement } from 'react';

import { VideoListItem } from './VideoListItem';
import { VideoWithId } from '../../types/VideoDb';

type VideoDbContentProps = {
    apiPath: string;
    videos: VideoWithId[];
}

export const VideoDbList: FC<VideoDbContentProps> = ({ apiPath, videos }): ReactElement => {
    return (
        <div className='videodb-list'>
            {videos?.map((video) => <VideoListItem key={video.id} video={video} apiPath={apiPath} />)}
        </div>
    );
};
