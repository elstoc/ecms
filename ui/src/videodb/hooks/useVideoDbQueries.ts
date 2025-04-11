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

export const useLookup = (path: string, lookupTable: string) => {
  return useCustomQuery({
    queryKey: ['videoDb', 'lookup', path, lookupTable],
    queryFn: () => getVideoDbLookup(path, lookupTable),
    staleTime: 60 * 60 * 1000,
    refetchInterval: 60 * 60 * 1000,
  });
};

export const useLookupValue = (path: string, lookupTable: string, value?: string | null) => {
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
    maxLength: apiFilters.maxLength?.toString(),
    titleContains: apiFilters.titleContains,
    categories: apiFilters.categories,
    tags: apiFilters.tags,
    watched: apiFilters.watched || undefined,
    mediaWatched: apiFilters.mediaWatched || undefined,
    minResolution: apiFilters.minResolution || undefined,
    flaggedOnly: apiFilters.flaggedOnly?.toString(),
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

export const useGetVideo = (path: string, id: number) => {
  return useCustomQuery({ queryKey: [], queryFn: () => getVideoDbVideo(path, id), gcTime: 0 });
};

export const usePostVideo = (path: string, successMessage: string) => {
  return useMutationWithToast<Video>({
    mutationFn: (video) => postVideoDbVideo(path, video),
    invalidateKeys: [
      ['videoDb', 'videos'],
      ['videoDb', 'tags'],
    ],
    successMessage,
  });
};

export const useDeleteVideo = (path: string, id: number, successMessage: string) => {
  return useMutationWithToast<void>({
    mutationFn: () => deleteVideoDbVideo(path, id),
    invalidateKeys: [
      ['videoDb', 'videos'],
      ['videoDb', 'tags'],
    ],
    successMessage,
  });
};

export const usePutVideo = (path: string, id: number, successMessage: string) => {
  return useMutationWithToast<VideoWithId>({
    mutationFn: (video) => putVideoDbVideo(path, video),
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
