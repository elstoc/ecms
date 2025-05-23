import { PaginatedVideos, Video, VideoUpdate, VideoWithId } from '@/contracts/videodb';
import { axiosSecureClient } from '@/shared/api';

export const getVideoDbVideos = async (
  path: string,
  filters?: { [key: string]: string | undefined },
): Promise<PaginatedVideos> => {
  const url = 'videodb/videos';
  const { data } = await axiosSecureClient.get<PaginatedVideos>(url, {
    params: { path, ...filters },
  });
  return data;
};

export const getVideoDbVideo = async (path: string, id: number): Promise<Video> => {
  const url = 'videodb/video';
  const { data } = await axiosSecureClient.get<Video>(url, { params: { path, id } });
  return data;
};

export const putVideoDbVideo = async (path: string, videoWithId: VideoWithId): Promise<void> => {
  const { id, ...video } = videoWithId;
  const url = 'videodb/video';
  await axiosSecureClient.put(url, { path, id, video });
};

export const postVideoDbVideo = async (path: string, video: Video): Promise<void> => {
  const url = 'videodb/video';
  await axiosSecureClient.post<{ id: number }>(url, { path, video });
};

export const patchVideoDbVideo = async (path: string, videoUpdate: VideoUpdate): Promise<void> => {
  const url = 'videodb/video';
  await axiosSecureClient.patch(url, { path, ...videoUpdate });
};

export const deleteVideoDbVideo = async (path: string, id: number): Promise<void> => {
  const url = 'videodb/video';
  const { data } = await axiosSecureClient.delete(url, { params: { path, id } });
  return data.id;
};

export const getVideoDbTags = async (path: string): Promise<string[]> => {
  const url = 'videodb/tags';
  const { data } = await axiosSecureClient.get<string[]>(url, { params: { path } });
  return data;
};

export const getVideoDbLookup = async (
  path: string,
  lookupTable: string,
): Promise<{ [key: string]: string }> => {
  const url = 'videodb/lookup';
  const { data } = await axiosSecureClient.get<{ [key: string]: string }>(url, {
    params: { path, table: lookupTable },
  });
  return data;
};
