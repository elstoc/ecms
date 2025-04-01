import { GalleryContents } from '@/contracts/gallery';
import { axiosSecureClient } from '@/shared/api';

export const getGalleryContents = async (
  path: string,
  pages: number,
  includeFile?: string,
  sortOrder?: string,
  shuffleSeed?: number,
): Promise<GalleryContents> => {
  const url = 'gallery/contents/';
  const { data } = await axiosSecureClient.get<GalleryContents>(url, {
    params: { path, pages, includeFile, sortOrder, shuffleSeed },
  });
  return data;
};
