import { useQuery } from '@tanstack/react-query';

import { GalleryImages } from '../types/Gallery';
import { apiSecure } from '../utils/apiClient';

const refetchInterval = parseInt(process.env.QUERY_REFETCH_INTERVAL ?? '10000');

export const useGalleryList = (path: string, limit = 0) => {
    const queryName = `gallery/imagelist/${path}`;
    const urlPath = `gallery/imagelist/${path}?limit=${limit}`;

    return useQuery({
        queryKey: [queryName, limit],
        keepPreviousData: true,
        queryFn: async () => (await apiSecure.get<GalleryImages>(urlPath)).data,
        refetchInterval
    });
};
