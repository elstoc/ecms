import { Video, VideoUpdate, VideoWithId } from '@/contracts/videodb';
import { useCustomQuery, useMutationWithToast } from '@/shared/hooks';

import {
  deleteVideoDbVideo,
  getVideoDbLookup,
  getVideoDbTags,
  getVideoDbVideo,
  getVideoDbVideos,
  patchVideoDbVideo,
  postVideoDbVideo,
  putVideoDbVideo,
} from '../api';

import { useVideoDb } from './useVideoDb';

export const EMPTY_VIDEO_ID = -99;

const useApiPath = () => {
  const {
    state: { apiPath },
  } = useVideoDb();
  return apiPath;
};

export const useLookup = (lookupTable: string) => {
  const apiPath = useApiPath();

  return useCustomQuery({
    queryKey: ['videoDb', 'lookup', apiPath, lookupTable],
    queryFn: () => getVideoDbLookup(apiPath, lookupTable),
    staleTime: 60 * 60 * 1000,
    refetchInterval: 60 * 60 * 1000,
  });
};

export const useLookupValue = (lookupTable: string, value?: string) => {
  const lookup = useLookup(lookupTable);
  return lookup[value ?? ''];
};

export const useGetTags = () => {
  const apiPath = useApiPath();

  return useCustomQuery({
    queryKey: ['videoDb', 'tags', apiPath],
    queryFn: () => getVideoDbTags(apiPath),
  });
};

export const useVideos = () => {
  const {
    state: { apiPath, apiFilters, sortOrder, shuffleSeed, pages },
  } = useVideoDb();

  const params = {
    ...apiFilters,
    maxLength: apiFilters.maxLength?.toString(),
    tags: apiFilters.tags?.join('|'),
    flaggedOnly: apiFilters.flaggedOnly ? '1' : undefined,
    pages: pages?.toString(),
  };

  return useCustomQuery({
    queryKey: [
      'videoDb',
      'videos',
      `${apiPath}:${JSON.stringify(params)}`,
      sortOrder as string,
      shuffleSeed ?? '',
    ],
    queryFn: () =>
      getVideoDbVideos(apiPath, {
        ...params,
        sortOrder: sortOrder as string,
        shuffleSeed: shuffleSeed?.toString(),
      }),
  });
};

export const useGetVideo = (id: number) => {
  const apiPath = useApiPath();

  const queryFn = async () => {
    if (id === EMPTY_VIDEO_ID) {
      return {
        title: '',
        category: '',
        watched: '',
      };
    }
    return getVideoDbVideo(apiPath, id);
  };

  return useCustomQuery({ queryKey: ['videodb', 'video', id], queryFn, gcTime: 0 });
};

export const usePostVideo = (successMessage: string) => {
  const apiPath = useApiPath();

  return useMutationWithToast<Video>({
    mutationFn: (video) => postVideoDbVideo(apiPath, video),
    invalidateKeys: [
      ['videoDb', 'videos'],
      ['videoDb', 'tags'],
    ],
    successMessage,
  });
};

export const useDeleteVideo = (successMessage: string) => {
  const apiPath = useApiPath();

  return useMutationWithToast<number>({
    mutationFn: (id: number) => deleteVideoDbVideo(apiPath, id),
    invalidateKeys: [
      ['videoDb', 'videos'],
      ['videoDb', 'tags'],
    ],
    successMessage,
  });
};

export const usePutVideo = (successMessage: string) => {
  const apiPath = useApiPath();

  return useMutationWithToast<VideoWithId>({
    mutationFn: (video) => putVideoDbVideo(apiPath, video),
    invalidateKeys: [
      ['videoDb', 'videos'],
      ['videoDb', 'tags'],
      ['videoDb', 'video'],
    ],
    successMessage,
  });
};

export const usePatchVideo = (successMessage: string) => {
  const apiPath = useApiPath();

  return useMutationWithToast<VideoUpdate>({
    mutationFn: (videoUpdate) => patchVideoDbVideo(apiPath, videoUpdate),
    invalidateKeys: [['videoDb', 'videos']],
    successMessage,
  });
};
