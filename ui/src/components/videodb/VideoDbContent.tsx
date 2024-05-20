import React, { FC, ReactElement } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { useVideoDbVideos } from '../../hooks/useApiQueries';
import { VideoDbList } from './VideoDbList';
import { VideoQueryParams } from './VideoQueryParams';
import { ViewEditVideo } from './ViewEditVideo';

export type VideoDbProps = {
    apiPath: string;
    title: string;
}

export const VideoDbContent: FC<VideoDbProps> = ({ apiPath, title }): ReactElement => {
    const [searchParams] = useSearchParams();
    const { maxLength, titleLike, categories, id } = Object.fromEntries([...searchParams]);

    const videoQueryParams: { [key: string]: string } = {};
    if (maxLength !== undefined) {
        videoQueryParams.maxLength = maxLength;
    }
    if (titleLike !== undefined) {
        videoQueryParams.titleLike = titleLike;
    }
    if (categories !== undefined) {
        videoQueryParams.categories = categories;
    }
    const videos = useVideoDbVideos(apiPath, videoQueryParams);

    return (
        <div className='videodb'>
            <Helmet><title>{title}</title></Helmet>
            <ViewEditVideo apiPath={apiPath} videoId={id === undefined ? undefined : parseInt(id)} />
            <VideoQueryParams apiPath={apiPath} />
            {videos && <VideoDbList videos={videos} apiPath={apiPath} />}
        </div>
    );
};
