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

export const EMPTY_VIDEO = -99;

export const useLookup = (path: string, lookupTable: string) => {
  return useCustomQuery({
    queryKey: ['videoDb', 'lookup', path, lookupTable],
    queryFn: () => getVideoDbLookup(path, lookupTable),
    staleTime: 60 * 60 * 1000,
    refetchInterval: 60 * 60 * 1000,
  });
};

export const useLookupValue = (path: string, lookupTable: string, value?: string) => {
  const lookup = useLookup(path, lookupTable);
  return lookup[value ?? ''];
};

export const useGetTags = (path: string) => {
  return useCustomQuery({
    queryKey: ['videoDb', 'tags', path],
    queryFn: () => getVideoDbTags(path),
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
  const {
    state: { apiPath },
  } = useVideoDb();

  const queryFn = async () => {
    if (id === EMPTY_VIDEO) {
      return {
        id: 0,
        title: '',
        category: '',
        watched: '',
      };
    }
    return getVideoDbVideo(apiPath, id);
  };

  return useCustomQuery({ queryKey: [], queryFn, gcTime: 0 });
};

export const usePostVideo = (successMessage: string) => {
  const {
    state: { apiPath },
  } = useVideoDb();

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
  const {
    state: { apiPath },
  } = useVideoDb();

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
  const {
    state: { apiPath },
  } = useVideoDb();

  return useMutationWithToast<VideoWithId>({
    mutationFn: (video) => putVideoDbVideo(apiPath, video),
    invalidateKeys: [
      ['videoDb', 'videos'],
      ['videoDb', 'tags'],
    ],
    successMessage,
  });
};

export const usePatchVideo = (path: string, id: number, successMessage: string) => {
  return useMutationWithToast<VideoUpdate>({
    mutationFn: (videoUpdate) => patchVideoDbVideo(path, videoUpdate),
    invalidateKeys: [['videoDb', 'videos']],
    successMessage,
  });
};
